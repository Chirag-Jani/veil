# Veil Project Milestones

> A privacy-by-default Solana wallet that automatically uses one-time burner wallets for dApp connections and lets users migrate funds to Privacy Cash when needed.

---

## Milestone 1: Frontend & UI/UX (Mocked) ✅

- [x] Setup Project Architecture (React, Vite, Tailwind, Framer Motion)
- [x] Design "Premium" Aesthetic (Dark mode, glassmorphism, animations)
- [x] Implement Onboarding Flow (Mock Seed generation/restore simulation)
- [x] Build Main Dashboard (Mock Balance, Active Burner Wallet display)
- [x] Build History & Settings Pages (Mock Transaction logs, Configuration toggles)
- [x] Implement Mock Services (Console logging for actions)
- [x] Ensure full navigation flow works without real backend logic

### UI Alignment (Product Vision Update) ✅
- [x] Site-bound burner display with domain indicator
- [x] Connected Sites list with toggle (Home page)
- [x] Manual "Migrate" button (replaces auto-forward messaging)
- [x] Balance-based burner generation logic (disable new burner if balance > 0)
- [x] Disconnect button for active site connections
- [x] Restore wallet flow implementation (Onboarding)
- [x] Reveal/hide seed phrase with blur effect
- [x] Activity filters (all, connections, transfers) in History
- [x] Settings page redesign (Phantom/MetaMask inspired)
- [x] Export Private Key feature (password-gated, Base58 format)
- [x] Lock Wallet functionality
- [x] Archived Wallets page (dedicated panel for archived wallet management)
- [x] Updated messaging: "dApps never see your main wallet"

### UI/UX Refinements ✅
- [x] Enhanced balance display section with improved typography and gradient effects
- [x] Improved action buttons (Migrate to Privacy & New Burner) with gradient styling and better visual hierarchy
- [x] More compact activity tab layout with optimized spacing and information density
- [x] **Activity UI Redesign** - Modern, compact design with Solana branding
- [x] **Transaction Detail Modal** - Redesigned with key-value pairs, network fee display, and detailed date formatting
- [x] **Home Page UI** - Redesigned balance display, action buttons, and token cards
- [x] **Dynamic SOL Price** - Real-time SOL/USD price fetching from CoinGecko API

---

## Milestone 2: Core Wallet & Burner Logic

### Key Management ✅
- [x] Implement Real Key Management (BIP39, Ed25519, Encrypted LocalStorage)
- [x] Secure master seed encryption/decryption with password
- [x] Replace Mock "Generate Burner" with real HD Wallet derivation
- [x] Deterministic burner recovery from master seed
- [x] Private key export functionality (Base58 format, full 64-byte secretKey)
- [x] Public key verification for exported keys

### Burner Wallet System ✅
- [x] Auto-generate first burner wallet on unlock
- [x] Sequential account naming (Account 1, Account 2, etc.)
- [x] Burner indexing for deterministic recovery
- [x] Wallet archiving system (auto-archive wallets with balance < 0.001 SOL)
- [x] Archived wallets management page
- [x] Private key export from archived wallets
- [ ] Implement site-bound burner wallet generation
- [ ] Session-scoped burner lifecycle management
- [ ] Balance-based burner reuse logic:
  - Balance > 0 → reuse current burner
  - Balance == 0 → auto-generate new burner
- [ ] Burner retirement system (mark retired, never reuse)

### Solana Integration ✅
- [x] Integrate Solana Web3.js for real account queries
- [x] Real-time balance checking for burner wallets (via balance monitor)
- [x] Address validation and formatting
- [x] SOL transfer functionality with improved error handling
- [x] Non-blocking transaction confirmation with timeout handling
- [x] Message signing for dApp interactions (signMessage with approval)
- [ ] Transaction building and local signing (signTransaction, signAllTransactions - Coming soon)

---

## Milestone 3: Extension Provider & dApp Integration

### Provider Injection ✅
- [x] Implement `window.solana` provider proxy injection (coexists with Phantom/Solflare via `window.solana.providers`)
- [x] Content script to inject provider on page load
- [x] Provider API compatibility (connect, disconnect, signMessage)
- [x] Provider exposed as `window.veil` and registered in `window.solana.providers`

### Connection Flow ✅
- [x] dApp connection request handling
- [x] Connection approval modal (user must approve each connection)
- [x] Connected sites management and storage
- [x] Connection state persistence
- [x] Auto-open extension popup for unlock/approval
- [ ] Site-specific burner wallet selection/generation (deferred - currently uses active wallet)

