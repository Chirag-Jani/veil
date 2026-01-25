import '../polyfills';
import { onMessageType } from '../utils/messaging';
import { getBalanceMonitor } from '../utils/balanceMonitor';

// Background service worker

// Initialize balance monitor
const balanceMonitor = getBalanceMonitor();

// Listen for extension installation
chrome.runtime.onInstalled.addListener(async () => {
  try {
    await balanceMonitor.initialize();
    // Start monitoring balances (interval read from .env or defaults to 30s)
    balanceMonitor.startMonitoring();
  } catch (error) {
    console.error('[Background] Error initializing balance monitor:', error);
  }
});

// Start balance monitoring when service worker wakes up
(async () => {
  try {
    await balanceMonitor.initialize();
    // Start monitoring balances (interval read from .env or defaults to 30s)
    balanceMonitor.startMonitoring();
  } catch (error) {
    console.error('[Background] Error starting balance monitor:', error);
  }
})();

// Listen for balance check requests
onMessageType('checkBalances', async (_message, _sender) => {
  try {
    const updates = await balanceMonitor.checkBalances();
    const response: import('../types').CheckBalancesResponse = { success: true, updates };
    // Return the response - messaging utility will call sendResponse
    return response;
  } catch (error) {
    console.error('[Background] Error checking balances:', error);
    const response: import('../types').CheckBalancesResponse = { 
      success: false, 
      error: String(error) 
    };
    // Return the response - messaging utility will call sendResponse
    return response;
  }
});
