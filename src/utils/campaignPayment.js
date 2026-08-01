const PENDING_CAMPAIGN_SESSION_KEY = 'pendingCampaignSessionId';

export const savePendingCampaignSession = (sessionId) => {
  if (typeof window !== 'undefined' && sessionId) {
    localStorage.setItem(PENDING_CAMPAIGN_SESSION_KEY, sessionId);
  }
};

export const getPendingCampaignSession = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(PENDING_CAMPAIGN_SESSION_KEY);
};

export const clearPendingCampaignSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PENDING_CAMPAIGN_SESSION_KEY);
  }
};

export { PENDING_CAMPAIGN_SESSION_KEY };
