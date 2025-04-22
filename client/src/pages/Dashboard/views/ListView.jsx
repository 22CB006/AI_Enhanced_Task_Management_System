// src/pages/Dashboard/views/ListView.jsx
import React, { useState } from 'react';

const ListView = ({ tasks, onTaskClick, onAddSubtask, onToggleSubtask }) => {
  const [sortBy, setSortBy] = useState('dueDate');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Filter tasks based on status and priority
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  // Sort tasks based on sortBy
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate || '9999') - new Date(b.dueDate || '9999');
    } else if (sortBy === 'priority') {
      const priorityValue = { high: 1, medium: 2, low: 3 };
      return priorityValue[a.priority] - priorityValue[b.priority];
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'status') {
      const statusValue = { todo: 1, 'in-progress': 2, done: 3 };
      return statusValue[a.status] - statusValue[b.status];
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Tasks List</h2>
        <div className="flex space-x-2">
          <select 
            className="border rounded px-2 py-1 text-sm" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
          </select>
          <select 
            className="border rounded px-2 py-1 text-sm" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select 
            className="border rounded px-2 py-1 text-sm" 
            value={filterPriority} 
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 tracking-wider">Title</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 tracking-wider">Description</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 tracking-wider">Status</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 tracking-wider">Priority</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 tracking-wider">Due Date</th>
              <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 tracking-wider">Subtasks</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTasks.map(task => (
              <tr 
                key={task.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onTaskClick(task)}
              >
                <td className="py-2 px-3 text-sm">{task.title}</td>
                <td className="py-2 px-3 text-sm text-gray-600">{task.description}</td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.status === 'todo' ? 'bg-red-100 text-red-800' :
                    task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.status === 'todo' ? 'To Do' : 
                     task.status === 'in-progress' ? 'In Progress' : 'Done'}
                  </span>
                </td>
                <td className="py-2 px-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </td>
                <td className="py-2 px-3 text-sm">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                </td>
                <td className="py-2 px-3 text-sm">
                  {task.subtasks ? 
                    `${task.subtasks.filter(st => st.completed).length}/${task.subtasks.length}` 
                    : '0/0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;