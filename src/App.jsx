import React from 'react';
import './App.css';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Device from './pages/device/Device.jsx';
import DeviceView from './pages/device/DeviceView.jsx';
import User from './pages/user/User.jsx';
import AdminDashboard from './pages/dashboard/AdminDashboard.jsx';
import Users from './pages/user/Users.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate,Outlet } from 'react-router-dom';
const ProtectedRoute = ({ allowedRoles }) => {
  const auth = localStorage.getItem("auth"); // Retrieve auth status from localStorage or context
  const role = localStorage.getItem("role"); // Retrieve role from localStorage or context

  if (!auth) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // Redirect to an unauthorized page
  }

  return <Outlet />; // Render child routes
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

        {/* Protected Routes for Admin and User */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/devices" element={<Device />} />
          <Route path="/devices/:deviceId" element={<DeviceView />} />
          <Route path="/profile" element={<User />} />
        </Route>

        {/* Protected Routes for Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/main" element={<AdminDashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>

        {/* Catch-All Redirect */}
        <Route
          path="*"
          element={
            <Navigate
              to={localStorage.getItem("auth") ? (localStorage.getItem("role") === "admin" ? "/main" : "/dashboard") : "/"}
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;