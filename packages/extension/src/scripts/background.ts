import type { GreetingResponse } from '../types';
import { onMessageType } from '../utils/messaging';

// Basic background service worker

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  // Extension installed
});

// Listen for greeting messages
onMessageType('greeting', (_message, _sender, sendResponse) => {
  const response: GreetingResponse = { response: 'Hello from background!' };
  sendResponse(response);
});
