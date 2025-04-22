import React from 'react';
import { FiBell, FiSearch, FiPlus } from 'react-icons/fi';

const Header = ({ openTaskModal }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Right Side Items */}
        <div className="flex items-center gap-4">
          {/* Quick Add Button */}
          <button 
            onClick={openTaskModal}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <FiPlus size={16} />
            <span>New Task</span>
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
              <FiBell size={20} />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
          </div>
          
          {/* User Avatar */}
          <div className="relative group">
            <button className="flex items-center">
              <img 
                src="https://i.pravatar.cc/40?img=12" 
                alt="User avatar" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="ml-2 font-medium hidden md:block">Alex Johnson</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;