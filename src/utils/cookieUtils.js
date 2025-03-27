/**
 * Cookie management utilities for the application
 */

// Set a cookie with expiration time
export const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// Get a cookie by name
export const getCookie = (name) => {
  const cookieArr = document.cookie.split(';');
  
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    const cookieName = cookiePair[0].trim();
    
    if (cookieName === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  
  return null;
};

// Remove a cookie by name
export const removeCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict`;
};

// Check if a cookie exists
export const hasCookie = (name) => {
  return getCookie(name) !== null;
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