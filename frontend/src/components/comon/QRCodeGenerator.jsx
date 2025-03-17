import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

const QRCodeGenerator = ({ vehicleId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Generate QR code linking to /vehicle/:id
    QRCode.toDataURL(
      `http://localhost:5173/vehicle/${vehicleId}`,
      (err, url) => {
        if (err) console.error(err);
        setQrCodeUrl(url);
      }
    );
  }, [vehicleId]);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">
        QR Code for Vehicle #{vehicleId}
      </h3>
      {qrCodeUrl ? (
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
        onClick={() => alert("Download functionality coming soon!")}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Download QR Code
      </button>
    </div>
  );
};

export default QRCodeGenerator;
