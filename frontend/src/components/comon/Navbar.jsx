import React from "react";

const Navbar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Vehicle Tracker
      </div>
      <ul className="mt-4">
        {/* Moderator Links */}
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Add Vehicle</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Vehicle List</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">My History</li>

        {/* Admin Links */}
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Add Moderator</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          View Moderators
        </li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Add Vehicle</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
          View All Vehicles
        </li>

        {/* Logout */}
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default Navbar;
