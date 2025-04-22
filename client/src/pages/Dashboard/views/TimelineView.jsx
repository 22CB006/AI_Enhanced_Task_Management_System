// src/pages/Dashboard/views/TimelineView.jsx
import React, { useState } from 'react';

const TimelineView = ({ tasks, onTaskClick }) => {
  const [timeScale, setTimeScale] = useState('month'); // month, week, day
  
  // Sort tasks by due date
  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });
  
  // Group tasks by their time period (month, week, or day)
  const groupTasksByTimePeriod = () => {
    const groupedTasks = {};
    
    sortedTasks.forEach(task => {
      if (!task.dueDate) return;
      
      const date = new Date(task.dueDate);
      let groupKey;
      
      if (timeScale === 'month') {
        groupKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      } else if (timeScale === 'week') {
        // Calculate the first day of the week (Sunday)
        const firstDayOfWeek = new Date(date);
        const dayOfWeek = date.getDay();
        firstDayOfWeek.setDate(date.getDate() - dayOfWeek);
        groupKey = `${firstDayOfWeek.toISOString().split('T')[0]}`;
      } else { // day
        groupKey = task.dueDate;
      }
      
      if (!groupedTasks[groupKey]) {
        groupedTasks[groupKey] = [];
      }
      
      groupedTasks[groupKey].push(task);
    });
    
    return groupedTasks;
  };
  
  const groupedTasks = groupTasksByTimePeriod();
  
  // Format the time period label
  const formatTimePeriodLabel = (key) => {
    if (timeScale === 'month') {
      const [year, month] = key.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
    } else if (timeScale === 'week') {
      const startDate = new Date(key);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else { // day
      return new Date(key).toLocaleDateString();
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Timeline View</h2>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded ${timeScale === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeScale('day')}
          >
            Daily
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${timeScale === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeScale('week')}
          >
            Weekly
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded ${timeScale === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setTimeScale('month')}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {Object.keys(groupedTasks).map(timePeriod => (
          <div key={timePeriod} className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-md font-medium mb-3">{formatTimePeriodLabel(timePeriod)}</h3>
            <div className="space-y-2">
              {groupedTasks[timePeriod].map(task => (
                <div 
                  key={task.id} 
                  className="flex items-start p-3 bg-gray-50 rounded border border-gray-200 hover:shadow-sm cursor-pointer"
                  onClick={() => onTaskClick(task)}
                >
                  <div 
                    className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                      task.status === 'todo' ? 'bg-red-500' :
                      task.status === 'in-progress' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{task.title}</h4>
                      <span 
                        className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    {task.subtasks && task.subtasks.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500">
                        {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks completed
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {Object.keys(groupedTasks).length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks with due dates to display.
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;