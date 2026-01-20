# Veil Project Milestones

## Milestone 1: Frontend & UI/UX (Mocked)
- [ ] Setup Project Architecture (React, Vite, Tailwind, Framer Motion)
- [ ] Design "Premium" Aesthetic (Dark mode, glassmorphism, animations)
- [ ] Implement Onboarding Flow (Mock Seed generation/restore simulation)
- [ ] Build Main Dashboard (Mock Balance, Active Burner Wallet display)
- [ ] Build History & Settings Pages (Mock Transaction logs, Configuration toggles)
- [ ] Implement Mock Services (Console logging for actions: "Monitoring...", "Forwarding...", "Depositing")
- [ ] Ensure full navigation flow works without real backend logic

## Milestone 2: Core Business Logic & Local State
- [ ] Implement Real Key Management (BIP39, Ed25519, Encrypted LocalStorage)
- [ ] Replace Mock "Generate Burner" with real HD Wallet derivation
- [ ] Integrate Solana Web3.js for real account queries and address validation
- [ ] Connect UI to Background Service Worker for persistent state
- [ ] Implement manual "Sweep/Drain" functionality (User initiated)

## Milestone 3: Automation & Server Infrastructure
- [ ] Develop Background Monitoring System (Polling RPC for incoming deposits)
- [ ] Implement "Privacy Engine" Logic (Randomized delays, automatic queuing)
- [ ] Setup Optional Backend Server (Node.js/Go) for reliable monitoring/notification (if browser limitations require it)
- [ ] Integrate Privacy Cash SDK for anonymization
- [ ] End-to-end integration: Burner -> Monitor -> Delay -> Privacy Cash

## Milestone 4: Polish & Launch
- [ ] Security Audit of Key Handling
- [ ] Mainnet Testing
- [ ] Final UI Polish & Animations
