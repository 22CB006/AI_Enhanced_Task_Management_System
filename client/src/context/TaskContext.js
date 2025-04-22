import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

// Create context
export const TaskContext = createContext();

// Initial state
const initialState = {
  tasks: [],
  projects: [],
  loading: true,
  error: null
};

// Reducer
const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case 'GET_PROJECTS_SUCCESS':
      return {
        ...state,
        projects: action.payload,
        loading: false
      };
    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map(task => 
          task._id === action.payload._id ? action.payload : task
        )
      };
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case 'TASK_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

// Provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { token } = useContext(AuthContext);
  
  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Function to make authenticated API requests
  const makeRequest = async (method, endpoint, data = null) => {
    try {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const config = {
        method,
        url: `${API_URL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      if (data) {
        config.data = data;
      }
      
      const response = await axios(config);
      return response.data;
    } catch (err) {
      console.error(`Error in ${method} ${endpoint}:`, err);
      throw err;
    }
  };

  // Get tasks
  const getTasks = async () => {
    try {
      const data = await makeRequest('get', '/tasks');
      dispatch({
        type: 'GET_TASKS_SUCCESS',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.msg || err.message || 'Server Error'
      });
    }
  };

  // Get projects
  const getProjects = async () => {
    try {
      const data = await makeRequest('get', '/projects');
      dispatch({
        type: 'GET_PROJECTS_SUCCESS',
        payload: data
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.msg || err.message || 'Server Error'
      });
    }
  };

  // Add task
  const addTask = async (task) => {
    try {
      console.log('Adding task with token:', token);
      const data = await makeRequest('post', '/tasks', task);
      dispatch({
        type: 'ADD_TASK_SUCCESS',
        payload: data
      });
      return data;
    } catch (err) {
      console.error('Error adding task:', err);
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.msg || err.message || 'Server Error'
      });
      throw err;
    }
  };

  // Update task
  const updateTask = async (id, task) => {
    try {
      const data = await makeRequest('put', `/tasks/${id}`, task);
      dispatch({
        type: 'UPDATE_TASK_SUCCESS',
        payload: data
      });
      return data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.msg || err.message || 'Server Error'
      });
      throw err;
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await makeRequest('delete', `/tasks/${id}`);
      dispatch({
        type: 'DELETE_TASK_SUCCESS',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.msg || err.message || 'Server Error'
      });
    }
  };

  // Add subtask
  const addSubtask = async (taskId, subtaskTitle) => {
    try {
      const data = await makeRequest('post', `/tasks/${taskId}/subtask`, { title: subtaskTitle });
      dispatch({
        type: 'UPDATE_TASK_SUCCESS',
        payload: data
      });
      return data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.msg || err.message || 'Server Error'
      });
      throw err;
    }
  };

  // Toggle subtask completion
  const toggleSubtask = async (taskId, subtaskId, completed) => {
    try {
      const data = await makeRequest('put', `/tasks/${taskId}/subtask/${subtaskId}`, { completed });
      dispatch({
        type: 'UPDATE_TASK_SUCCESS',
        payload: data
      });
      return data;
    } catch (err) {
      dispatch({
        type: 'TASK_ERROR',
        payload: err.response?.data?.msg || err.message || 'Server Error'
      });
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        projects: state.projects,
        loading: state.loading,
        error: state.error,
        getTasks,
        getProjects,
        addTask,
        updateTask,
        deleteTask,
        addSubtask,
        toggleSubtask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;