// Centralized types for the extension

// Message types
export type MessageType = 'checkBalances';

// Base message interface
export interface BaseMessage {
  type: MessageType;
}

// Specific message interfaces
export interface CheckBalancesMessage extends BaseMessage {
  type: 'checkBalances';
}

// Union type for all messages
export type ExtensionMessage = CheckBalancesMessage;

// Response types
export interface BalanceUpdate {
  walletIndex: number;
  newBalance: number;
  previousBalance: number;
}

export interface CheckBalancesResponse {
  success: boolean;
  updates?: BalanceUpdate[];
  error?: string;
}

// Union type for all responses
export type ExtensionResponse = CheckBalancesResponse;

// Message handler type
// Note: chrome namespace is available globally when @types/chrome is installed
export type MessageHandler = (
  message: ExtensionMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ExtensionResponse) => void
) => boolean | void;
