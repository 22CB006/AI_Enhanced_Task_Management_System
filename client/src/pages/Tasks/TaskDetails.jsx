import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils';

const TaskDetails = ({ tasks, deleteTask }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    return (
      <div className="task-not-found">
        <h2>Task Not Found</h2>
        <p>The task you're looking for doesn't exist or has been deleted.</p>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/tasks')}
        >
          Back to Tasks
        </button>
      </div>
    );
  }
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      navigate('/tasks');
    }
  };
  
  const handleEdit = () => {
    navigate(`/tasks/edit/${id}`);
  };
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'todo':
        return 'status-todo';
      case 'in-progress':
        return 'status-in-progress';
      case 'review':
        return 'status-review';
      case 'done':
        return 'status-done';
      default:
        return '';
    }
  };
  
  return (
    <div className="task-details">
      <div className="task-details-header">
        <h2>{task.title}</h2>
        <div className="task-actions">
          <button className="btn btn-secondary" onClick={handleEdit}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      
      <div className="task-details-content">
        <div className="task-meta">
          <div className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </div>
          <div className={`task-status ${getStatusClass(task.status)}`}>
            {task.status.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </div>
        
        {task.dueDate && (
          <div className="task-due-date">
            <strong>Due Date:</strong> {formatDate(task.dueDate)}
          </div>
        )}
        
        {task.assignee && (
          <div className="task-assignee">
            <strong>Assignee:</strong> {task.assignee}
          </div>
        )}
        
        <div className="task-description">
          <h3>Description</h3>
          <p>{task.description || 'No description provided.'}</p>
        </div>
        
        <div className="task-created">
          <strong>Created:</strong> {formatDate(task.createdAt)}
        </div>
      </div>
      
      <div className="task-details-footer">
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/tasks')}
        >
          Back to Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;