import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({ vehicleId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setError("");
        // Generate QR code linking to /vehicle/:id
        const url = `http://localhost:5173/vehicle/${vehicleId}`;
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          width: 128, // Match the display size (w-32 = 128px)
          margin: 1,
          errorCorrectionLevel: "H", // High error correction for better scanning
        });
        setQrCodeUrl(qrCodeDataUrl);
      } catch (err) {
        console.error("Error generating QR code:", err);
        setError("Failed to generate QR code. Please try again.");
      }
    };

    if (vehicleId) {
      generateQRCode();
    } else {
      setError("Vehicle ID is missing.");
    }
  }, [vehicleId]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    // Create a temporary link element to trigger download
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `vehicle-qr-code-${vehicleId}.png`; // File name for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        QR Code for Vehicle #{vehicleId}
      </h3>
      {error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : qrCodeUrl ? (
        <img
          src={qrCodeUrl}
          alt={`QR Code for Vehicle ${vehicleId}`}
          className="w-32 h-32 mb-3"
        />
      ) : (
        <p className="text-gray-600">Generating QR Code...</p>
      )}
      <p className="text-sm text-gray-600 text-center">
        Scan this QR code to view vehicle details.
      </p>
      <button
        onClick={handleDownload}
        disabled={!qrCodeUrl}
        className={`mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
          !qrCodeUrl ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
