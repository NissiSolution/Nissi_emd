import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Signup from './pages/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Device from './pages/device/Device';
import DeviceView from './pages/device/DeviceView';
import User from './pages/user/User';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Users from './pages/user/Users';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ auth }) {
  if (!auth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

function App() {
  const auth = localStorage.getItem('auth');
  const role=localStorage.getItem('role')
  return (
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute auth={auth} />}>
        {role === "admin" ? (
          <>
            {/* Admin-Only Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/dashboard" />} />
        )}

        {/* Common Routes for Both Roles */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Device />} />
        <Route path="/devices/:deviceId" element={<DeviceView />} />
        <Route path="/profile" element={<User />} />
      </Route>

      {/* Catch-All Route for Unmatched Paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
