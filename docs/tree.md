# Veil Extension - Codebase Structure

## 📁 UI Files (React Components & Pages)

### Pages (`src/pages/`)
- **`Home.tsx`** - Main wallet dashboard UI
  - Wallet balance display
  - Private balance display (when available)
  - Privacy score display (always visible)
  - Burner wallet list modal
  - Connected sites modal
  - Address copy popup
  - Deposit to Privacy button (when balance > 0)
  - Withdraw from Privacy button (when private balance > 0)
  - Transfer/Sweep button (when balance > 0)
  - Generate new burner button
  - Auto-generates first burner on unlock (from onboarding or session)
  - Sequential account naming (Account 1, Account 2, etc.)
  - Auto-archives wallets with balance < 0.001 SOL when generating new burner
  - Real Privacy Cash service integration (deposit, withdraw, balance)
  - Balance monitoring integration (periodic checks)

- **`Onboarding.tsx`** - Wallet setup flow UI
  - Welcome screen
  - Create wallet (mnemonic display)
  - Restore wallet (seed phrase input)
  - Password setup
  - Step navigation with animations

- **`History.tsx`** - Transaction history page (fully functional)
  - Displays all transaction types (deposit, withdraw, transfer, incoming)
  - Filter by transaction type
  - Transaction details modal with full information
  - Link to Solscan explorer for confirmed transactions
  - Real-time updates (refreshes every 5 seconds)
  - Status indicators (pending/confirmed/failed)
  - Optimized React patterns (async state updates)

- **`Settings.tsx`** - Settings page
  - Export Private Key (password-gated, Base58 format, full 64-byte secretKey)
  - Lock Wallet functionality
  - Public key verification for exported keys
  - Navigation to Archived Wallets page
  - Phantom/MetaMask inspired design

- **`ArchivedWallets.tsx`** - Archived wallets management page
  - Displays all archived wallets
  - Shows wallet details (name, address, balance)
  - Export private key functionality for archived wallets
  - Empty state when no archived wallets exist

### Components (`src/components/`)
- **`UnlockWallet.tsx`** - Password unlock screen UI
  - Password input
  - Error handling
  - Unlock button
  - 300ms delay before unlock for better UX

- **`DepositModal.tsx`** - Deposit funds to Privacy Cash modal (fully functional)
  - Amount input with MAX button
  - Available balance display
  - Validation and error handling
  - Loading states
  - Connected to PrivacyCash service

- **`WithdrawModal.tsx`** - Withdraw funds from Privacy Cash modal (fully functional)
  - Amount input with MAX button
  - Private balance display
  - Recipient selection (active wallet or custom address)
  - Address copy functionality
  - Validation and error handling
  - Loading states

### Entry Points
- **`App.tsx`** - Main router setup
  - Routes configuration
  - Navigation logic

- **`popup.html`** - Extension popup HTML template

- **`scripts/popup.tsx`** - React app entry point
  - Loads polyfills
  - Renders App component

---

## ⚙️ Logic Files (Utilities & Business Logic)

### Core Logic (`src/utils/`)
- **`keyManager.ts`** - Cryptographic operations & wallet management
  - BIP39 mnemonic generation/validation (explicit English wordlist)
  - Seed derivation (mnemonic → seed)
  - HD wallet keypair derivation (seed → Solana keypairs via ed25519-hd-key)
  - Master seed encryption/decryption
  - Burner wallet keypair generation (deterministic by index)
  - Wallet recovery
  - Keypair derivation for specific wallet indices

- **`crypto.ts`** - Encryption utilities
  - PBKDF2 key derivation
  - AES-GCM encryption/decryption
  - Random bytes generation

- **`storage.ts`** - Chrome storage management
  - Burner wallet CRUD operations
  - Connected sites management
  - Address formatting utilities
  - Sequential account number generation (Account 1, Account 2, etc.)
  - Wallet archiving/unarchiving functions
  - Get archived wallets function
  - Type definitions (BurnerWallet, ConnectedSite)

- **`walletLock.ts`** - Session management
  - Wallet lock/unlock state
  - Session timeout (15 minutes)
  - Session validation and extension

- **`messaging.ts`** - Extension messaging system
  - Simplified message types (only `checkBalances` currently)
  - Async message handling with TypeScript types
  - Message handlers for background/content scripts
  - Typed sendMessage and onMessageType utilities

- **`balanceMonitor.ts`** - Balance monitoring service
  - Monitors all burner wallets for incoming SOL deposits
  - Automatic balance updates every 30 seconds
  - Tracks balance changes and updates stored wallet data
  - Runs in background service worker
  - RPC rotation support for reliable balance checks

- **`privacyCashStorage.ts`** - Privacy Cash SDK storage adapter
  - Wraps chrome.storage.local with synchronous-like API
  - Implements Storage interface for SDK compatibility
  - Namespace isolation with `privacycash:` prefix
  - In-memory cache for synchronous access
  - Preload functions for public key-specific data

- **`rpcManager.ts`** - RPC endpoint management
  - Round-robin rotation for multiple RPC endpoints
  - Automatic failover on network errors
  - Connection caching per RPC URL
  - Exponential backoff retry logic
  - Environment variable configuration (VITE_SOLANA_RPCS)

