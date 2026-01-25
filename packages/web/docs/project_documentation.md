# Veil Project Documentation

## 1. Executive Overview
**Veil** is a privacy-focused browser extension and protocol designed to restore financial anonymity on public blockchains (initially targeting Solana). It addresses the fundamental issue of "Permanent Exposure" in current crypto wallets by introducing **Disposable Identities** and a **Zero-Knowledge Privacy Protocol**. Use Veil to transact, receive airdrops, and manage funds without exposing your main wallet's history or net worth.

**Tagline**: "Privacy in a Masterpiece."

### Key Value Proposition
*   **Instant Anonymity**: Generate disposable wallets in milliseconds.
*   **Cryptographic Privacy**: Uses ZK-SNARKs to mathematically disassociate deposits from withdrawals.
*   **Non-Custodial**: Keys are generated locally; you never give up control of your funds.
*   **Seamless Experience**: A modern, premium browser extension interface.

---

## 2. Problem Statement
Public blockchains build trust through transparency, but this creates significant privacy and security risks for individuals.

1.  **Permanent Exposure**: Every transaction is permanently recorded and linked to your wallet address. Once your identity is linked to an address, your entire financial history is public.
2.  **On-Chain Tracking**: Blockchain analytics companies and bad actors can trace your funds across wallets, building a complete profile of your spending, holdings, and behavior.
3.  **Targeted Attacks**: Visible wealth makes users targets for phishing, social engineering, and physical threats.
4.  **Lack of Separation**: Standard wallets mix all activities (salary, trading, airdrops) in one place, making it impossible to compartmentalize financial activity.

## 3. The Solution
Veil provides a comprehensive privacy layer that sits between the public blockchain and your user experience.

### Core Features
*   **Disposable Wallets**: Create fresh, temporary addresses for specific transactions (e.g., "Airdrop Wallet", "One-time Payment").
*   **Privacy Cash Protocol**: A smart contract based mixing pool using Zero-Knowledge proofs.
*   **Client-Side Security**: All sensitive operations (key generation, signing) happen in the browser. No server ever sees your keys.
*   **Protocol Agnostic Design**: Built for a multi-chain future, starting with high-speed chains like Solana.

---

## 4. Technical Architecture

### 4.1 Technology Stack
*   **Frontend**: React, TypeScript, Vite
*   **UI Framework**: Tailwind CSS, shadcn/ui
*   **Animations**: Framer Motion, GSAP, Lenis (for smooth scrolling)
*   **Blockchain**: Solana (implied context), Zero-Knowledge Proof circuits (ZK-SNARKs)
*   **Storage**: Encrypted Local Storage (Browser)

### 4.2 Frontend Flow (Extension Extension)
The Frontend is a Chrome-based browser extension acting as the user's interface to the privacy protocol.

#### User Journey & detailed Flow:
1.  **Initialization**:
    *   User installs extension.
    *   **Onboarding**: User creates a master password.
    *   **Key Generation**: The extension generates a master seed phrase locally using cryptographically secure randomness.
    *   **Encryption**: This seed is encrypted with the user's password and stored in `localStorage` or `chrome.storage.local`.

2.  **Dashboard View**:
    *   Displays a list of active "Temporary Wallets".
    *   Shows the "Main Wallet" balance (which is kept separate from public view).
    *   **Action**: "New Wallet" button allows creating a new identity instantly.

3.  **Disposable Wallet Creation**:
    *   User clicks "New Wallet".
    *   Extension derives a new key pair from the master seed (using a hierarchical deterministic path).
    *   The wallet is labeled (e.g., "Burner #1") and added to the list.
    *   The user can now copy this address to receive funds.

4.  **Privacy Migration (The "Mix")**:
    *   **Input**: User selects a Temporary Wallet containing funds (e.g., received from an exchange).
    *   **Action**: User clicks "Migrate to Pool".
    *   **Process**:
        *   The extension constructs a transaction to deposit funds into the **Veil Privacy Pool** smart contract.
        *   Simultaneously, it generates a **Zero-Knowledge Note** (a secret proof of deposit) enabling future withdrawal.
        *   This Note is stored encrypted in the extension.

5.  **Private Withdrawal**:
    *   **Action**: User selects "Withdraw" from the Privacy Pool.
    *   **Target**: User inputs their Main Wallet (or another fresh address).
    *   **Proof Generation**: The extension generates a ZK-SNARK proof using the stored Note. This proof confirms "I deposited funds" *without* revealing *which* deposit was mine.
    *   **Execution**: The smart contract verifies the proof and releases clean funds to the target address.
    *   **Result**: The on-chain link between the source (Temp Wallet) and destination (Main Wallet) is broken.

### 4.3 Backend & Protocol Flow
Veil operates on a "Thick Client, Lean Protocol" model to maximize security.

#### Backend Components:
*   **No Central Server**: Veil does not manage user accounts, databases of transaction history, or keys.
*   **RPC Node**: The extension connects directly to blockchain RPC nodes (e.g., Solana RPC) to query balances and broadcast transactions.
*   **Smart Contracts (The Protocol)**:
    *   **deposit()**: Accepts funds + a commitment hash (derived from the Note). Adds the commitment to a Merkle Tree.
    *   **withdraw()**: Accepts a ZK-proof and a nullifier (to prevent double-spending). Verifies the proof against the Merkle Tree root. Transfers funds if valid.

#### Security Architecture:
1.  **Zero Data Collection**: Since there is no backend server for user data, no logs are kept. Privacy is enforced by design.
2.  **Local Key Custody**: Private keys never leave the browser execution environment.
3.  **Auditability**: The smart contract code and circuit constraints are open source, allowing community verification.

---

## 5. Development Roadmap
*   **Phase 1 (Current)**: Beta Extension, Basic Local Wallet Management, UI/UX Implementation. Integration of Privacy Cash Protocol (Smart Contract interaction).
*   **Phase 2**: Mainnet Launch, Audits, and Multi-chain expansion.
