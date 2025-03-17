import React, { useState, useEffect } from "react";
import Navbar from "../../components/comon/Navbar"; // Corrected path
import VehicleList from "./VehicleList";
import QRCodeGenerator from "../comon/QRCodeGenerator";

const ModeratorDashboard = () => {
  const [vehiclesAdded, setVehiclesAdded] = useState(0);
  const [history, setHistory] = useState({ totalVehiclesAdded: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  useEffect(() => {
    const fetchModeratorData = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        // Fetch vehicles added by the moderator
        const vehiclesResponse = await fetch(
          "http://localhost:5000/api/vehicles/moderator",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const vehiclesData = await vehiclesResponse.json();
        if (vehiclesResponse.ok) {
          setVehiclesAdded(vehiclesData.length);
        } else {
          setError(vehiclesData.message || "Failed to fetch vehicles.");
        }

        // Fetch moderator's history
        const historyResponse = await fetch(
          "http://localhost:5000/api/moderators/history",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const historyData = await historyResponse.json();
        if (historyResponse.ok) {
          setHistory({
            totalVehiclesAdded: historyData.totalVehiclesAdded || 0,
          });
        } else {
          setError(historyData.message || "Failed to fetch history.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchModeratorData();
  }, []);

  const handleShowQR = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
    setSelectedVehicleId(null);
  };

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
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Moderator Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Vehicles Added
            </h2>
            <p className="text-3xl font-bold text-blue-600">{vehiclesAdded}</p>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Vehicle List
          </h2>
          <VehicleList onShowQR={handleShowQR} />
        </div>

        {/* Working History */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            My History
          </h2>
          <p className="text-gray-600">
            Total Vehicles Added:{" "}
            <span className="font-bold">{history.totalVehiclesAdded}</span>
          </p>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <QRCodeGenerator vehicleId={selectedVehicleId} />
              <button
                onClick={handleCloseQR}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeratorDashboard;
