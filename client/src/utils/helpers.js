// utils/helpers.js

import axios from 'axios';

// Create an Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:5000', // Change this to your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Automatically add token to headers if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
