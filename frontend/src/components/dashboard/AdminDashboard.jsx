import React, { useState, useEffect } from "react";
import Navbar from "../../components/comon/Navbar"; // Corrected path
import VehicleList from "./VehicleList";
import ModeratorList from "./ModeratorList";

const AdminDashboard = () => {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [moderatorCount, setModeratorCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        // Fetch vehicle count
        const vehiclesResponse = await fetch(
          "http://localhost:5000/api/vehicles",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const vehiclesData = await vehiclesResponse.json();
        if (vehiclesResponse.ok) {
          setVehicleCount(vehiclesData.length);
        } else {
          setError(vehiclesData.message || "Failed to fetch vehicle count.");
        }

        // Fetch moderator count
        const moderatorsResponse = await fetch(
          "http://localhost:5000/api/moderators",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const moderatorsData = await moderatorsResponse.json();
        if (moderatorsResponse.ok) {
          setModeratorCount(moderatorsData.length);
        } else {
          setError(
            moderatorsData.message || "Failed to fetch moderator count."
          );
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-600 text-xl">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Registered Vehicles
            </h2>
            <p className="text-3xl font-bold text-blue-600">{vehicleCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Moderators
            </h2>
            <p className="text-3xl font-bold text-green-600">
              {moderatorCount}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Vehicle List
          </h2>
          <VehicleList />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Moderator List
          </h2>
          <ModeratorList />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
