/**
 * Privacy Cash Service
 * 
 * Main integration layer for Privacy Cash SDK in the Veil extension.
 * Manages client lifecycle, provides high-level methods, and handles
 * all the browser extension-specific adaptations.
 */

import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { WasmFactory } from "@lightprotocol/hasher.rs";
import {
  deposit,
  withdraw,
  getUtxos,
  getBalanceFromUtxos,
  EncryptionService,
} from "privacycash/utils";
import { createRPCManager, RPCManager } from "./rpcManager";
import { createPrivacyCashSigner } from "./privacyCashSigner";
import {
  getPrivacyCashStorage,
  initializeStorageCache,
  preloadStorageForPublicKey,
} from "./privacyCashStorage";

export interface DepositResult {
  tx: string;
}

export interface WithdrawResult {
  isPartial: boolean;
  tx: string;
  recipient: string;
  amount_in_lamports: number;
  fee_in_lamports: number;
}

class PrivacyCashService {
  private rpcManager: RPCManager | null = null;
  private currentKeypair: Keypair | null = null;
  private currentPublicKey: string | null = null;
  private encryptionService: EncryptionService | null = null;
  private storage: Storage | null = null;

  /**
   * Initialize Privacy Cash service for a specific wallet
   */
  async initialize(keypair: Keypair, rpcUrls?: string[]): Promise<void> {
    // Clean up existing service if switching wallets
    if (this.currentKeypair && this.currentKeypair !== keypair) {
      await this.destroy();
    }

    // If already initialized for this keypair, skip
    if (this.currentKeypair === keypair && this.rpcManager) {
      return;
    }

    try {
      // Initialize storage cache
      await initializeStorageCache();
      this.storage = getPrivacyCashStorage();

      // Get or create RPC manager
      if (rpcUrls && rpcUrls.length > 0) {
        this.rpcManager = new RPCManager({ rpcUrls });
      } else {
        this.rpcManager = createRPCManager();
      }

      // Preload storage for this public key
      const publicKey = keypair.publicKey.toBase58();
      await preloadStorageForPublicKey(publicKey);

      // Create encryption service
      this.encryptionService = new EncryptionService();
      this.encryptionService.deriveEncryptionKeyFromWallet(keypair);

      // Store current state
      this.currentKeypair = keypair;
      this.currentPublicKey = publicKey;

      console.log("[PrivacyCash] Initialized for wallet:", publicKey);
    } catch (error) {
      console.error("[PrivacyCash] Error initializing:", error);
      throw error;
    }
  }

  /**
   * Get the circuit file base path for browser extension
   * Uses chrome.runtime.getURL to get extension resource URLs
   * snarkjs can work with URLs in the browser
   */
  private getCircuitBasePath(): string {
    return chrome.runtime.getURL("circuit2/transaction2");
  }

  /**
   * Get current public key
   */
  private getPublicKey(): PublicKey {
    if (!this.currentKeypair) {
      throw new Error("Service not initialized");
    }
    return this.currentKeypair.publicKey;
  }

  /**
   * Deposit SOL to Privacy Cash
   */
  async deposit(lamports: number): Promise<DepositResult> {
    if (!this.currentKeypair || !this.encryptionService || !this.rpcManager || !this.storage) {
      throw new Error("Privacy Cash service not initialized. Call initialize() first.");
    }

    try {
      const result = await this.rpcManager.executeWithRetry(async (connection) => {
        const lightWasm = await WasmFactory.getInstance();
        const publicKey = this.getPublicKey();
        const transactionSigner = createPrivacyCashSigner(this.currentKeypair!);
        const keyBasePath = this.getCircuitBasePath();

        return await deposit({
          lightWasm,
          amount_in_lamports: lamports,
          connection,
          encryptionService: this.encryptionService!,
          publicKey,
          transactionSigner,
          keyBasePath,
          storage: this.storage!,
        });
      });

      return {
        tx: result.tx,
      };
    } catch (error) {
      console.error("[PrivacyCash] Deposit error:", error);
      throw error;
    }
  }

