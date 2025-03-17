import React from "react";
import Navbar from "../components/comon/Navbar"; // Fixed typo: comon -> common
import AdminDashboard from "../components/dashboard/AdminDashboard";
import ModeratorDashboard from "../components/dashboard/ModeratorDashboard";

// For design purposes, we'll use a hardcoded role to switch dashboards
const role = "ADMIN"; // Change to "MODERATOR" to test the other dashboard

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Conditionally Render Dashboard Based on Role */}
        <AdminDashboard />
        <ModeratorDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
