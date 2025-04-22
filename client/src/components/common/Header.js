// src/Dashboard/views/Header.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch, FiBell, FiUser } from 'react-icons/fi';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current page title from location
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/tasks')) return 'Tasks';
    if (path.includes('/calendar')) return 'Calendar';
    if (path.includes('/settings')) return 'Settings';
    return 'Dashboard';
  };
  
  const handleAddTask = () => {
    navigate('/tasks/create');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{getPageTitle()}</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            onClick={handleAddTask}
          >
            <FiPlus className="mr-2" /> Add Task
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiBell />
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiUser />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;