  /**
   * Withdraw SOL from Privacy Cash
   */
  async withdraw(
    lamports: number,
    recipientAddress?: string
  ): Promise<WithdrawResult> {
    if (!this.currentKeypair || !this.encryptionService || !this.rpcManager || !this.storage) {
      throw new Error("Privacy Cash service not initialized. Call initialize() first.");
    }

    try {
      const result = await this.rpcManager.executeWithRetry(async (connection) => {
        const lightWasm = await WasmFactory.getInstance();
        const publicKey = this.getPublicKey();
        const recipient = recipientAddress
          ? new PublicKey(recipientAddress)
          : publicKey;
        const keyBasePath = this.getCircuitBasePath();

        return await withdraw({
          recipient,
          lightWasm,
          storage: this.storage!,
          publicKey,
          connection,
          amount_in_lamports: lamports,
          encryptionService: this.encryptionService!,
          keyBasePath,
        });
      });

      return {
        isPartial: result.isPartial,
        tx: result.tx,
        recipient: result.recipient,
        amount_in_lamports: result.amount_in_lamports,
        fee_in_lamports: result.fee_in_lamports,
      };
    } catch (error) {
      console.error("[PrivacyCash] Withdraw error:", error);
      throw error;
    }
  }

  /**
   * Get private SOL balance
   */
  async getPrivateBalance(): Promise<number> {
    if (!this.currentKeypair || !this.encryptionService || !this.rpcManager || !this.storage) {
      throw new Error("Privacy Cash service not initialized. Call initialize() first.");
    }

    try {
      const balanceResult = await this.rpcManager.executeWithRetry(async (connection) => {
        const publicKey = this.getPublicKey();
        const utxos = await getUtxos({
          publicKey,
          connection,
          encryptionService: this.encryptionService!,
          storage: this.storage!,
        });
        return getBalanceFromUtxos(utxos);
      });

      // Convert from lamports to SOL
      return balanceResult.lamports / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error("[PrivacyCash] Get balance error:", error);
      // Return 0 on error rather than throwing
      return 0;
    }
  }

  /**
   * Get private SPL token balance
   * Note: SPL token support requires additional implementation
   */
  async getPrivateBalanceSPL(_mintAddress: string): Promise<number> {
    // TODO: Implement SPL token balance fetching
    console.warn("[PrivacyCash] SPL token balance not yet implemented");
    return 0;
  }

  /**
   * Clear cached UTXOs
   */
  async clearCache(): Promise<void> {
    if (!this.currentPublicKey || !this.storage) {
      return;
    }

    try {
      // Clear storage keys for this public key
      const publicKey = this.currentPublicKey;
      
      // Clear fetch offset
      await this.storage.removeItem(`fetch_offset${publicKey}`);
      
      // Clear encrypted outputs
      await this.storage.removeItem(`encrypted_outputs${publicKey}`);
      
      console.log("[PrivacyCash] Cache cleared");
    } catch (error) {
      console.error("[PrivacyCash] Clear cache error:", error);
    }
  }

  /**
   * Destroy the service and clean up resources
   */
  async destroy(): Promise<void> {
    if (this.rpcManager) {
      this.rpcManager.clearCache();
    }

    this.rpcManager = null;
    this.currentKeypair = null;
    this.currentPublicKey = null;
    this.encryptionService = null;
    this.storage = null;

    console.log("[PrivacyCash] Service destroyed");
  }

  /**
   * Check if service is initialized
   */
  isInitialized(): boolean {
    return this.currentKeypair !== null && this.rpcManager !== null;
  }

  /**
   * Get current public key
   */
  getCurrentPublicKey(): string | null {
    return this.currentPublicKey;
  }
}

// Export singleton instance
let serviceInstance: PrivacyCashService | null = null;

/**
 * Get the Privacy Cash service instance (singleton)
 */
export function getPrivacyCashService(): PrivacyCashService {
  if (!serviceInstance) {
    serviceInstance = new PrivacyCashService();
  }
  return serviceInstance;
}

export { PrivacyCashService };
