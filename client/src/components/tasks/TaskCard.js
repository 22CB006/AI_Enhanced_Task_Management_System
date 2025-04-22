import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../../context/TaskContext';

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await updateTask(task._id, { status: newStatus });
    } catch (err) {
      console.error('Failed to update task status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await deleteTask(task._id);
      } catch (err) {
        console.error('Failed to delete task:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-medium text-lg text-gray-900">{task.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
              {task.status === 'todo' ? 'To Do' : 
               task.status === 'in-progress' ? 'In Progress' : 'Completed'}
            </span>
          </div>
          <p className="text-gray-600 mb-3 text-sm line-clamp-2">
            {task.description || 'No description provided'}
          </p>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {task.tags && task.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <div className="flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(task.dueDate)}
            </div>
            {task.estimatedTime && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {task.estimatedTime} min
              </div>
            )}
          </div>
        </div>
        
        <div className="flex">
          <div className="dropdown relative mr-2">
            <button 
              className="text-gray-500 hover:text-gray-700 p-1"
              disabled={isUpdating}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            <div className="dropdown-menu absolute right-0 hidden bg-white shadow-lg rounded-md w-36 py-1 z-10">
              {task.status !== 'todo' && (
                <button 
                  onClick={() => handleStatusChange('todo')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mark as To Do
                </button>
              )}
              {task.status !== 'in-progress' && (
                <button 
                  onClick={() => handleStatusChange('in-progress')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mark as In Progress
                </button>
              )}
              {task.status !== 'completed' && (
                <button 
                  onClick={() => handleStatusChange('completed')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mark as Completed
                </button>
              )}
              <Link 
                to={`/tasks/edit/${task._id}`}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit
              </Link>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;