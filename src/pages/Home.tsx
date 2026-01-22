import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Copy, Globe, History, Plus, RefreshCw, Settings, Shield, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UnlockWallet from '../components/UnlockWallet';
import { generateBurnerKeypair, getDecryptedSeed, hasWallet } from '../utils/keyManager';
import { archiveBurnerWallet, formatAddress, getAddressFromKeypair, getAllBurnerWallets, getNextAccountNumber, storeBurnerWallet, type BurnerWallet } from '../utils/storage';
import { extendSession, isSessionValid, isWalletLocked } from '../utils/walletLock';

const Home = () => {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(true);
  const [hasWalletState, setHasWalletState] = useState(false);
  const [activeWallet, setActiveWallet] = useState<BurnerWallet | null>(null);
  const [burnerWallets, setBurnerWallets] = useState<BurnerWallet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showWalletList, setShowWalletList] = useState(false);
  const [showSitesList, setShowSitesList] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [password, setPassword] = useState(''); // Store password in memory during session

  const loadWallets = useCallback(async () => {
    try {
      const wallets = await getAllBurnerWallets();
      setBurnerWallets(wallets);
      if (wallets.length > 0) {
        setActiveWallet(wallets.find(w => w.isActive) || wallets[0]);
      }
    } catch (error) {
      console.error('[Veil] Error loading wallets:', error);
    }
  }, []);

  const generateNewBurner = useCallback(async (pwd?: string) => {
    // Try to get password from: parameter, state, or sessionStorage (for first-time generation)
    let currentPassword = pwd || password;
    if (!currentPassword) {
      const tempPassword = sessionStorage.getItem('veil:temp_password');
      if (tempPassword) {
        currentPassword = tempPassword;
        setPassword(tempPassword); // Store in state for future use
        sessionStorage.removeItem('veil:temp_password'); // Clear temp storage
      }
    }
    
    if (!currentPassword) {
      // Password not available - gracefully lock wallet and show unlock screen
      setIsLocked(true);
      setPassword('');
      return;
    }

    setIsGenerating(true);
    try {
      // Check existing active wallets and archive those with balance < 0.001 SOL
      const existingWallets = await getAllBurnerWallets();
      const activeWallets = existingWallets.filter(w => w.isActive && !w.archived);
      
      for (const wallet of activeWallets) {
        if (wallet.balance < 0.001) {
          // Archive wallet with balance < 0.001 SOL
          await archiveBurnerWallet(wallet.index);
        }
      }

      const seed = await getDecryptedSeed(currentPassword);
      const { keypair, index } = await generateBurnerKeypair(seed);
      const address = getAddressFromKeypair(keypair);
      
      // Get next account number (Account 1, Account 2, etc.)
      const accountNumber = await getNextAccountNumber();
      const accountName = `Account ${accountNumber}`;

      const newWallet: BurnerWallet = {
        id: Date.now(),
        address: formatAddress(address),
        fullAddress: address,
        balance: 0,
        site: accountName,
        isActive: true, // Make first burner active
        index,
      };

      await storeBurnerWallet(newWallet);
      await loadWallets();
    } catch (error) {
      // Handle errors gracefully - lock wallet instead of showing alerts
      console.error('[Veil] Error generating burner:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('DOMException') || errorMessage.includes('decrypt') || errorMessage.includes('password')) {
        // Password-related errors - lock wallet
        setIsLocked(true);
        setPassword('');
      } else {
        // Other errors - also lock wallet for security
        setIsLocked(true);
        setPassword('');
      }
    } finally {
      setIsGenerating(false);
    }
  }, [password, loadWallets]);

  const checkWalletState = useCallback(async () => {
    try {
      const walletExists = await hasWallet();
      setHasWalletState(walletExists);

      if (!walletExists) {
        navigate('/onboarding');
        return;
      }

      const locked = await isWalletLocked();
      setIsLocked(locked);

      if (!locked) {
        await loadWallets();
        
        // Auto-generate first burner if none exist and wallet is unlocked
        const wallets = await getAllBurnerWallets();
        if (wallets.length === 0 && !isGenerating) {
          // Try to get password from state or sessionStorage
          const currentPassword = password || sessionStorage.getItem('veil:temp_password');
          if (currentPassword) {
            if (!password) {
              setPassword(currentPassword); // Store in state
            }
            // Generate burner - errors will be handled gracefully inside
            await generateNewBurner(currentPassword);
          } else {
            // No password available - lock wallet gracefully
            setIsLocked(true);
          }
        }
      }
    } catch (error) {
      // Handle any unexpected errors gracefully
      console.error('[Veil] Error checking wallet state:', error);
      setIsLocked(true);
      setPassword('');
    }
  }, [navigate, loadWallets, isGenerating, password, generateNewBurner]);

  // Check wallet state on mount
  useEffect(() => {
    checkWalletState();
  }, [checkWalletState]);

  // Check session validity periodically
  useEffect(() => {
    if (!isLocked) {
      const interval = setInterval(async () => {
        const valid = await isSessionValid();
        if (!valid) {
          setIsLocked(true);
          setPassword(''); // Clear password from memory
        } else {
          extendSession();
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isLocked]);

  const handleUnlock = async (unlockPassword: string) => {
    try {
      setPassword(unlockPassword);
      setIsLocked(false);
      await loadWallets();
      
      // Auto-generate first burner if none exist
      const wallets = await getAllBurnerWallets();
      if (wallets.length === 0) {
        // Generate burner - errors will be handled gracefully inside
        await generateNewBurner(unlockPassword);
      }
    } catch (error) {
      // Handle unlock errors gracefully - lock wallet again
      console.error('[Veil] Error during unlock:', error);
      setIsLocked(true);
      setPassword('');
    }
  };

  const totalBalance = burnerWallets.reduce((sum, w) => sum + w.balance, 0);

  const handleCopy = () => {
    if (activeWallet) {
      navigator.clipboard.writeText(activeWallet.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleMigrateFunds = () => {
    if (activeWallet) {
      // Migration functionality coming soon
    }
  };


  // Show unlock screen if wallet is locked
  if (isLocked && hasWalletState) {
    return <UnlockWallet onUnlock={handleUnlock} />;
  }

  // Show loading state while generating first burner
  if (!activeWallet && burnerWallets.length === 0) {
    return (
      <div className="h-full w-full bg-black text-white flex items-center justify-center">
        <div className="text-center">
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-400">Generating your first burner wallet...</p>
            </>
          ) : (
            <>
              <p className="text-gray-400 mb-4">No burner wallets yet</p>
              <button
                onClick={() => generateNewBurner()}
                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
              >
                Generate First Burner
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black text-white relative flex flex-col overflow-hidden font-sans">
      {/* Ambient Background */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-purple-600/10 rounded-full blur-[60px]" />
      <div className="absolute bottom-[50px] left-[-30px] w-32 h-32 bg-blue-600/10 rounded-full blur-[40px]" />

      {/* Header & Wallet Selector */}
      <div className="flex justify-between items-start z-10 px-3 py-3 relative">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowWalletList(true)}
            className="flex items-center gap-3 transition-all group text-left"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
              <img src="/veil.png" alt="Veil" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[11px] text-gray-500 font-medium leading-none mb-0.5">@veil</span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white tracking-tight">{activeWallet?.site || 'No site'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-300 transition-colors" />
              </div>
            </div>
          </button>

          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCopyPopup(!showCopyPopup);
              }}
              className={`p-1 mt-3 rounded-md transition-colors relative z-[60] ${showCopyPopup ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/10 hover:text-white'}`}
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            {/* Address Copy Popup (Phantom style) moved to root level */}
          </div>
        </div>

        <div className="flex gap-1 pt-0.5">
          <button
            onClick={() => setShowSitesList(true)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 relative"
          >
            <Globe className="w-4 h-4 text-gray-400" />
            {/* TODO: Show connected sites count when implemented */}
          </button>
          <button onClick={() => navigate('/history')} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
            <History className="w-4 h-4 text-gray-400" />
          </button>
          <button onClick={() => navigate('/settings')} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-3 pt-2 pb-3 z-10 flex flex-col">
        {/* Balance Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-4"
        >
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 mb-1">
            {activeWallet?.balance.toFixed(2) || '0.00'}
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-lg text-gray-400 font-medium">SOL</span>
            <span className="text-xs text-gray-600">•</span>
            <span className="text-sm text-gray-500 font-medium">
              ≈ ${((activeWallet?.balance || 0) * 145).toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mb-2">
          <button
            onClick={handleMigrateFunds}
            disabled={!activeWallet || activeWallet.balance === 0}
            className={`py-3 px-4 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
              activeWallet && activeWallet.balance > 0
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 active:scale-[0.98]'
                : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Migrate to Privacy</span>
          </button>
          <button
            onClick={() => generateNewBurner()}
            disabled={isGenerating || (activeWallet?.balance ?? 0) > 0}
            className={`py-3 px-4 font-medium rounded-xl text-sm border flex items-center justify-center gap-2 transition-all ${
              !activeWallet || (activeWallet.balance ?? 0) === 0
                ? 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 active:scale-[0.98]'
                : 'bg-white/5 text-gray-600 border-white/5 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'New Burner'}</span>
          </button>
        </div>

        {activeWallet && activeWallet.balance > 0 && (
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <div className="w-1 h-1 rounded-full bg-yellow-400/60" />
            <p className="text-[10px] text-center text-gray-500">
              Migrate funds before generating a new burner
            </p>
          </div>
        )}
      </div>

      {/* Wallet List Modal */}
      <AnimatePresence>
        {showWalletList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWalletList(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-30 border-t border-white/10"
            >
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-4 pb-3">
                <h3 className="text-sm font-bold text-white">Burner Wallets</h3>
                <button onClick={() => setShowWalletList(false)} className="p-1.5 hover:bg-white/10 rounded-full">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="px-3 pb-3 max-h-64 overflow-y-auto">
                {burnerWallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => { setActiveWallet(wallet); setShowWalletList(false); }}
                    className={`w-full p-2.5 rounded-lg flex items-center gap-2.5 transition-colors mb-1.5 ${activeWallet?.id === wallet.id
                      ? 'bg-white/10 border border-white/20'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                      }`}
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-white/10">
                      <img src="/veil.png" alt="Veil" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-white">{wallet.site}</span>
                        {activeWallet?.id === wallet.id && (
                          <span className="px-1 py-0.5 text-[8px] bg-green-500/20 text-green-400 rounded font-bold">ACTIVE</span>
                        )}
                      </div>
                      <code className="text-[10px] text-gray-500 font-mono">{wallet.address}</code>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white">{wallet.balance} SOL</p>
                      <p className="text-[10px] text-gray-500">${(wallet.balance * 145).toFixed(2)}</p>
                    </div>
                  </button>
                ))}

                <button
                  onClick={() => { setShowWalletList(false); generateNewBurner(); }}
                  disabled={isGenerating}
                  className="w-full p-2.5 rounded-lg flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                    <Plus className="w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-400">Create New Burner</span>
                </button>
              </div>

              <div className="px-4 py-3 border-t border-white/10 bg-black/20">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Total Across All Burners</span>
                  <span className="text-sm font-bold text-white">{totalBalance.toFixed(2)} SOL</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Connected Sites Modal */}
      <AnimatePresence>
        {showSitesList && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSitesList(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-2xl z-30 border-t border-white/10"
            >
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-4 pb-3">
                <h3 className="text-sm font-bold text-white">Connected Sites</h3>
                <button onClick={() => setShowSitesList(false)} className="p-1.5 hover:bg-white/10 rounded-full">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="px-3 pb-4 max-h-64 overflow-y-auto">
                <div className="text-center py-6">
                  <Globe className="w-10 h-10 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-500 text-xs">No connected sites</p>
                  <p className="text-gray-600 text-[10px] mt-2">Site connections will appear here</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Address Copy Popup (Phantom style) */}
      <AnimatePresence>
        {showCopyPopup && (
          <>
            <div
              className="fixed inset-0 z-[50] bg-transparent"
              onClick={() => setShowCopyPopup(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-14 left-3 w-64 bg-gray-900 border border-white/10 rounded-md shadow-2xl z-[60] p-1 overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-2.5 hover:bg-white/5 rounded-lg transition-colors group cursor-pointer"
                onClick={() => { handleCopy(); }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center border border-white/10">
                    <div className="w-3.5 h-3.5 bg-gradient-to-tr from-purple-500 to-green-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Solana</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-mono">{activeWallet?.address || ''}</span>
                  {copied ? (
                    <Check className="w-3 h-3 text-green-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-gray-500 group-hover:text-white" />
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
