import React from 'react';
import { 
  FaFlag, 
  FaExclamationCircle, 
  FaChevronCircleDown, 
  FaArrowUp, 
  FaArrowDown 
} from 'react-icons/fa';

const TaskPriority = ({ priority, size = 'md', showLabel = false }) => {
  let Icon;
  let color;
  let label;

  switch (priority) {
    case 'high':
      Icon = FaExclamationCircle;
      color = 'text-red-500';
      label = 'High';
      break;
    case 'medium':
      Icon = FaFlag;
      color = 'text-yellow-500';
      label = 'Medium';
      break;
    case 'low':
      Icon = FaChevronCircleDown;
      color = 'text-green-500';
      label = 'Low';
      break;
    default:
      Icon = FaChevronCircleDown;
      color = 'text-gray-400';
      label = 'None';
  }

  const sizeClass = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-base';

  return (
    <div className={`flex items-center ${sizeClass}`}>
      <Icon className={`${color} ${showLabel ? 'mr-1' : ''}`} />
      {showLabel && <span className={`${color} font-medium`}>{label}</span>}
    </div>
  );
};

export const TaskTimeEstimate = ({ minutes, size = 'md' }) => {
  const sizeClass = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';
  
  const formatTime = (mins) => {
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <div className={`bg-blue-100 text-blue-800 px-2 py-0.5 rounded ${sizeClass}`}>
      Est: {formatTime(minutes)}
    </div>
  );
};

export default TaskPriority;