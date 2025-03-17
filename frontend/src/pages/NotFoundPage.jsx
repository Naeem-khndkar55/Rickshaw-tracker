import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
