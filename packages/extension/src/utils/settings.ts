/**
 * Settings management utilities
 * Handles user preferences and configuration
 */

const SETTINGS_KEYS = {
  PRIVACY_CASH_MODE: 'veil:privacy_cash_mode',
} as const;

/**
 * Get Privacy Cash mode setting (default: false = normal wallet mode)
 */
export async function getPrivacyCashMode(): Promise<boolean> {
  const result = await chrome.storage.local.get(SETTINGS_KEYS.PRIVACY_CASH_MODE);
  // Default to false (normal wallet mode)
  return result[SETTINGS_KEYS.PRIVACY_CASH_MODE] === true;
}

/**
 * Set Privacy Cash mode setting
 */
export async function setPrivacyCashMode(enabled: boolean): Promise<void> {
  await chrome.storage.local.set({ [SETTINGS_KEYS.PRIVACY_CASH_MODE]: enabled });
}
