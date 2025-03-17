import React from "react";
import LoginForm from "../components/auth/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login to Vehicle Tracker
        </h1>
        <LoginForm />
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
