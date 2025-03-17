import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Vehicle Tracker
        </h1>
        <p className="text-gray-600 mb-6">
          Track and manage your vehicles with ease. Login to access the
          dashboard.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
