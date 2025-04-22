// services/TaskService.js
import api from './api';

const TaskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await api.get('/api/tasks');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get task by ID
  getTaskById: async (taskId) => {
    try {
      const response = await api.get(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create a new task
  createTask: async (taskData) => {
    try {
      // Remove project field if it exists before sending to API
      const { project, ...taskToSend } = taskData;
      
      const response = await api.post('/api/tasks', taskToSend);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Update a task
  updateTask: async (taskId, taskData) => {
    try {
      // Remove project field if it exists before sending to API
      const { project, ...taskToSend } = taskData;
      
      const response = await api.put(`/api/tasks/${taskId}`, taskToSend);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await api.delete(`/api/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Toggle task completion
  toggleTaskComplete: async (taskId) => {
    try {
      const response = await api.patch(`/api/tasks/${taskId}/toggle-complete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get tasks by status
  getTasksByStatus: async (status) => {
    try {
      const response = await api.get(`/api/tasks/status/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get tasks due soon
  getTasksDueSoon: async () => {
    try {
      const response = await api.get('/api/tasks/due-soon');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default TaskService;