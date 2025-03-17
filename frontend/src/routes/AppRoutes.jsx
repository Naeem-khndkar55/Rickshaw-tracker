import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import VehicleInfoPage from "../pages/VehicleInfoPage";
import NotFoundPage from "../pages/NotFoundPage";
import Home from "../pages/Home";

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token with backend (optional, for simplicity, we'll trust localStorage for now)
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vehicle/:id" element={<VehicleInfoPage />} />
      <Route path="/" element={<Home />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
