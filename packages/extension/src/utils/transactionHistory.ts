/**
 * Transaction History Management
 * 
 * Tracks all transactions: deposits, withdrawals, transfers, and incoming SOL
 */

export type TransactionType = 'deposit' | 'withdraw' | 'transfer' | 'incoming';

export interface Transaction {
  id: string; // Unique transaction ID
  type: TransactionType;
  timestamp: number; // Unix timestamp in milliseconds
  amount: number; // Amount in SOL
  fromAddress?: string; // Source address (for transfers/withdrawals)
  toAddress?: string; // Destination address (for transfers/deposits)
  walletIndex?: number; // Associated burner wallet index
  signature?: string; // Transaction signature (if available)
  status: 'pending' | 'confirmed' | 'failed';
  error?: string; // Error message if failed
  privateBalanceBefore?: number; // Private balance before transaction (for deposits/withdrawals)
  privateBalanceAfter?: number; // Private balance after transaction
}

/**
 * Store a transaction in history
 */
export async function storeTransaction(transaction: Transaction): Promise<void> {
  const key = `veil:tx:${transaction.id}`;
  await chrome.storage.local.set({ [key]: transaction });
}

/**
 * Get all transactions, sorted by timestamp (newest first)
 */
export async function getAllTransactions(): Promise<Transaction[]> {
  const allData = await chrome.storage.local.get(null);
  const transactions: Transaction[] = [];

  for (const [key, value] of Object.entries(allData)) {
    if (key.startsWith('veil:tx:')) {
      transactions.push(value as Transaction);
    }
  }

  return transactions.sort((a, b) => b.timestamp - a.timestamp);
}

/**
 * Get transactions filtered by type
 */
export async function getTransactionsByType(
  type: TransactionType
): Promise<Transaction[]> {
  const allTransactions = await getAllTransactions();
  return allTransactions.filter((tx) => tx.type === type);
}

/**
 * Get transactions for a specific wallet index
 */
export async function getTransactionsByWallet(
  walletIndex: number
): Promise<Transaction[]> {
  const allTransactions = await getAllTransactions();
  return allTransactions.filter(
    (tx) => tx.walletIndex === walletIndex
  );
}

/**
 * Get transactions within a date range
 */
export async function getTransactionsByDateRange(
  startTimestamp: number,
  endTimestamp: number
): Promise<Transaction[]> {
  const allTransactions = await getAllTransactions();
  return allTransactions.filter(
    (tx) => tx.timestamp >= startTimestamp && tx.timestamp <= endTimestamp
  );
}

/**
 * Update transaction status
 */
export async function updateTransactionStatus(
  id: string,
  status: Transaction['status'],
  error?: string
): Promise<void> {
  const key = `veil:tx:${id}`;
  const result = await chrome.storage.local.get(key);
  if (result[key]) {
    const transaction = result[key] as Transaction;
    transaction.status = status;
    if (error) {
      transaction.error = error;
    }
    await chrome.storage.local.set({ [key]: transaction });
  }
}

/**
 * Generate a unique transaction ID
 */
export function generateTransactionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Format transaction amount for display
 */
export function formatTransactionAmount(amount: number): string {
  if (amount < 0.000001) {
    return '< 0.000001';
  }
  if (amount < 0.01) {
    return amount.toFixed(6);
  }
  if (amount < 1) {
    return amount.toFixed(4);
  }
  return amount.toFixed(2);
}

/**
 * Format transaction date for display
 */
export function formatTransactionDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'Just now';
  }
  if (diffMins < 60) {
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return date.toLocaleDateString();
}
