import React from 'react';
import { 
  FiLayout, 
  FiList, 
  FiCalendar, 
  FiPlus, 
  FiHome, 
  FiStar, 
  FiSettings 
} from 'react-icons/fi';

const Sidebar = ({ activeView, setActiveView, openTaskModal }) => {
  const views = [
    { id: 'kanban', name: 'Kanban', icon: <FiLayout /> },
    { id: 'list', name: 'List', icon: <FiList /> },
    { id: 'calendar', name: 'Calendar', icon: <FiCalendar /> },
  ];
  
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <FiHome /> },
    { id: 'favorites', name: 'Favorites', icon: <FiStar /> },
    { id: 'settings', name: 'Settings', icon: <FiSettings /> },
  ];
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">TaskMaster AI</h1>
      </div>
      
      {/* Add Task Button */}
      <div className="p-4">
        <button 
          onClick={openTaskModal}
          className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <FiPlus /> Add Task
        </button>
      </div>
      
      {/* Navigation Links */}
      <nav className="mt-4 flex-1">
        <div className="px-4 py-2">
          <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Navigation</h2>
          <ul className="mt-2">
            {navItems.map(item => (
              <li key={item.id}>
                <a 
                  href="#" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <span className="mr-3 text-gray-600">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* View Options */}
        <div className="px-4 py-2 mt-4">
          <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Views</h2>
          <ul className="mt-2">
            {views.map(view => (
              <li key={view.id}>
                <button 
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center px-4 py-2 w-full text-left rounded-md ${
                    activeView === view.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{view.icon}</span>
                  {view.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      {/* Projects Section */}
      <div className="px-4 py-2 border-t">
        <h2 className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Projects</h2>
        <ul className="mt-2">
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Marketing Campaign
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Website Redesign
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
              Product Launch
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;