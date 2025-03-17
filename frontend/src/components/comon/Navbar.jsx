import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/verify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setRole(data.role); // Assuming the backend returns { role: "ADMIN" } or { role: "MODERATOR" }
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching user role:", err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="w-64 h-screen bg-gray-800 text-white fixed p-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Vehicle Tracker
      </div>
      <ul className="mt-4">
        {/* Moderator Links */}
        {role === "MODERATOR" && (
          <>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/dashboard/add-vehicle" className="block w-full">
                Add Vehicle
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/dashboard/vehicle-list" className="block w-full">
                Vehicle List
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/dashboard/my-history" className="block w-full">
                My History
              </Link>
            </li>
          </>
        )}

        {/* Admin Links */}
        {role === "ADMIN" && (
          <>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/dashboard/add-moderator" className="block w-full">
                Add Moderator
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/dashboard/view-moderators" className="block w-full">
                View Moderators
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/dashboard/add-vehicle" className="block w-full">
                Add Vehicle
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700 cursor-pointer">
              <Link to="/dashboard/view-all-vehicles" className="block w-full">
                View All Vehicles
              </Link>
            </li>
          </>
        )}

        {/* Logout */}
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
