import React, { useState } from 'react';
import { 
  Columns, 
  List, 
  Calendar, 
  Square, 
  Circle, 
  CheckSquare 
} from 'lucide-react';

const TaskTabs = () => {
  const [activeTab, setActiveTab] = useState('kanban');

  // Sample task data for demonstration
  const tasks = [
    { id: 1, title: 'Finish dashboard UI', status: 'in-progress', dueDate: '2025-04-23', priority: 'high' },
    { id: 2, title: 'Set up task API', status: 'todo', dueDate: '2025-04-25', priority: 'medium' },
    { id: 3, title: 'Implement search functionality', status: 'todo', dueDate: '2025-04-27', priority: 'medium' },
    { id: 4, title: 'Create task filters', status: 'in-progress', dueDate: '2025-04-22', priority: 'low' },
    { id: 5, title: 'Design settings page', status: 'completed', dueDate: '2025-04-19', priority: 'medium' },
    { id: 6, title: 'Implement AI suggestions', status: 'todo', dueDate: '2025-04-30', priority: 'high' },
  ];

  // Group tasks by status for Kanban view
  const groupedTasks = {
    'todo': tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    'completed': tasks.filter(task => task.status === 'completed')
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'kanban':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Todo Column */}
            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Square className="mr-2 h-5 w-5 text-blue-500" />
                To Do ({groupedTasks['todo'].length})
              </h3>
              <div className="space-y-3">
                {groupedTasks['todo'].map(task => (
                  <div key={task.id} className="bg-white p-3 rounded shadow-sm border-l-4 border-blue-500">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>Due: {task.dueDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <Circle className="mr-2 h-5 w-5 text-yellow-500" />
                In Progress ({groupedTasks['in-progress'].length})
              </h3>
              <div className="space-y-3">
                {groupedTasks['in-progress'].map(task => (
                  <div key={task.id} className="bg-white p-3 rounded shadow-sm border-l-4 border-yellow-500">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>Due: {task.dueDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Column */}
            <div className="bg-gray-50 rounded-lg p-4 shadow">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                <CheckSquare className="mr-2 h-5 w-5 text-green-500" />
                Completed ({groupedTasks['completed'].length})
              </h3>
              <div className="space-y-3">
                {groupedTasks['completed'].map(task => (
                  <div key={task.id} className="bg-white p-3 rounded shadow-sm border-l-4 border-green-500 opacity-70">
                    <h4 className="font-medium">{task.title}</h4>
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>Due: {task.dueDate}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="bg-white rounded-lg shadow mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.map(task => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.status === 'todo' ? 'bg-blue-100 text-blue-800' : 
                          task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.status === 'todo' ? 'To Do' : 
                           task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {task.dueDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
        );
      case 'calendar':
        return (
          <div className="bg-white rounded-lg shadow p-4 mt-4">
            <div className="flex justify-center items-center h-64">
              <div className="text-center text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 text-blue-500" />
                <p className="text-lg font-medium">Calendar View</p>
                <p className="text-sm">Calendar integration coming soon</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="my-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`py-2 px-1 flex items-center ${
              activeTab === 'kanban'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Columns className="h-5 w-5 mr-2" />
            <span>Kanban</span>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`py-2 px-1 flex items-center ${
              activeTab === 'list'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <List className="h-5 w-5 mr-2" />
            <span>List</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-2 px-1 flex items-center ${
              activeTab === 'calendar'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Calendar className="h-5 w-5 mr-2" />
            <span>Calendar</span>
          </button>
        </nav>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default TaskTabs;