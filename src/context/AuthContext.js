import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { saveSession, getSession, clearSession, refreshSession, isSessionActive } from '../utils/sessionUtils';

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Add request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    const session = getSession();
    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession();
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionTimeout, setSessionTimeout] = useState(null);

  // Initialize auth state from session
  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session.userData);
      setupSessionRefresh(session.token);
    }
    setLoading(false);
  }, []);

  // Clean up session refresh on unmount
  useEffect(() => {
    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
    };
  }, [sessionTimeout]);

  // Set up session refresh interval (every 15 minutes)
  const setupSessionRefresh = (token) => {
    const refreshInterval = 15 * 60 * 1000; // 15 minutes
    
    const refreshTimeout = setTimeout(() => {
      if (isSessionActive()) {
        checkAuth(token);
        refreshSession();
        setupSessionRefresh(token);
      }
    }, refreshInterval);
    
    setSessionTimeout(refreshTimeout);
  };

  const checkAuth = async (token) => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
      return null;
    }
  };

  const login = async (email, password, rememberMe = false) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      
      const { user, token } = response.data;
      
      // Save session with cookie and localStorage
      saveSession(user, token, rememberMe);
      
      // Set user in state
      setUser(user);
      
      // Setup session refresh
      setupSessionRefresh(token);
      
      return { user, token };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    // Clear session data
    clearSession();
    
    // Clear state
    setUser(null);
    
    // Clear any refresh timeout
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
      setSessionTimeout(null);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null && isSessionActive();
  };

  // Values to expose in context
  const contextValue = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    checkAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 