import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Dummy user data
  const [user, setUser] = useState({
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/40',
    preferences: {
      theme: 'light',
      defaultView: 'list',
      notifications: true
    }
  });
  
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'task',
      message: 'Task "Complete dashboard" is due tomorrow',
      read: false,
      date: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'notif-2',
      type: 'mention',
      message: 'Alex mentioned you in a comment',
      read: true,
      date: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 'notif-3',
      type: 'system',
      message: 'Welcome to AI Task Manager!',
      read: true,
      date: new Date(Date.now() - 172800000).toISOString()
    }
  ]);
  
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };
  
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const updateUserPreference = (key, value) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };
  
  return (
    <UserContext.Provider 
      value={{ 
        user, 
        notifications, 
        unreadNotificationsCount: notifications.filter(n => !n.read).length,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        updateUserPreference
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;