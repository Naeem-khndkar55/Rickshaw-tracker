import React from "react";
import Navbar from "../../components/comon/Navbar";

const ModeratorDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Moderator Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Vehicles Added
            </h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Vehicle List
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-gray-600">Name</th>
                <th className="p-3 text-left text-gray-600">Added By</th>
                <th className="p-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 text-gray-700">Vehicle 1</td>
                <td className="p-3 text-gray-700">Moderator X</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    QR
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-700">Vehicle 2</td>
                <td className="p-3 text-gray-700">Moderator X</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    QR
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Working History (Placeholder) */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            My History
          </h2>
          <p className="text-gray-600">
            Total Vehicles Added: <span className="font-bold">0</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
