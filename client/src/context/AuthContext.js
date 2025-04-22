// src/context/AuthContext.jsx
import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  updateUser: () => Promise.resolve()
});

export default AuthContext;
