// src/Tasks/TasksList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter, FiPlus, FiCheckCircle, FiCircle, FiClock } from 'react-icons/fi';

const TasksList = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Example tasks data - in a real app, this would come from an API
  const allTasks = [
    { id: 1, title: 'Complete project setup', description: 'Finish initial configuration', status: 'todo', priority: 'high' },
    { id: 2, title: 'Working on dashboard', description: 'Creating UI components', status: 'inProgress', priority: 'medium' },
    { id: 3, title: 'Authentication', description: 'Completed login & signup', status: 'done', priority: 'high' },
    { id: 4, title: 'Sidebar navigation', description: 'Implement routing', status: 'inProgress', priority: 'high' },
    { id: 5, title: 'Task management', description: 'Create CRUD functionality', status: 'todo', priority: 'medium' },
  ];
  
  const filteredTasks = filterStatus === 'all' 
    ? allTasks 
    : allTasks.filter(task => task.status === filterStatus);
  
  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  
  const handleCreateTask = () => {
    navigate(`/tasks/create`);
  };
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'done':
        return <FiCheckCircle className="text-green-500" />;
      case 'inProgress':
        return <FiClock className="text-yellow-500" />;
      default:
        return <FiCircle className="text-gray-400" />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <FiFilter className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
          
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            onClick={handleCreateTask}
          >
            <FiPlus className="mr-2" /> Add Task
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr 
                  key={task.id}
                  onClick={() => handleTaskClick(task.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusIcon(task.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TasksList;