# Privacy Cash SDK Integration Plan

## Overview
Integrate Privacy Cash SDK to enable private deposits/withdrawals in the Veil wallet extension. Users can migrate funds from burner wallets to Privacy Cash for unlinkable on-chain privacy.

## Privacy Cash Mode Toggle ✅

**Status:** Implemented

Privacy Cash features are now **optional** and can be toggled via Settings:

- **Default:** Privacy Cash mode is **disabled** (normal wallet mode)
- **When Disabled:**
  - Shows regular SOL balance from on-chain account
  - Privacy Cash service is not initialized
  - Deposit/Withdraw buttons are hidden
  - Private balance display is hidden
- **When Enabled:**
  - Privacy Cash service initializes on wallet unlock
  - Shows private balance from Privacy Cash UTXOs
  - Deposit/Withdraw buttons are visible
  - All Privacy Cash features are available

**Implementation:**
- Settings toggle in `Settings.tsx`
- Setting stored in `chrome.storage.local` as `veil:privacy_cash_mode`
- Home page checks setting before initializing Privacy Cash service
- UI elements conditionally rendered based on setting

## Architecture

### 1. SDK Installation
- Install `privacycash` package via npm (not using local SDK folder)
- SDK will be used as a standard npm dependency

### 2. Storage Adapter
**Problem:** SDK uses `node-localstorage` which doesn't work in browser extensions.

**Solution:** Create a storage adapter (`src/utils/privacyCashStorage.ts`) that:
- Implements `getItem()`, `setItem()`, `removeItem()` interface
- Wraps `chrome.storage.local` with synchronous-like API
- Maps SDK storage keys to extension storage namespace (`privacycash:` prefix)
- Handles async chrome.storage operations

**Storage Keys Used by SDK:**
- `fetch_offset{publicKey}` - UTXO fetch offset
- `encrypted_outputs{publicKey}` - Cached encrypted UTXOs
- History keys for UTXO tracking

### 3. RPC Management
**Problem:** Need RPC endpoints with rotation to avoid rate limits.

**Solution:** 
- Read RPC URLs from `.env` as array: `VITE_SOLANA_RPCS=url1,url2,url3`
- Create RPC manager (`src/utils/rpcManager.ts`) with:
  - Round-robin rotation
  - Automatic failover on errors
  - Connection pooling per active wallet

### 4. Transaction Signing
**Problem:** SDK requires transaction signer function, different wallets have different keypairs.

**Solution:**
- Create signer factory per active wallet (`src/utils/privacyCashSigner.ts`)
- Signer function receives `VersionedTransaction`, signs with active wallet's keypair
- Only one wallet active at a time, so single signer instance per PrivacyCash client
- Signer must be recreated when active wallet changes

### 5. Circuit Files ✅
**Problem:** SDK uses `path.join()` for circuit files (`circuit2/transaction2.wasm`, `circuit2/transaction2.zkey`)

**Solution Implemented:**
- Circuit files copied to `public/circuit2/` from local SDK
- Using `chrome.runtime.getURL("circuit2/transaction2")` to get extension resource URLs
- snarkjs works with URLs in browser context, so this approach works correctly
- Files are served as extension resources and accessible at runtime

### 6. Privacy Cash Service
Create `src/utils/privacyCashService.ts` that:
- Initializes `PrivacyCash` client per active wallet
- Manages client lifecycle (create/destroy on wallet switch)
- Provides high-level methods: `deposit()`, `withdraw()`, `getPrivateBalance()`
- Handles RPC rotation internally
- Uses storage adapter and signer factory

**Service Interface:**
```typescript
class PrivacyCashService {
  initialize(keypair: Keypair, rpcUrls: string[]): void
  deposit(lamports: number): Promise<DepositResult>
  withdraw(lamports: number, recipient?: string): Promise<WithdrawResult>
  // recipient: if not provided, defaults to active wallet address
  // Includes automatic retry logic for blockhash expiration errors (up to 3 retries)
  getPrivateBalance(): Promise<number>
  getPrivateBalanceSPL(mintAddress: string): Promise<number>
  clearCache(): Promise<void>
}
```

### 7. UI Integration

#### Home Page Updates
- **Private Balance Display:** Show private balance alongside regular balance
- **Migrate Button:** Implement `handleMigrateFunds()` to:
  1. Get active wallet balance
  2. Call `privacyCashService.deposit()` with full balance
  3. Show loading state during deposit
  4. Update UI after completion
- **Withdraw UI:** Add withdraw functionality with recipient address input
  - Default: Withdraw to active burner wallet
  - Option: User can specify custom recipient address
  - Both options available in withdraw modal

#### New Components
- `DepositModal.tsx` - Deposit funds to Privacy Cash
- `WithdrawModal.tsx` - Withdraw from Privacy Cash
- `PrivateBalanceDisplay.tsx` - Show private balance with refresh

### 8. Environment Configuration