- **`privacyCashSigner.ts`** - Transaction signer factory
  - Creates signer functions for Privacy Cash SDK
  - Per-wallet keypair signing
  - Supports single and multi-signer patterns

### Extension Scripts (`src/scripts/`)
- **`background.ts`** - Background service worker
  - Extension installation handler
  - Balance monitoring initialization and startup
  - Automatic balance checks every 30 seconds
  - Handles `checkBalances` message requests from popup
  - Returns balance updates to requesting popup

- **`content.ts`** - Content script
  - Minimal implementation
  - Ready for future dApp provider injection
  - No active handlers currently

### Configuration & Polyfills
- **`polyfills.ts`** - Browser polyfills
  - Buffer polyfill
  - Process polyfill
  - Crypto polyfill
  - CommonJS require() shim

- **`types/crypto-browserify.d.ts`** - TypeScript declarations for crypto-browserify

### Static Assets (`public/`)
- **`circuit2/`** - Privacy Cash ZK circuit files
  - `transaction2.wasm` - WebAssembly circuit file
  - `transaction2.zkey` - Zero-knowledge key file
  - Required for Privacy Cash proof generation

---

## 📊 Summary

**UI Files (12):**
- `App.tsx`, `popup.html`, `scripts/popup.tsx`
- `pages/Home.tsx`, `pages/Onboarding.tsx`, `pages/History.tsx`, `pages/Settings.tsx`, `pages/ArchivedWallets.tsx`
- `components/UnlockWallet.tsx`, `components/DepositModal.tsx`, `components/WithdrawModal.tsx`, `components/TransferModal.tsx`, `components/PrivacyScoreDisplay.tsx`

**Logic Files (10):**
- `utils/keyManager.ts` - Core crypto & wallet logic
- `utils/crypto.ts` - Encryption/decryption
- `utils/storage.ts` - Data persistence
- `utils/walletLock.ts` - Session management
- `utils/messaging.ts` - Extension messaging
- `utils/balanceMonitor.ts` - Balance monitoring service
- `utils/privacyCashStorage.ts` - Privacy Cash storage adapter
- `utils/rpcManager.ts` - RPC endpoint management
- `utils/privacyCashSigner.ts` - Transaction signer factory
- `scripts/background.ts`, `scripts/content.ts` - Extension scripts

**Configuration:**
- `polyfills.ts` - Browser compatibility
- `types/` - TypeScript definitions

---

## 🔄 Data Flow

1. **Wallet Creation Flow:**
   - `Onboarding.tsx` (UI) → `keyManager.ts` (generate mnemonic) → `crypto.ts` (encrypt seed) → `storage.ts` (save)

2. **Wallet Unlock Flow:**
   - `UnlockWallet.tsx` (UI) → `keyManager.ts` (decrypt seed) → `walletLock.ts` (create session) → `Home.tsx` (display)

3. **Burner Generation Flow:**
   - `Home.tsx` (UI) → Check existing wallets → Archive wallets with balance < 0.001 SOL → `keyManager.ts` (derive keypair) → `storage.ts` (save burner with sequential name)
   - Auto-triggered on unlock if no burners exist
   - Uses password from state or sessionStorage (from onboarding)
   - Automatically archives low-balance wallets before generating new one

4. **Private Key Export Flow:**
   - `Settings.tsx` or `ArchivedWallets.tsx` (UI) → Password verification → `keyManager.ts` (derive keypair for selected wallet) → Export full 64-byte secretKey in Base58 format
   - Verifies derived public key matches stored address before export
   - Works for both active and archived wallets

5. **Wallet Archiving Flow:**
   - `Home.tsx` (UI) → Check wallet balances before generating new burner → `storage.ts` (archive wallets with balance < 0.001 SOL) → Generate new burner
   - Archived wallets accessible via `ArchivedWallets.tsx` page

6. **Session Management:**
   - `walletLock.ts` tracks session state → `Home.tsx` checks periodically → Auto-locks after 15 minutes

7. **Privacy Cash Integration (In Progress):**
   - Foundation utilities created (storage adapter, RPC manager, signer factory)
   - Circuit files copied to `public/circuit2/`
   - UI components ready (DepositModal, WithdrawModal)
   - Withdraw functionality fully integrated with real Privacy Cash service
   - Deposit functionality UI ready (service integration pending)

8. **Balance Monitoring:**
   - Background service worker monitors all burner wallets for incoming SOL
   - Automatic balance checks every 30 seconds
   - Real-time balance updates in UI when deposits detected
   - Balance changes tracked and stored automatically
   - Home page refreshes balances periodically and on demand

9. **Messaging System:**
   - Simplified to only essential message types
   - `checkBalances` message for balance updates
   - Async message handling with proper TypeScript types
   - Background worker handles balance check requests

10. **Fund Management:**
    - Deposit to Privacy Cash (fully integrated)
    - Withdraw from Privacy Cash (fully integrated)
    - Transfer/Sweep between wallets (fully functional)
    - Privacy score calculation and display
    - All operations update balances in real-time
