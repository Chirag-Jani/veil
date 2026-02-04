# Veil

> **Privacy by default. Multi-chain wallet for Ethereum and Solana—private transfers and burner identities. Connect anywhere without risking your main wallet.**

**Type:** Non-custodial multi-chain browser wallet extension (EVM + Solana)  
**Goal:** Privacy-first: private transfers and unlinkable activity across Ethereum and Solana

---

## The Problem

- Users don't want to connect their main wallet to random websites—it ties identity to every site and leaves a public trail.
- Managing many test/burner wallets manually is painful; address reuse builds a linkable identity graph.
- Most wallets are single-chain or don't put privacy first; privacy is an afterthought.

---

## The Solution

**One encrypted master seed. Unlimited burner wallets. Private transfers on EVM and Solana.**

Veil is a **multi-chain privacy wallet** (Ethereum + Solana). You connect to dApps with disposable burner addresses; when you want unlinkable payments you use private transfers (privacy pools / private send). Same flow on both chains; privacy is the default promise, not an add-on.

---

## Core Concept

**Privacy by default.** Private transfers and unlinkable activity are the product; burner wallets and multi-chain support that.

The wallet manages **one locally encrypted master seed**. From this seed it derives **one-time burner wallets** (HD paths). Each burner is:
- **Session-scoped** — bound to a specific site
- **Site-bound** — isolated per dApp
- **Never reused** — once retired, a burner is gone

---

## Burner Wallet Model

| Condition | Behavior |
|-----------|----------|
| Balance > 0 | Reuse current burner for the site |
| Balance == 0 | Auto-generate a new burner on unlock/open |
| Funds drained | Burner marked retired, never reused |

- Burners are deterministically recoverable from the master seed.
- No on-chain deletion required; privacy achieved via key non-reuse.

---

## Website Connection Flow

1. **Injection:** Extension injects `window.solana` as a provider proxy (coexists with other wallets via `window.solana.providers`).
2. **Isolation:** dApps only ever see a burner wallet, never the master wallet.
3. **Connection Approval:** Users must explicitly approve each site connection with a confirmation modal.
4. **Message Signing:** Message signing is supported with user approval required for each request.
5. **Transaction Signing:** Coming soon - transaction signing will be added in a future update.
6. **No Exposure:** Private keys never leave the device.

---

## Funds Handling

- **Automatic Balance Monitoring:** Background service worker monitors all burner wallets for incoming SOL deposits (configurable interval, default: 30 seconds).
- **Real-time Updates:** Wallet balances automatically update when new SOL arrives.
- **Optional Private Transfers:** 
  - **Toggle in Settings:** Enable when you want unlinkable on-chain transfers—burner wallets are the core security.
  - **When Enabled:**
    - **Deposit:** Move funds from burner wallets into a privacy pool for unlinkable transfers (fully tested ✅)
    - **Withdraw:** Move funds back to any wallet address (fully tested ✅, includes automatic retry for blockhash expiration)
    - **Private Balance:** Display of private balance from pool UTXOs
  - **When Disabled:** Normal wallet mode - shows regular SOL balance
- **Transfer:** Transfer SOL between wallets with improved error handling and confirmation
- **Real-time Price:** Dynamic SOL/USD price fetching from CoinGecko API
- **Modern UI:** Compact, modern transaction history with detailed transaction views
- No forced mixing — user-controlled flow.

---

## Privacy Guarantees

| Guarantee | How |
|-----------|-----|
| No address reuse | Fresh burner per session/site |
| No wallet-to-wallet linking | Sites never see the master wallet |
| Optional timing obfuscation | Randomized delays before transfers |
| On-chain unlinkability | Optional privacy pool integration |

**Privacy by Design:** Achieved through key isolation + automation, not user discipline.

---

## Security Model

- ✅ **No backend custody** — fully non-custodial
- ✅ **Local signing** — all keys stay on device
- ✅ **Ephemeral keys** — burner private keys never stored persistently
- ✅ **Deterministic recovery** — all burners recoverable from master seed
- ✅ **Metadata only** — only non-sensitive metadata may touch auxiliary services

---

## What It Is NOT

- ❌ **Not** a custodial wallet
- ❌ **Not** a centralized mixer
- ❌ **Not** managing its own privacy pool or ZK circuits

---

## Target Users

- Privacy-conscious users on Ethereum and Solana
- DeFi explorers testing new protocols
- NFT minters connecting to unknown sites
- Airdrop hunters
- DAO treasuries
- Builders needing secure dApp connections

---

## Positioning

**Category:** Multi-chain privacy wallet (EVM + Solana)  
**Value proposition:**  

> "Privacy by default. One wallet for Ethereum and Solana—private transfers and burner identities."

Burner wallets provide site isolation and security by design. Private transfers (privacy pools) for unlinkable activity on Solana (live) and Ethereum (coming).

---

## Current Features

✅ **Wallet Management**
- Master seed encryption and storage
- Deterministic burner wallet generation
- Wallet unlock/lock with session management
- Multiple burner wallet support

✅ **dApp Integration**
- `window.solana` provider injection (coexists with Phantom/Solflare)
- Site connection with approval flow
- Connected sites management
- Message signing with user approval
- Connection/disconnection handling

✅ **Optional Private Transfers**
- Deposit to privacy pool (fully tested ✅)
- Withdraw to any address (fully tested ✅)
- Private balance display
- Toggle in settings (optional add-on)

✅ **Balance & Monitoring**
- Real-time balance monitoring (configurable interval)
- Automatic balance updates
- SOL/USD price fetching
- Transaction history tracking

⏳ **Coming Soon**
- Transaction signing (signTransaction, signAllTransactions)
- Enhanced transaction preview and analysis

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion
- **Crypto:** BIP39, Ed25519, HD wallet derivation, tweetnacl
- **Blockchain:** Solana Web3.js
- **Extension:** Chrome Manifest V3, Service Workers
- **Optional:** Privacy pool integration for unlinkable transfers (fully functional and tested ✅)
- **Monitoring:** Background balance monitoring service (configurable interval)
- **History:** Complete transaction history tracking and display with modern, compact UI
- **Error Handling:** Centralized error handler with user-friendly messages
- **UI/UX:** Modern, compact design with Solana branding and real-time price updates

## Configuration

- **Environment Variables:** `.env` file in `packages/extension/`
  - `VITE_SOLANA_RPCS` - Comma-separated list of Solana RPC endpoints for rotation
    - Example: `VITE_SOLANA_RPCS=https://api.mainnet-beta.solana.com,https://solana-api.projectserum.com`
  - `VITE_BALANCE_CHECK_INTERVAL_MS` - Balance monitoring interval in milliseconds (default: 30000 = 30 seconds)
    - Minimum: 5000 (5 seconds), Maximum: 300000 (5 minutes)
    - Example: `VITE_BALANCE_CHECK_INTERVAL_MS=60000` (check every minute)

---

## License

MIT
