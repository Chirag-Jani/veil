// Centralized types for the extension

// Message types
export type MessageType = 'greeting' | 'getPageInfo';

// Base message interface
export interface BaseMessage {
  type: MessageType;
}

// Specific message interfaces
export interface GreetingMessage extends BaseMessage {
  type: 'greeting';
  text?: string;
}

export interface GetPageInfoMessage extends BaseMessage {
  type: 'getPageInfo';
}

// Union type for all messages
export type ExtensionMessage = GreetingMessage | GetPageInfoMessage;

// Response types
export interface GreetingResponse {
  response: string;
}

export interface PageInfoResponse {
  title: string;
  url: string;
}

// Union type for all responses
export type ExtensionResponse = GreetingResponse | PageInfoResponse;

// Message handler type
// Note: chrome namespace is available globally when @types/chrome is installed
export type MessageHandler = (
  message: ExtensionMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ExtensionResponse) => void
) => boolean | void;
