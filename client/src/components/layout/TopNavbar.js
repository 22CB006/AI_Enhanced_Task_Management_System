import React, { useState } from 'react';

const TopNavbar = ({ title, toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Mock user data - replace with your auth context
  const user = {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=12'
  };
  
  // Mock notifications - replace with your actual notifications
  const notifications = [
    { id: 1, text: 'Task "Website Redesign" due in 2 hours', read: false },
    { id: 2, text: 'New comment on "Database Migration"', read: false },
    { id: 3, text: 'Meeting reminder: Team Standup at 3:00 PM', read: true }
  ];

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement your logout logic here
    // navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      {/* Hamburger menu - visible only on mobile */}
      <button 
        onClick={toggleSidebar}
        className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-800">{title || 'My Dashboard'}</h1>
      </div>
      
      {/* Search Bar */}
      <div className="hidden md:block mx-4 flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        {/* Search Icon (Mobile) */}
        <button className="md:hidden p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            aria-label="Show notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            
            {/* Notification Badge */}
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
          
          {/* Dropdown Notifications */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={`px-4 py-3 hover:bg-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}>
                      <p className="text-sm text-gray-700">{notification.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No notifications</div>
                )}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 text-center">
                <button className="text-sm text-blue-500 hover:text-blue-700">Mark all as read</button>
              </div>
            </div>
          )}
        </div>
        
        {/* User Avatar & Dropdown */}
        <div className="relative ml-4">
          <button
            onClick={toggleUserMenu}
            className="flex items-center focus:outline-none"
            aria-label="User menu"
          >
            <img
              src={user.avatar}
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <div className="border-t border-gray-100"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;