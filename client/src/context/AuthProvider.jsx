// src/context/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { api } from '../utils/helpers';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          const response = await api.get('/api/auth/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };
    
    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || { message: 'An error occurred during login' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      return response.data;
    } catch (error) {
      console.error("Register error:", error);
      throw error.response?.data || { message: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (userData) => {
    try {
      const response = await api.put('/api/auth/profile', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Update user error:", error);
      throw error.response?.data || { message: 'An error occurred while updating profile' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
