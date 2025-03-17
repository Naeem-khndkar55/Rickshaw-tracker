import React, { useState } from "react";
import QRCodeGenerator from "./QRCodeGenerator";

const VehicleCard = ({ vehicle, onUpdate }) => {
  const [showQR, setShowQR] = useState(false);

  const handleShowQR = () => {
    setShowQR(true);
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };

  const handleEdit = () => {
    // For now, we'll just log the action. Replace with a modal or form for editing.
    alert(`Edit vehicle: ${vehicle.name}`);
    // You can pass the vehicle data to a parent component or open a modal for editing.
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${vehicle.name}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/vehicles/${vehicle._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Vehicle deleted successfully!");
        onUpdate(); // Notify parent to refresh the vehicle list
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete vehicle.");
      }
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 transition transform hover:shadow-lg hover:-translate-y-1">
      {/* Owner Image */}
      <div className="flex-shrink-0">
        <img
          src={vehicle.ownerImage || "https://via.placeholder.com/100"}
          alt={vehicle.ownerName}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
        />
      </div>

      {/* Vehicle Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{vehicle.name}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Vehicle Number:</span>{" "}
          {vehicle.vehicleNumber}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Owner:</span> {vehicle.ownerName}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Phone:</span> {vehicle.phoneNumber}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Permitted Route:</span>{" "}
          {vehicle.permittedRoute}
        </p>

        {/* Action Buttons */}
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
          <button
            onClick={handleShowQR}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
          >
            QR
          </button>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <QRCodeGenerator vehicleId={vehicle._id} />
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
  );
};

export default VehicleCard;
