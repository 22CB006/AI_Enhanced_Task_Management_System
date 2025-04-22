// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create axios instance with baseURL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const isAuthenticated = Boolean(token && user);

  // Configure axios instance with token
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Verify authentication on mount and token change
  const verifyAuth = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      setUser(null);
      return;
    }
    
    try {
      console.log('Verifying authentication with token:', token.substring(0, 10) + '...');
      
      const response = await api.get('/api/auth/user');
      const userData = response.data.user;
      
      if (!userData) {
        throw new Error('No user data returned from server');
      }
      
      console.log('Auth verification successful - user:', userData.name);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthError(null);
    } catch (error) {
      console.error('Auth verification failed:', error);
      setAuthError(error.message || 'Authentication failed');
      
      // Only clear auth if it's an actual auth error
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.log('Clearing auth data due to authentication error');
        handleLogout(false);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token: newToken, user: userData } = response.data;
      
      if (!newToken || !userData) {
        throw new Error('Invalid response from server');
      }
      
      console.log('Login successful - storing auth data');
      
      // Update state
      setToken(newToken);
      setUser(userData);
      
      // Store in localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.response?.data?.message || error.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      const response = await api.post('/api/auth/register', userData);
      const { token: newToken, user: newUser } = response.data;
      
      if (!newToken || !newUser) {
        throw new Error('Invalid response from server');
      }
      
      // Update state
      setToken(newToken);
      setUser(newUser);
      
      // Store in localStorage
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError(error.response?.data?.message || error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = (navigate = true) => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Clear state
    setToken(null);
    setUser(null);
    
    // Clear Authorization header
    delete api.defaults.headers.common['Authorization'];
    
    if (navigate) {
      window.location.href = '/login'; // Force a full page reload
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await api.put('/api/auth/profile', userData);
      const updatedUser = response.data.user;
      
      // Update state
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const contextValue = {
    user,
    token,
    isAuthenticated,
    isLoading,
    authError,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser: handleUpdateUser,
    refreshAuth: verifyAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;