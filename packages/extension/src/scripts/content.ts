import type { PageInfoResponse } from '../types';
import { onMessageType } from '../utils/messaging';

// Basic content script

// Listen for getPageInfo messages
onMessageType('getPageInfo', (_message, _sender, sendResponse) => {
  const response: PageInfoResponse = {
    title: document.title,
    url: window.location.href
  };
  sendResponse(response);
});
