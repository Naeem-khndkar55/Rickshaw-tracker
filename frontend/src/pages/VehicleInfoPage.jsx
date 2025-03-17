import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "qrcode";

const VehicleInfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch vehicle data from the backend
        const response = await fetch(
          `http://localhost:5000/api/vehicles/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setVehicle(data);
        } else {
          setError(data.message || "Failed to fetch vehicle details.");
        }
      } catch (err) {
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id]);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = `http://localhost:5173/vehicle/${id}`;
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          width: 128,
          margin: 1,
          errorCorrectionLevel: "H",
        });
        setQrCodeUrl(qrCodeDataUrl);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError("Failed to generate QR code.");
      }
    };

    if (id) {
      generateQRCode();
    }
  }, [id]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `vehicle-qr-code-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading vehicle details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 text-xl">Vehicle not found.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Vehicle Details - #{vehicle._id}
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src={vehicle.ownerImage || "https://via.placeholder.com/150"}
            alt={vehicle.ownerName}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
          />
        </div>
        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-medium">Vehicle Name:</span> {vehicle.name}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Vehicle Number:</span>{" "}
            {vehicle.vehicleNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Owner:</span> {vehicle.ownerName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Phone Number:</span>{" "}
            {vehicle.phoneNumber}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Permitted Route:</span>{" "}
            {vehicle.permittedRoute}
          </p>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">QR Code</h3>
          {qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt={`QR Code for Vehicle ${vehicle._id}`}
              className="w-32 h-32 mx-auto mb-3"
            />
          ) : (
            <p className="text-gray-600">Generating QR Code...</p>
          )}
          <p className="text-sm text-gray-600 mb-3">
            Scan this QR code to access vehicle details.
          </p>
          <button
            onClick={handleDownload}
            disabled={!qrCodeUrl}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
              !qrCodeUrl ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Download QR Code
          </button>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoPage;
