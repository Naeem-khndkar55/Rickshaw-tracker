import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setMessage("Login successful! Redirecting...");
    setIsLoading(true);
    setTimeout(() => navigate("/dashboard"), 1000); // Redirect after a short delay for UX
  };

  const handleLoginError = (errorMessage) => {
    setMessage(errorMessage || "Login failed. Please check your credentials.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login to Vehicle Tracker
        </h1>
        <LoginForm
          onLoginSuccess={handleLoginSuccess}
          onLoginError={handleLoginError}
          setIsLoading={setIsLoading}
        />
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("successful") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
