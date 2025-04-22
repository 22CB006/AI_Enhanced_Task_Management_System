// src/Dashboard/views/MainContent.jsx
import React, { useState } from 'react';
import { FiList, FiCalendar, FiColumns } from 'react-icons/fi';
import KanbanView from './KanbanView';
import ListView from './ListView';
import CalendarView from './Calendar';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('kanban');
  
  // Example tasks data - in a real app, this would come from an API
  const tasks = [
    { id: 1, title: 'Complete project setup', description: 'Finish initial configuration', status: 'todo', priority: 'high' },
    { id: 2, title: 'Working on dashboard', description: 'Creating UI components', status: 'inProgress', priority: 'medium' },
    { id: 3, title: 'Authentication', description: 'Completed login & signup', status: 'done', priority: 'high' },
    { id: 4, title: 'Sidebar navigation', description: 'Implement routing', status: 'inProgress', priority: 'high' },
    { id: 5, title: 'Task management', description: 'Create CRUD functionality', status: 'todo', priority: 'medium' },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-medium">Project Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveView('kanban')}
            className={`p-2 rounded-md flex items-center ${
              activeView === 'kanban' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
          >
            <FiColumns className="mr-2" /> Kanban
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`p-2 rounded-md flex items-center ${
              activeView === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
          >
            <FiList className="mr-2" /> List
          </button>
          <button
            onClick={() => setActiveView('calendar')}
            className={`p-2 rounded-md flex items-center ${
              activeView === 'calendar' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
          >
            <FiCalendar className="mr-2" /> Calendar
          </button>
        </div>
      </div>

      {activeView === 'kanban' && <KanbanView tasks={tasks} />}
      {activeView === 'list' && <ListView tasks={tasks} />}
      {activeView === 'calendar' && <CalendarView tasks={tasks} />}
    </main>
  );
};

export default Dashboard;