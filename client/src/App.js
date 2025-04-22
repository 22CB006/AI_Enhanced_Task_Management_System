// client/src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { TaskProvider } from './context/TaskContext';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <AppRoutes /> {/* This contains all your route definitions */}
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;