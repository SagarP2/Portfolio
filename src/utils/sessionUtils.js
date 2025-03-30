/**
 * Session management utilities for the application
 */
import { setCookie, getCookie, removeCookie, getSessionDuration } from './cookieUtils';

// Session constants
const SESSION_KEY = 'admin_session';
const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

// Save session data
export const saveSession = (userData, token, remember = false) => {
  try {
    // Validate inputs
    if (!userData || !token) {
      throw new Error('Invalid session data');
    }

    // Remove 'Bearer ' prefix if it exists before storing
    const cleanToken = token.replace('Bearer ', '');
    
    // Determine expiration (7 days by default, 30 days if remember me is checked)
    const expiryDays = remember ? 30 : 7;
    
    // Store the token in a cookie with secure settings
    setCookie(TOKEN_KEY, cleanToken, expiryDays);
    
    // Store serialized user data in a cookie
    setCookie(USER_KEY, JSON.stringify(userData), expiryDays);
    
    // Store session timestamp
    const session = {
      createdAt: new Date().getTime(),
      expiryDays: expiryDays,
      remember: remember,
    };
    
    setCookie(SESSION_KEY, JSON.stringify(session), expiryDays);
    
    // Also store in localStorage as backup
    localStorage.setItem(TOKEN_KEY, cleanToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    
    return { userData, token: cleanToken, session };
  } catch (error) {
    console.error('Error saving session:', error);
    clearSession();
    return null;
  }
};

// Get current session data
export const getSession = () => {
  try {
    // Try to get from cookies first
    let token = getCookie(TOKEN_KEY);
    let userDataStr = getCookie(USER_KEY);
    let sessionStr = getCookie(SESSION_KEY);
    
    // Fall back to localStorage if needed
    if (!token) token = localStorage.getItem(TOKEN_KEY);
    if (!userDataStr) userDataStr = localStorage.getItem(USER_KEY);
    if (!sessionStr) sessionStr = localStorage.getItem(SESSION_KEY);
    
    if (!token || !userDataStr || !sessionStr) {
      return null;
    }
    
    const userData = JSON.parse(userDataStr);
    const session = JSON.parse(sessionStr);
    
    // Check if session has expired
    const now = new Date().getTime();
    const expiresAt = session.createdAt + (session.expiryDays * 24 * 60 * 60 * 1000);
    
    if (now > expiresAt) {
      clearSession();
      return null;
    }
    
    // Return token without 'Bearer ' prefix
    return { userData, token, session };
  } catch (error) {
    console.error('Error parsing session data:', error);
    clearSession();
    return null;
  }
};

// Clear session data
export const clearSession = () => {
  try {
    // Clear cookies
    removeCookie(TOKEN_KEY);
    removeCookie(USER_KEY);
    removeCookie(SESSION_KEY);
    
    // Clear localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing session:', error);
  }
};

// Check if session is active
export const isSessionActive = () => {
  const session = getSession();
  return session !== null;
};

// Refresh session (update timestamp)
export const refreshSession = () => {
  try {
    const currentSession = getSession();
    if (currentSession) {
      const { userData, token, session } = currentSession;
      session.createdAt = new Date().getTime();
      return saveSession(userData, token, session.remember);
    }
    return null;
  } catch (error) {
    console.error('Error refreshing session:', error);
    return null;
  }
}; 