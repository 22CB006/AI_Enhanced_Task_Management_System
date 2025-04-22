// src/services/api.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Load token from localStorage on initial load
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If unauthorized and token exists, could be expired token
    if (error.response && error.response.status === 401 && localStorage.getItem('token')) {
      // You could implement token refresh logic here
      // For now, we'll just clear the existing token
      console.log('Token may be expired or invalid');
    }
    return Promise.reject(error);
  }
);

export default api;