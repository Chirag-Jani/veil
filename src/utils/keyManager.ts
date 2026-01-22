/**
 * Key Management utilities for Veil wallet
 * Handles BIP39 mnemonic generation, seed derivation, and Solana keypair management
 */

import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import englishWordlist from 'bip39/src/wordlists/english.json';
import { decrypt, encrypt } from './crypto';

// Import ed25519-hd-key using namespace import to handle CommonJS
import * as ed25519HdKeyModule from 'ed25519-hd-key';

// Extract derivePath - handle CommonJS exports
const getDerivePath = () => {
  // CommonJS modules often export as default or as namespace
  const mod = ed25519HdKeyModule as any;
  
  // Try different access patterns
  if (mod.derivePath && typeof mod.derivePath === 'function') {
    return mod.derivePath;
  }
  if (mod.default?.derivePath && typeof mod.default.derivePath === 'function') {
    return mod.default.derivePath;
  }
  if (mod.default && typeof mod.default === 'function') {
    return mod.default;
  }
  
  // Log for debugging
  console.error('[Veil] ed25519-hd-key module structure:', {
    hasDerivePath: !!mod.derivePath,
    hasDefault: !!mod.default,
    keys: Object.keys(mod),
    modType: typeof mod
  });
  
  return null;
};

/**
 * Convert Uint8Array to hex string (browser-compatible)
 */
function uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Convert hex string to Uint8Array (browser-compatible)
 */
function hexToUint8Array(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

// Storage keys
const STORAGE_KEYS = {
  ENCRYPTED_SEED: 'veil:encrypted_seed',
  ENCRYPTED_SALT: 'veil:encrypted_salt',
  ENCRYPTED_IV: 'veil:encrypted_iv',
  BURNER_INDEX: 'veil:burner_index',
  RETIRED_BURNERS: 'veil:retired_burners',
} as const;

/**
 * Generate a new BIP39 mnemonic phrase (12 words)
 */
export function generateMnemonic(): string {
  return bip39.generateMnemonic(128, undefined, englishWordlist);
}

/**
 * Validate a mnemonic phrase
 */
export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic, englishWordlist);
}

/**
 * Convert mnemonic to seed (64 bytes)
 */
export async function mnemonicToSeed(mnemonic: string): Promise<Uint8Array> {
  const seedBuffer = await bip39.mnemonicToSeed(mnemonic);
  const seed = new Uint8Array(seedBuffer);
  return seed;
}

/**
 * Derive a Solana keypair from a seed using HD wallet derivation
 * Uses the path: m/44'/501'/index'/0'
 * - 44' = BIP44 standard
 * - 501' = Solana coin type
 * - index' = Burner wallet index
 * - 0' = Account index
 */
