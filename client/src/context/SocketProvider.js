import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client'; 
import AuthContext from './AuthContext';

// Create context
export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user, isAuthenticated, token } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Only connect socket if user is authenticated
    if (isAuthenticated && user && token) {
      // Get correct socket URL from environment or use default
      const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
      
      console.log('Attempting to connect socket at:', SOCKET_URL);
      
      // Connect to socket server
      const socketInstance = io(SOCKET_URL, {
        auth: { token },
        query: { userId: user._id || user.id }
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected with ID:', socketInstance.id);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      setSocket(socketInstance);

      // Cleanup on unmount
      return () => {
        if (socketInstance) {
          socketInstance.disconnect();
        }
      };
    }
  }, [isAuthenticated, user, token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;