// client/src/services/socketService.js
import { io } from 'socket.io-client';
import { getTaskById } from './taskService';

let socket;

export const initSocket = (token) => {
  if (socket) {
    socket.disconnect();
  }

  // Connect to the socket server with authentication
  socket = io('', {
    auth: {
      token
    }
  });

  // Listen for connection
  socket.on('connect', () => {
    console.log('Socket connected');
  });

  // Listen for errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  // Listen for disconnect
  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const listenForTaskUpdates = (callback) => {
  if (!socket) return;

  socket.on('task:updated', (task) => {
    callback(task);
  });

  socket.on('task:assigned', (task) => {
    callback(task);
  });
};

export const updateTaskStatus = (taskId, status) => {
  if (!socket) return;

  socket.emit('task:update', {
    taskId,
    updates: { status }
  });

  return new Promise((resolve) => {
    socket.once('task:updated:ack', (task) => {
      resolve(task);
    });
  });
};

export const assignTask = (taskId, userIds) => {
  if (!socket) return;

  socket.emit('task:assign', {
    taskId,
    userIds
  });

  return new Promise((resolve) => {
    socket.once('task:assigned:ack', (task) => {
      resolve(task);
    });
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};