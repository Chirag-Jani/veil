# Veil

> **A privacy-by-default Solana wallet that automatically uses one-time burner wallets for dApp connections and lets users migrate funds to Privacy Cash when needed.**

**Type:** Non-custodial Solana browser wallet extension  
**Goal:** Connect anywhere without risking your main wallet

---

## The Problem

- Users don't want to connect their main wallet to random websites.
- Managing many test/burner wallets manually is painful.
- Address reuse creates traceable on-chain identity graphs.

---

## The Solution

**One encrypted master seed. Unlimited deterministic burner wallets.**

Veil lets you safely connect to any website using temporary, session-scoped burner wallets by default. Your main wallet stays hidden, and you control when and how to move funds.

---

## Core Concept

The wallet manages **one locally encrypted master seed**.  
From this seed, it deterministically derives **one-time burner wallets** using HD paths.

Each burner wallet is:
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

1. **Injection:** Extension injects `window.solana` as a provider proxy.
2. **Isolation:** dApps only ever see a burner wallet, never the master wallet.
3. **Local Signing:** All transaction signing happens locally inside the extension.
4. **No Exposure:** Private keys never leave the device.

---

## Funds Handling

- **Automatic Balance Monitoring:** Background service worker monitors all burner wallets for incoming SOL deposits (configurable interval, default: 30 seconds).
- **Real-time Updates:** Wallet balances automatically update when new SOL arrives.
- **Privacy Cash Integration (Optional):** 
  - **Toggle in Settings:** Privacy Cash mode can be enabled/disabled via Settings (default: disabled, normal wallet mode)
  - **When Enabled:**
    - **Deposit:** Move funds from burner wallets to Privacy Cash for unlinkable on-chain privacy
    - **Withdraw:** Move funds from Privacy Cash back to any wallet address
    - **Private Balance:** Display of private balance from Privacy Cash UTXOs
  - **When Disabled (Default):** Normal wallet mode - shows regular SOL balance, no Privacy Cash features
- **Transfer/Sweep:** Transfer SOL between wallets or sweep all funds to another address
- No forced mixing — user-controlled flow.

---

## Privacy Guarantees

| Guarantee | How |
|-----------|-----|
| No address reuse | Fresh burner per session/site |
| No wallet-to-wallet linking | Sites never see the master wallet |
| Optional timing obfuscation | Randomized delays before transfers |
| On-chain unlinkability | Handled by Privacy Cash integration |

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

- Privacy-conscious Solana users
- DeFi explorers testing new protocols
- NFT minters connecting to unknown sites
- Airdrop hunters
- DAO treasuries
- Builders needing privacy-by-default flows

---

## Positioning

**Category:** Privacy tooling, not a mixer  
**Key integration:** Privacy Cash SDK  
**Value proposition:**  

> "Connect anywhere without risking your main wallet."

---

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Framer Motion
- **Crypto:** BIP39, Ed25519, HD wallet derivation
- **Blockchain:** Solana Web3.js
- **Extension:** Chrome Manifest V3, Service Workers
- **Privacy:** Privacy Cash SDK integration (Deposit & Withdraw fully functional)
- **Monitoring:** Background balance monitoring service (configurable interval)
- **History:** Complete transaction history tracking and display
- **Error Handling:** Centralized error handler with user-friendly messages

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