### Message Signing ✅
- [x] Message signing with user approval required
- [x] Sign approval modal with message preview
- [x] Secure message signing flow (signMessage fully functional)
- [ ] Transaction signing (signTransaction, signAllTransactions) - Coming soon

### Message Passing ✅
- [x] Content script ↔ Background service worker communication (messaging system ready)
- [x] Popup ↔ Background service worker communication (balance check messages, provider requests)
- [x] Provider request handling (connect, disconnect, signMessage, getAccount)

---

## Milestone 4: Funds Management & Privacy

### Balance Monitoring ✅
- [x] Background monitoring for incoming SOL deposits
- [x] Polling RPC for burner wallet balances (configurable interval, default: 30 seconds)
- [x] Automatic balance updates in stored wallet data
- [x] Real-time UI updates when balances change
- [x] Balance monitor service with RPC rotation support
- [x] Sequential wallet processing to reduce rate limiting
- [ ] Push notifications for incoming funds (optional)

### Manual Fund Migration ✅
- [x] User-initiated transfer functionality
- [x] Transfer UI for moving funds between wallets
- [x] TransferModal component with MAX button
- [x] Improved password handling and wallet lock checks
- [x] Non-blocking transaction confirmation with timeout handling
- [x] Enhanced error messages and logging

### Privacy Cash Integration ✅
- [x] Install Privacy Cash SDK (`privacycash` npm package)
- [x] Copy circuit files to `public/circuit2/` (transaction2.wasm, transaction2.zkey)
- [x] Create storage adapter (`privacyCashStorage.ts`) - chrome.storage wrapper for SDK
- [x] Create RPC manager (`rpcManager.ts`) - rotation & failover logic
- [x] Create signer factory (`privacyCashSigner.ts`) - per-wallet transaction signing
- [x] Create PrivacyCash service layer (`privacyCashService.ts`) - main integration
- [x] Create DepositModal component (UI ready)
- [x] Create WithdrawModal component (UI ready, fully functional)
- [x] Private balance display on Home page (real data from Privacy Cash)
- [x] Withdrawal flow from Privacy Cash to fresh wallet (fully integrated and tested ✅)
- [x] Circuit file path handling via chrome.runtime.getURL
- [x] Automatic service initialization on wallet unlock (only when Privacy Cash mode enabled)
- [x] Manual deposit flow: Burner → Privacy Cash (fully integrated and tested ✅)
- [x] Transaction history tracking and display
- [x] Error handling improvements
- [x] Blockhash expiration retry logic for withdraw operations (up to 3 retries)
- [x] Configurable balance monitoring
- [x] Privacy Cash mode toggle in Settings (default: disabled, normal wallet mode)
  - When disabled: Shows regular SOL balance, no Privacy Cash features
  - When enabled: Shows private balance, enables deposit/withdraw features
- [ ] Privacy score/status display (deferred for later)

---

## Milestone 5: Polish & Security

### Security Hardening
- [ ] Security audit of key handling
- [ ] Memory safety for private keys
- [ ] Extension sandboxing best practices
- [ ] Input validation and sanitization

### Testing
- [ ] Unit tests for crypto operations
- [ ] Integration tests for dApp connections
- [ ] Testnet end-to-end testing
- [ ] Mainnet testing with small amounts

### Final Polish
- [ ] UI/UX refinements based on testing
- [ ] Animation performance optimization
- [ ] Error handling and user feedback
- [ ] Documentation and user guides

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        VEIL EXTENSION                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Popup UI  │◄──►│  Background │◄──►│Content Script│     │
│  │  (React)    │    │   Worker    │    │  (Injector)  │     │
│  └─────────────┘    └──────┬──────┘    └──────┬──────┘     │
│                            │                   │            │
│                            ▼                   ▼            │
│                   ┌─────────────┐      ┌─────────────┐     │
│                   │ Key Manager │      │window.solana│     │
│                   │ (Encrypted) │      │   Provider  │     │
│                   └──────┬──────┘      └─────────────┘     │
│                          │                                  │
│                          ▼                                  │
│                   ┌─────────────┐                          │
│                   │   Burner    │                          │
│                   │  Derivation │                          │
│                   │   (HD)      │                          │
│                   └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │      Solana RPC         │
              │   (Devnet/Mainnet)      │
              └─────────────────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │     Privacy Cash        │
              │   (Optional Migration)  │
              └─────────────────────────┘
```

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Session-scoped burners | Prevents cross-site tracking |
| Balance-based reuse | Reduces clutter, maintains privacy |
| Manual Privacy Cash | User controls privacy level |
| No persistent burner keys | Security via ephemerality |
| Deterministic derivation | Full recovery from seed |
