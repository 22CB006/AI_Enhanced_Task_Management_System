// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiCalendar, FiCheckSquare, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  // Active link style
  const activeStyle = "bg-blue-50 text-blue-600 border-l-4 border-blue-600";
  const linkClass = "flex items-center py-3 px-4 cursor-pointer transition-colors duration-200 hover:bg-gray-100";

  return (
    <div className="w-64 bg-white shadow-md flex flex-col h-screen">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Task Manager</h2>
        <p className="text-sm text-gray-600">Welcome, {user.name || 'User'}</p>
      </div>
      
      <nav className="flex-1 mt-6">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `${linkClass} ${isActive ? activeStyle : ''}`
          }
        >
          <FiHome className="mr-3" /> Dashboard
        </NavLink>
        
        <NavLink 
          to="/tasks" 
          className={({ isActive }) => 
            `${linkClass} ${isActive ? activeStyle : ''}`
          }
        >
          <FiCheckSquare className="mr-3" /> Tasks
        </NavLink>
        
        <NavLink 
          to="/calendar" 
          className={({ isActive }) => 
            `${linkClass} ${isActive ? activeStyle : ''}`
          }
        >
          <FiCalendar className="mr-3" /> Calendar
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `${linkClass} ${isActive ? activeStyle : ''}`
          }
        >
          <FiSettings className="mr-3" /> Settings
        </NavLink>
      </nav>
      
      <div className="mt-auto p-4 border-t">
        <button 
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-red-500 transition-colors duration-200"
        >
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;