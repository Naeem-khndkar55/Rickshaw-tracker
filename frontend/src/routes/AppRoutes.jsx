import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import VehicleInfoPage from "../pages/VehicleInfoPage";
import NotFoundPage from "../pages/NotFoundPage";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vehicle/:id" element={<VehicleInfoPage />} />

      {/* Dashboard Route (No Authentication for Now) */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
