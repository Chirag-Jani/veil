# Veil

**Type:** Non-custodial Solana browser wallet extension  
**Goal:** Make everyday Solana payments unlinkable by default

Ghosty is a privacy-focused Solana wallet that manages one locally encrypted master seed to deterministically derive one-time burner wallets. It ensures that transactions are unlinkable and private by default through automated funding routing and integration with Privacy Cash.

---

## Core Concept

The wallet manages **one locally encrypted master seed**.  
From this seed, it deterministically derives **one-time burner wallets** using HD paths.

Each burner wallet is:
- Used **once** as a receive address
- **Never reused**
- **Drained** after use

---

## Transaction Flow

1. **Generation:** User generates a fresh burner address.
2. **Reception:** Burner receives SOL or SPL tokens (e.g., USDC).
3. **Monitoring:** Extension monitors incoming transactions via Solana RPC.
4. **Forwarding:** After receipt, funds are forwarded with a **randomized delay** to reduce timing correlation.
5. **Deposit:** Funds are deposited directly into **Privacy Cash** using its SDK.
6. **Withdrawal:** User later withdraws from Privacy Cash to a fresh, unrelated wallet.

---

## Privacy Model

- **No address reuse:** Every transaction uses a fresh address.
- **Timing obfuscation:** Randomized delays prevent timing correlation.
- **On-chain unlinkability:** Handled by Privacy Cash (commitments, Merkle tree, nullifiers).
- **Privacy by Design:** Achieved through key isolation + automation, not user discipline.

---

## Security & Trust Assumptions

- **Local Signing:** All transaction signing happens locally inside the extension.
- **No Backend Access:** No backend ever sees private keys.
- **Ephemeral Keys:** Burner private keys are never persistently stored.
- **Metadata:** Only non-sensitive metadata may touch auxiliary services.

---

## What It Is NOT

- ❌ **Not** a custodial wallet.
- ❌ **Not** a centralized mixer.
- ❌ **Not** maintaining its own privacy pool or ZK circuits.

---

## Target Users

- Privacy-conscious Solana users
- DAO treasuries
- Airdrop recipients
- OTC desks
- Builders needing privacy-by-default flows

---

## Hackathon Positioning

**Category:** Privacy tooling  
**Key integration:** Privacy Cash SDK  
**Value proposition:**  
> “A privacy-by-default Solana wallet that uses one-time addresses and automated routing into Privacy Cash to prevent wallet linking and graph analysis.”
