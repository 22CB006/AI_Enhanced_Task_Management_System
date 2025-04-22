import React from 'react';
import { 
  FaCheck, 
  FaClock, 
  FaRegCalendarAlt, 
  FaPaperclip, 
  FaComment 
} from 'react-icons/fa';
import TaskPriority, { TaskTimeEstimate } from './TaskPriority';
import { useTaskContext } from '../../../src/context/TaskContext';

const TaskItem = ({ task, view = 'list' }) => {
  const { toggleTaskCompletion, openTaskModal } = useTaskContext();
  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  
  const handleClick = () => {
    openTaskModal(task);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    toggleTaskCompletion(task.id);
  };

  if (view === 'kanban') {
    return (
      <div 
        className="bg-white p-3 rounded-md shadow mb-2 cursor-pointer hover:shadow-md transition-shadow"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <TaskPriority priority={task.priority} size="sm" />
        </div>
        
        {task.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-2">
          {task.timeEstimate && <TaskTimeEstimate minutes={task.timeEstimate} size="sm" />}
          
          {dueDate && (
            <div className="flex items-center text-xs text-gray-500">
              <FaRegCalendarAlt className="mr-1" />
              {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          )}
          
          {task.attachments?.length > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <FaPaperclip className="mr-1" />
              {task.attachments.length}
            </div>
          )}
          
          {task.comments?.length > 0 && (
            <div className="flex items-center text-xs text-gray-500">
              <FaComment className="mr-1" />
              {task.comments.length}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex-shrink-0 mr-3">
        <button 
          className={`w-5 h-5 rounded-full border flex items-center justify-center
            ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
          onClick={handleCheckboxClick}
        >
          {task.completed && <FaCheck className="text-white text-xs" />}
        </button>
      </div>
      
      <div className="flex-grow min-w-0">
        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="text-sm text-gray-600 line-clamp-1">{task.description}</p>
        )}
      </div>
      
      <div className="flex items-center gap-3 flex-shrink-0">
        {task.timeEstimate && <TaskTimeEstimate minutes={task.timeEstimate} size="sm" />}
        
        {dueDate && (
          <div className="flex items-center text-sm text-gray-500">
            <FaRegCalendarAlt className="mr-1" />
            {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        )}
        
        <TaskPriority priority={task.priority} size="sm" />
      </div>
    </div>
  );
};

export default TaskItem;