**`.env` file structure:**
```
VITE_SOLANA_RPCS=https://api.mainnet-beta.solana.com,https://solana-api.projectserum.com,...
```

**Circuit files location:**
```
public/circuit2/
  - transaction2.wasm
  - transaction2.zkey
```

## Implementation Steps

1. ✅ **Install SDK:** `npm install privacycash`
2. ✅ **Create storage adapter** - chrome.storage wrapper
3. ✅ **Create RPC manager** - rotation & failover
4. ✅ **Create signer factory** - per-wallet transaction signing
5. ✅ **Copy circuit files** to public directory
6. ✅ **Create PrivacyCash service** - main integration layer
7. ✅ **Update Home page** - private balance display and withdraw functionality
8. ✅ **Add UI components** - WithdrawModal (fully functional), DepositModal (fully functional)
9. ✅ **Add error handling** - RPC retry logic, error handling in service layer, blockhash expiration retry
10. ✅ **Wire up DepositModal** - DepositModal fully connected to PrivacyCash service
11. ✅ **Testing** - Deposit and withdraw tested and working on mainnet

## Key Considerations

### Wallet Switching
- When active wallet changes, destroy old PrivacyCash client
- Create new client with new wallet's keypair
- Clear any cached state if needed

### Error Handling
- **Network/RPC errors:** Auto-retry with next RPC in rotation (up to 3 attempts), then notify user if all fail
- **Insufficient balance:** Show clear error message
- **Transaction failures:** Show user-friendly error message
- **Storage errors:** Fallback to in-memory cache
- **Blockhash expiration:** Automatic retry logic for withdraw operations (up to 3 retries with progressive delays) to handle relayer blockhash expiration during ZK proof generation

### Performance
- ⚠️ **To Revisit:** Private balance caching strategy - cache in extension storage vs always fetch fresh (SDK already caches UTXOs)
- Lazy-load PrivacyCash client (only when needed)
- Batch UTXO fetches where possible

### Security
- Private keys never leave extension
- All signing happens locally
- Storage adapter isolates Privacy Cash data

## Dependencies to Add
- `privacycash` - Main SDK package
- Circuit files (copy from SDK or download)

## Files Created ✅
- ✅ `src/utils/privacyCashStorage.ts` - Storage adapter
- ✅ `src/utils/rpcManager.ts` - RPC rotation
- ✅ `src/utils/privacyCashSigner.ts` - Transaction signer
- ✅ `src/utils/privacyCashService.ts` - Main service
- ✅ `src/utils/balanceMonitor.ts` - Balance monitoring service
- ✅ `src/components/DepositModal.tsx` - Deposit UI
- ✅ `src/components/WithdrawModal.tsx` - Withdraw UI

## Files Modified ✅
- ✅ `src/pages/Home.tsx` - Private balance display, withdraw functionality, balance refresh
- ✅ `src/scripts/background.ts` - Balance monitoring initialization
- ✅ `src/types.ts` - Added CheckBalances message types
- ✅ `src/utils/messaging.ts` - Simplified to essential message types
- ✅ `.env` - RPC URLs configured
- ✅ `public/circuit2/` - Circuit files copied

## Implementation Status

### ✅ Completed
- SDK installation and setup
- Storage adapter (chrome.storage wrapper)
- RPC manager with rotation and failover
- Signer factory for transaction signing
- Circuit files setup (using chrome.runtime.getURL)
- PrivacyCash service layer (deposit, withdraw, getPrivateBalance)
- Withdraw functionality (fully integrated and tested ✅)
- Private balance display (real-time from Privacy Cash)
- Automatic service initialization
- Blockhash expiration retry logic for withdraw operations

### ✅ Fully Integrated
- **Deposit functionality:** DepositModal fully connected to PrivacyCash service
  - Service `deposit()` method implemented and working
  - DepositModal wired up in Home.tsx
  - Balance updates after successful deposit
  - Full error handling implemented
- **Withdraw functionality:** WithdrawModal fully connected to PrivacyCash service
  - Service `withdraw()` method implemented and tested
  - WithdrawModal wired up in Home.tsx
  - Balance updates after successful withdraw
  - Automatic retry logic for blockhash expiration errors
  - Full error handling implemented

### ✅ Completed Enhancements
- Privacy score/status display - Shows privacy score based on private balance and burner count (temporarily hidden)
- Transfer functionality - Users can transfer SOL between wallets with improved error handling
- Transaction confirmation - Non-blocking confirmation with timeout handling
- Password handling - Improved password retrieval from state or sessionStorage
- Activity UI redesign - Modern, compact design with Solana branding and detailed transaction views
- Dynamic SOL price - Real-time SOL/USD price fetching from CoinGecko API

### 🔮 Future Enhancements
- SPL token support (USDC, USDT deposits/withdrawals)
- Transaction history for Privacy Cash operations (✅ Already implemented)
- Push notifications for incoming funds
- Privacy score display (deferred for later)
