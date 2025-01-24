import React from 'react';
import './App.css';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/signup/Signup.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Device from './pages/device/Device.jsx';
import DeviceView from './pages/device/DeviceView.jsx';
import User from './pages/user/User.jsx';
import AdminDashboard from './pages/dashboard/AdminDashboard.jsx';
import Users from './pages/user/Users.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Protected Route Component
function ProtectedRoute({ auth, children }) {
  return auth ? children : <Navigate to="/" />;
}

function App() {
  const auth = localStorage.getItem('auth') === "true"; // Convert string to boolean
  const role = localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="*"
          element={
            <ProtectedRoute auth={auth}>
              <Routes>
                {role === "admin" && (
                  <>
                    {/* Admin-Only Routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/users" element={<Users />} />
                  </>
                )}
                
                {/* Common Routes for Both Roles */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/devices" element={<Device />} />
                <Route path="/devices/:deviceId" element={<DeviceView />} />
                <Route path="/profile" element={<User />} />

                {/* Catch-All for Invalid Authenticated Routes */}
                <Route path="*" element={<Navigate to={role === "admin" ? "/admin" : "/dashboard"} />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        {/* Catch-All for Unauthenticated Users */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
