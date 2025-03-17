import React, { useState, useEffect } from "react";
import VehicleCard from "../comon/VehicleCard"; // Corrected path

const VehicleList = ({ onShowQR }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRoleAndVehicles = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        // Fetch user role to determine which vehicles to fetch
        const roleResponse = await fetch(
          "http://localhost:5000/api/auth/verify",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const roleData = await roleResponse.json();
        if (!roleResponse.ok) {
          throw new Error(roleData.message || "Failed to fetch user role.");
        }
        setRole(roleData.role);

        // Determine the endpoint based on role
        const endpoint =
          roleData.role === "ADMIN"
            ? "http://localhost:5000/api/vehicles"
            : "http://localhost:5000/api/vehicles/moderator";

        // Fetch vehicles
        const vehiclesResponse = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const vehiclesData = await vehiclesResponse.json();

        if (vehiclesResponse.ok) {
          setVehicles(vehiclesData);
        } else {
          setError(vehiclesData.message || "Failed to fetch vehicles.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleAndVehicles();
  }, []);

  const handleUpdate = () => {
    // Re-fetch vehicles after an update (e.g., deletion)
    const token = localStorage.getItem("token");
    const endpoint =
      role === "ADMIN"
        ? "http://localhost:5000/api/vehicles"
        : "http://localhost:5000/api/vehicles/moderator";

    fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (response.ok) {
          setVehicles(data);
        } else {
          setError(data.message || "Failed to refresh vehicles.");
        }
      })
      .catch(() => setError("An error occurred while refreshing vehicles."));
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 p-6">Loading vehicles...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {vehicles.length > 0 ? (
        vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle._id}
            vehicle={vehicle}
            onUpdate={handleUpdate}
            onShowQR={onShowQR}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">No vehicles found.</p>
      )}
    </div>
  );
};

export default VehicleList;
