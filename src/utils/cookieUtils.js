/**
 * Cookie management utilities for the application
 */

// Set a cookie with expiration time
export const setCookie = (name, value, days = 7) => {
  try {
    if (!name || value === undefined) {
      throw new Error('Invalid cookie parameters');
    }

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    
    // Set secure cookie with additional security flags
    const cookieString = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
    document.cookie = cookieString;
    
    // Verify cookie was set
    if (!getCookie(name)) {
      throw new Error('Failed to set cookie');
    }
  } catch (error) {
    console.error('Error setting cookie:', error);
    throw error;
  }
};

// Get a cookie by name
export const getCookie = (name) => {
  try {
    if (!name) {
      throw new Error('Cookie name is required');
    }

    const cookieArr = document.cookie.split(';');
    
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=');
      const cookieName = cookiePair[0].trim();
      
      if (cookieName === name) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

// Remove a cookie by name
export const removeCookie = (name) => {
  try {
    if (!name) {
      throw new Error('Cookie name is required');
    }

    // Set cookie with past expiration date
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict;Secure`;
    
    // Verify cookie was removed
    if (getCookie(name)) {
      throw new Error('Failed to remove cookie');
    }
  } catch (error) {
    console.error('Error removing cookie:', error);
    throw error;
  }
};

// Check if a cookie exists
export const hasCookie = (name) => {
  try {
    return getCookie(name) !== null;
  } catch (error) {
    console.error('Error checking cookie:', error);
    return false;
  }
};

// Set a secure HttpOnly cookie (for use with API responses)
export const setSecureCookie = (name, value, days = 7) => {
  // This is just a wrapper, actual HttpOnly cookies must be set by the server
  setCookie(name, value, days);
};

// Get session duration in milliseconds
export const getSessionDuration = () => {
  // Default session time: 7 days
  return 7 * 24 * 60 * 60 * 1000;
}; 