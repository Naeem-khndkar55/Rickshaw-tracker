import React, { useState, useEffect } from "react";
import Navbar from "../components/comon/Navbar"; // Corrected path
import AdminDashboard from "../components/dashboard/AdminDashboard";
import ModeratorDashboard from "../components/dashboard/ModeratorDashboard";

const DashboardPage = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/auth/verify", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setRole(data.role);
        } else {
          setError(data.message || "Failed to verify user role.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-xl">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
        <a href="/login" className="mt-4 text-blue-500 hover:underline">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        {/* Conditionally Render Dashboard Based on Role */}
        {role === "ADMIN" && <AdminDashboard />}
        {role === "MODERATOR" && <ModeratorDashboard />}
        {role && role !== "ADMIN" && role !== "MODERATOR" && (
          <div className="text-center text-yellow-500">
            Unsupported role: {role}. Please contact support.
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
