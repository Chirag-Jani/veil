/**
 * Storage utilities for wallet state management
 */

import type { Keypair } from '@solana/web3.js';

export interface BurnerWallet {
  id: number;
  address: string;
  fullAddress: string;
  balance: number;
  site: string;
  isActive: boolean;
  index: number; // HD wallet derivation index
  archived?: boolean; // Whether the wallet is archived
}

export interface ConnectedSite {
  id: number;
  domain: string;
  favicon: string;
  connected: boolean;
  burnerIndex?: number; // Associated burner wallet index
}

/**
 * Format Solana address for display
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address || typeof address !== 'string') {
    return '';
  }
  if (address.length <= chars * 2 + 3) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Get full address from keypair
 */
export function getAddressFromKeypair(keypair: Keypair): string {
  return keypair.publicKey.toBase58();
}

/**
 * Store burner wallet data
 */
export async function storeBurnerWallet(wallet: BurnerWallet): Promise<void> {
  const key = `veil:burner:${wallet.index}`;
  await chrome.storage.local.set({ [key]: wallet });
}

/**
 * Get all burner wallets (excluding archived)
 */
export async function getAllBurnerWallets(): Promise<BurnerWallet[]> {
  const allData = await chrome.storage.local.get(null);
  const wallets: BurnerWallet[] = [];

  for (const [key, value] of Object.entries(allData)) {
    if (key.startsWith('veil:burner:')) {
      const wallet = value as BurnerWallet;
      // Only include non-archived wallets
      if (!wallet.archived) {
        wallets.push(wallet);
      }
    }
  }

  return wallets.sort((a, b) => b.id - a.id); // Most recent first
}

/**
 * Get all archived burner wallets
 */
export async function getArchivedBurnerWallets(): Promise<BurnerWallet[]> {
  const allData = await chrome.storage.local.get(null);
  const wallets: BurnerWallet[] = [];

  for (const [key, value] of Object.entries(allData)) {
    if (key.startsWith('veil:burner:')) {
      const wallet = value as BurnerWallet;
      // Only include archived wallets
      if (wallet.archived) {
        wallets.push(wallet);
      }
    }
  }

  return wallets.sort((a, b) => b.id - a.id); // Most recent first
}

/**
 * Archive a burner wallet
 */
export async function archiveBurnerWallet(walletIndex: number): Promise<void> {
  const key = `veil:burner:${walletIndex}`;
  const result = await chrome.storage.local.get(key);
  if (result[key]) {
    const wallet = result[key] as BurnerWallet;
    wallet.archived = true;
    wallet.isActive = false; // Deactivate when archiving
    await chrome.storage.local.set({ [key]: wallet });
  }
}

/**
 * Unarchive a burner wallet
 */
export async function unarchiveBurnerWallet(walletIndex: number): Promise<void> {
  const key = `veil:burner:${walletIndex}`;
  const result = await chrome.storage.local.get(key);
  if (result[key]) {
    const wallet = result[key] as BurnerWallet;
    wallet.archived = false;
    await chrome.storage.local.set({ [key]: wallet });
  }
}

/**
 * Get the next account number for naming (Account 1, Account 2, etc.)
 * Includes archived wallets in the count
 */
export async function getNextAccountNumber(): Promise<number> {
  const allData = await chrome.storage.local.get(null);
  const wallets: BurnerWallet[] = [];

  // Get all wallets (including archived) for account numbering
  for (const [key, value] of Object.entries(allData)) {
    if (key.startsWith('veil:burner:')) {
      wallets.push(value as BurnerWallet);
    }
  }
  
  // Extract account numbers from existing wallets
  const accountNumbers = wallets
    .map(w => {
      // Check if site matches "Account X" pattern
      const match = w.site.match(/^Account (\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter((num): num is number => num !== null);
  
  if (accountNumbers.length === 0) {
    return 1; // Start with Account 1
  }
  
  // Find the next available number
  const maxAccount = Math.max(...accountNumbers);
  return maxAccount + 1;
}

/**
 * Store connected site
 */
export async function storeConnectedSite(site: ConnectedSite): Promise<void> {
  const key = `veil:site:${site.domain}`;
  await chrome.storage.local.set({ [key]: site });
}

/**
 * Get all connected sites
 */
export async function getAllConnectedSites(): Promise<ConnectedSite[]> {
  const allData = await chrome.storage.local.get(null);
  const sites: ConnectedSite[] = [];

  for (const [key, value] of Object.entries(allData)) {
    if (key.startsWith('veil:site:')) {
      sites.push(value as ConnectedSite);
    }
  }

  return sites;
}

/**
 * Get connected site by domain
 */
export async function getConnectedSite(domain: string): Promise<ConnectedSite | null> {
  const key = `veil:site:${domain}`;
  const result = await chrome.storage.local.get(key);
  return result[key] || null;
}

/**
 * Remove connected site
 */
export async function removeConnectedSite(domain: string): Promise<void> {
  const key = `veil:site:${domain}`;
  await chrome.storage.local.remove(key);
}

/**
 * Store private balance for a wallet
 */
export async function storePrivateBalance(walletIndex: number, balance: number): Promise<void> {
  const key = `veil:private_balance:${walletIndex}`;
  await chrome.storage.local.set({ [key]: balance });
}

/**
 * Get private balance for a wallet
 */
export async function getPrivateBalance(walletIndex: number): Promise<number> {
  const key = `veil:private_balance:${walletIndex}`;
  const result = await chrome.storage.local.get(key);
  return result[key] ?? 0;
}

/**
 * Clear private balance for a wallet
 */
export async function clearPrivateBalance(walletIndex: number): Promise<void> {
  const key = `veil:private_balance:${walletIndex}`;
  await chrome.storage.local.remove(key);
}