export function deriveKeypairFromSeed(
  seed: Uint8Array,
  index: number
): Keypair {
  try {
    // Solana uses Ed25519 derivation path: m/44'/501'/index'/0'
    const path = `m/44'/501'/${index}'/0'`;
    const seedHex = uint8ArrayToHex(seed);
    
    if (!seedHex || seedHex.length === 0) {
      throw new Error('Invalid seed: seed is empty');
    }
    
    // Get derivePath function
    const derivePathFn = getDerivePath();
    
    if (!derivePathFn || typeof derivePathFn !== 'function') {
      console.error('[Veil] ed25519-hd-key module structure:', {
        module: ed25519HdKeyModule,
        keys: ed25519HdKeyModule ? Object.keys(ed25519HdKeyModule) : 'null',
        type: typeof ed25519HdKeyModule
      });
      throw new Error('derivePath function not found in ed25519-hd-key library. Module may not be loaded correctly.');
    }
    
    const derived = derivePathFn(path, seedHex);
    if (!derived || !derived.key) {
      throw new Error('Failed to derive key from seed');
    }
    
    // Convert Buffer to Uint8Array
    let keyBytes: Uint8Array;
    if (derived.key instanceof Uint8Array) {
      keyBytes = derived.key;
    } else if (derived.key && typeof derived.key === 'object' && 'length' in derived.key) {
      // Handle Buffer-like object
      keyBytes = new Uint8Array(derived.key);
    } else {
      throw new Error('Invalid key format from derivation');
    }
    
    if (keyBytes.length !== 32) {
      throw new Error(`Invalid key length: expected 32 bytes, got ${keyBytes.length}`);
    }
    
    return Keypair.fromSeed(keyBytes);
  } catch (error) {
    console.error('[Veil] Error deriving keypair:', error);
    throw new Error(`Failed to derive keypair: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Derive the master keypair (index 0) from seed
 */
export function deriveMasterKeypair(seed: Uint8Array): Keypair {
  return deriveKeypairFromSeed(seed, 0);
}

/**
 * Encrypt and store the master seed
 */
export async function storeEncryptedSeed(
  seed: Uint8Array,
  password: string
): Promise<void> {
  const seedHex = uint8ArrayToHex(seed);
  const { encrypted, salt, iv } = await encrypt(seedHex, password);

  await chrome.storage.local.set({
    [STORAGE_KEYS.ENCRYPTED_SEED]: encrypted,
    [STORAGE_KEYS.ENCRYPTED_SALT]: salt,
    [STORAGE_KEYS.ENCRYPTED_IV]: iv,
  });
}

/**
 * Retrieve and decrypt the master seed
 */
export async function getDecryptedSeed(password: string): Promise<Uint8Array> {
  const result = await chrome.storage.local.get([
    STORAGE_KEYS.ENCRYPTED_SEED,
    STORAGE_KEYS.ENCRYPTED_SALT,
    STORAGE_KEYS.ENCRYPTED_IV,
  ]);

  if (!result[STORAGE_KEYS.ENCRYPTED_SEED]) {
    throw new Error('No encrypted seed found. Please create or restore a wallet.');
  }

  const seedHex = await decrypt(
    result[STORAGE_KEYS.ENCRYPTED_SEED],
    result[STORAGE_KEYS.ENCRYPTED_SALT],
    result[STORAGE_KEYS.ENCRYPTED_IV],
    password
  );

  return hexToUint8Array(seedHex);
}

/**
 * Check if a wallet exists (encrypted seed is stored)
 */
export async function hasWallet(): Promise<boolean> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.ENCRYPTED_SEED);
  return !!result[STORAGE_KEYS.ENCRYPTED_SEED];
}

/**
 * Get the next burner wallet index
 */
export async function getNextBurnerIndex(): Promise<number> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.BURNER_INDEX);
  const currentIndex = result[STORAGE_KEYS.BURNER_INDEX] || 0;
  return currentIndex;
}

/**
 * Increment and save the burner wallet index
 */
export async function incrementBurnerIndex(): Promise<number> {
  const currentIndex = await getNextBurnerIndex();
  const nextIndex = currentIndex + 1;
  await chrome.storage.local.set({ [STORAGE_KEYS.BURNER_INDEX]: nextIndex });
  return nextIndex;
}

/**
 * Get list of retired burner indices
 */
export async function getRetiredBurners(): Promise<number[]> {
  const result = await chrome.storage.local.get(STORAGE_KEYS.RETIRED_BURNERS);
  return result[STORAGE_KEYS.RETIRED_BURNERS] || [];
}

/**
 * Mark a burner as retired
 */
export async function retireBurner(index: number): Promise<void> {
  const retired = await getRetiredBurners();
  if (!retired.includes(index)) {
    retired.push(index);
    await chrome.storage.local.set({ [STORAGE_KEYS.RETIRED_BURNERS]: retired });
  }
}

/**
 * Generate a new burner wallet keypair
 */
export async function generateBurnerKeypair(
  seed: Uint8Array
): Promise<{ keypair: Keypair; index: number }> {
  // Get retired burners to skip them
  const retired = await getRetiredBurners();
  let index = await getNextBurnerIndex();

  // Find next non-retired index
  while (retired.includes(index)) {
    index = await incrementBurnerIndex();
  }

  // Generate keypair for this index
  const keypair = deriveKeypairFromSeed(seed, index);

  // Increment index for next time
  await incrementBurnerIndex();

  return { keypair, index };
}

/**
 * Recover a burner wallet keypair from seed and index
 */
export function recoverBurnerKeypair(
  seed: Uint8Array,
  index: number
): Keypair {
  return deriveKeypairFromSeed(seed, index);
}
