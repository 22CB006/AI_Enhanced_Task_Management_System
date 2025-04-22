// src/pages/Dashboard/views/CalendarView.jsx
import React, { useState, useEffect } from 'react';

const CalendarView = ({ tasks, onTaskClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  
  // Generate calendar data when month changes
  useEffect(() => {
    generateCalendarDays();
  }, [currentDate, tasks]);
  
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();
    
    // Create array for all days in the calendar view (including padding days)
    const days = [];
    
    // Add padding days from previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -i);
      days.unshift({
        date: prevMonthDay,
        isCurrentMonth: false,
        dayTasks: filterTasksByDate(prevMonthDay)
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentMonthDay = new Date(year, month, i);
      days.push({
        date: currentMonthDay,
        isCurrentMonth: true,
        dayTasks: filterTasksByDate(currentMonthDay)
      });
    }
    
    // Calculate how many more days we need to add to complete the grid (7x6)
    const remainingDays = 42 - days.length; // 7 columns x 6 rows = 42 cells total
    
    // Add padding days from next month
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDay = new Date(year, month + 1, i);
      days.push({
        date: nextMonthDay,
        isCurrentMonth: false,
        dayTasks: filterTasksByDate(nextMonthDay)
      });
    }
    
    setCalendarDays(days);
  };
  
  const filterTasksByDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return tasks.filter(task => task.dueDate === dateString);
  };
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Calendar View</h2>
        <div className="flex items-center space-x-2">
          <button 
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => navigateMonth(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-md font-medium">
            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
          </span>
          <button 
            className="p-1 rounded hover:bg-gray-100"
            onClick={() => navigateMonth(1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {weekdays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        
        {/* Calendar cells */}
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`border rounded min-h-24 p-1 ${
              day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
            } ${
              day.date.toDateString() === new Date().toDateString() ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            <div className="text-xs font-medium">
              {day.date.getDate()}
            </div>
            <div className="mt-1 space-y-1 max-h-24 overflow-y-auto">
              {day.dayTasks.map(task => (
                <div 
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className={`text-xs p-1 rounded truncate cursor-pointer ${
                    task.priority === 'high' ? 'bg-red-100' :
                    task.priority === 'medium' ? 'bg-yellow-100' :
                    'bg-green-100'
                  }`}
                >
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;