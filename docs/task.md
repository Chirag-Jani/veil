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

### Solana Integration
- [ ] Integrate Solana Web3.js for real account queries
- [ ] Real-time balance checking for burner wallets
- [ ] Address validation and formatting
- [ ] Transaction building and local signing

---

## Milestone 3: Extension Provider & dApp Integration

### Provider Injection
- [ ] Implement `window.solana` provider proxy injection
- [ ] Content script to inject provider on page load
- [ ] Provider API compatibility (connect, disconnect, signTransaction, etc.)

### Connection Flow
- [ ] dApp connection request handling
- [ ] Site-specific burner wallet selection/generation
- [ ] Permission management per site
- [ ] Connection state persistence

### Message Passing
- [ ] Content script ↔ Background service worker communication
- [ ] Popup ↔ Background service worker communication
- [ ] Secure message signing flow

---

## Milestone 4: Funds Management & Privacy

### Balance Monitoring
- [ ] Background monitoring for incoming SOL deposits
- [ ] Polling RPC for burner wallet balances
- [ ] Push notifications for incoming funds (optional)

### Manual Fund Migration
- [ ] User-initiated sweep/drain functionality
- [ ] Transfer UI for moving funds between wallets
- [ ] Optional timing obfuscation (randomized delays)

### Privacy Cash Integration
- [ ] Integrate Privacy Cash SDK
- [ ] Manual deposit flow: Burner → Privacy Cash
- [ ] Withdrawal flow from Privacy Cash to fresh wallet
- [ ] Privacy score/status display

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
