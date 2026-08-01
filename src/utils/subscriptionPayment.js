const PENDING_SUBSCRIPTION_SESSION_KEY = 'pendingSubscriptionSessionId';

export const savePendingSubscriptionSession = (sessionId) => {
  if (typeof window !== 'undefined' && sessionId) {
    localStorage.setItem(PENDING_SUBSCRIPTION_SESSION_KEY, sessionId);
  }
};

export const getPendingSubscriptionSession = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(PENDING_SUBSCRIPTION_SESSION_KEY);
};

export const clearPendingSubscriptionSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(PENDING_SUBSCRIPTION_SESSION_KEY);
  }
};
