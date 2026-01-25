# Privacy Cash SDK Integration Plan

## Overview
Integrate Privacy Cash SDK to enable private deposits/withdrawals in the Veil wallet extension. Users can migrate funds from burner wallets to Privacy Cash for unlinkable on-chain privacy.

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

### 5. Circuit Files
**Problem:** SDK uses `path.join()` for circuit files (`circuit2/transaction2.wasm`, `circuit2/transaction2.zkey`)

**Solution Options:**
- **Option A (Recommended):** Copy circuit files to `public/circuit2/` and modify SDK initialization to use relative paths
- **Option B:** Bundle circuit files and serve via extension's resource URLs
- **Option C:** Fetch from CDN if available

**Decision:** ⚠️ **To Revisit** - Determine best approach for circuit file paths in browser extension context

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

1. **Install SDK:** `npm install privacycash`
2. **Create storage adapter** - chrome.storage wrapper
3. **Create RPC manager** - rotation & failover
4. **Create signer factory** - per-wallet transaction signing
5. **Copy circuit files** to public directory
6. **Create PrivacyCash service** - main integration layer
7. **Update Home page** - migrate button functionality
8. **Add UI components** - deposit/withdraw modals
9. **Add error handling** - user-friendly error messages
10. **Testing** - test with small amounts first

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
- ⚠️ **To Revisit:** Finalize error recovery strategy and user notification approach

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

## Files to Create
- `src/utils/privacyCashStorage.ts` - Storage adapter
- `src/utils/rpcManager.ts` - RPC rotation
- `src/utils/privacyCashSigner.ts` - Transaction signer
- `src/utils/privacyCashService.ts` - Main service
- `src/components/DepositModal.tsx` - Deposit UI
- `src/components/WithdrawModal.tsx` - Withdraw UI

## Files to Modify
- `src/pages/Home.tsx` - Add migrate functionality
- `src/utils/storage.ts` - Add private balance tracking (optional)
- `vite.config.ts` - Ensure circuit files are included in build
- `.env` - Add RPC URLs

## Questions/Decisions to Revisit

1. **Circuit Files Path:** Determine best approach for serving circuit files in browser extension (public directory, bundled, or CDN)

2. **Private Balance Caching:** Decide whether to cache private balances in extension storage or always fetch fresh (SDK already handles UTXO caching)

3. **Error Recovery Strategy:** Finalize auto-retry logic and user notification approach for failed transactions
