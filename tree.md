# Veil Extension - Codebase Structure

## 📁 UI Files (React Components & Pages)

### Pages (`src/pages/`)
- **`Home.tsx`** - Main wallet dashboard UI
  - Wallet balance display
  - Burner wallet list modal
  - Connected sites modal
  - Address copy popup
  - Generate new burner button
  - Migrate funds button
  - Auto-generates first burner on unlock (from onboarding or session)
  - Sequential account naming (Account 1, Account 2, etc.)

- **`Onboarding.tsx`** - Wallet setup flow UI
  - Welcome screen
  - Create wallet (mnemonic display)
  - Restore wallet (seed phrase input)
  - Password setup
  - Step navigation with animations

- **`History.tsx`** - Transaction history page (UI only, logic pending)

- **`Settings.tsx`** - Settings page
  - Export Private Key (password-gated, Base58 format, full 64-byte secretKey)
  - Lock Wallet functionality
  - Public key verification for exported keys
  - Phantom/MetaMask inspired design

### Components (`src/components/`)
- **`UnlockWallet.tsx`** - Password unlock screen UI
  - Password input
  - Error handling
  - Unlock button

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
  - Type definitions (BurnerWallet, ConnectedSite)

- **`walletLock.ts`** - Session management
  - Wallet lock/unlock state
  - Session timeout (15 minutes)
  - Session validation and extension

- **`messaging.ts`** - Extension messaging system
  - Message type definitions
  - Message handlers for background/content scripts

### Extension Scripts (`src/scripts/`)
- **`background.ts`** - Background service worker
  - Extension installation handler
  - Message listeners

- **`content.ts`** - Content script
  - Injected into web pages
  - Page info handlers
  - (Currently has test border styling)

### Configuration & Polyfills
- **`polyfills.ts`** - Browser polyfills
  - Buffer polyfill
  - Process polyfill
  - Crypto polyfill
  - CommonJS require() shim

- **`types/crypto-browserify.d.ts`** - TypeScript declarations for crypto-browserify

---

## 📊 Summary

**UI Files (7):**
- `App.tsx`, `popup.html`, `scripts/popup.tsx`
- `pages/Home.tsx`, `pages/Onboarding.tsx`, `pages/History.tsx`, `pages/Settings.tsx`
- `components/UnlockWallet.tsx`

**Logic Files (6):**
- `utils/keyManager.ts` - Core crypto & wallet logic
- `utils/crypto.ts` - Encryption/decryption
- `utils/storage.ts` - Data persistence
- `utils/walletLock.ts` - Session management
- `utils/messaging.ts` - Extension messaging
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
   - `Home.tsx` (UI) → `keyManager.ts` (derive keypair) → `storage.ts` (save burner with sequential name)
   - Auto-triggered on unlock if no burners exist
   - Uses password from state or sessionStorage (from onboarding)

4. **Private Key Export Flow:**
   - `Settings.tsx` (UI) → Password verification → `keyManager.ts` (derive keypair for active wallet) → Export full 64-byte secretKey in Base58 format
   - Verifies derived public key matches stored address before export

4. **Session Management:**
   - `walletLock.ts` tracks session state → `Home.tsx` checks periodically → Auto-locks after 15 minutes
