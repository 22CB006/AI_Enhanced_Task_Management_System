// client/src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; 
import Dashboard from './pages/Dashboard/index';  
import TasksList from './pages/Tasks/TasksList';
import TaskCreate from './pages/Tasks/TaskCreate';
import TaskDetails from './pages/Tasks/TaskDetails';
import TaskEdit from './pages/Tasks/TaskEdit';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound';
import Onboarding from './pages/Onboarding/Onboarding'; 

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/onboarding" replace />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TasksList />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;