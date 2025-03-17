import React, { useState, useEffect } from "react";

const ModeratorList = () => {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingModerator, setEditingModerator] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        // Fetch moderators
        const response = await fetch("http://localhost:5000/api/moderators", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          // Fetch the number of vehicles added by each moderator
          const moderatorsWithVehicles = await Promise.all(
            data.map(async (moderator) => {
              const vehicleResponse = await fetch(
                `http://localhost:5000/api/vehicles/moderator/${moderator._id}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const vehicleData = await vehicleResponse.json();
              return {
                ...moderator,
                id: moderator._id,
                vehiclesAdded: vehicleResponse.ok ? vehicleData.length : 0,
              };
            })
          );
          setModerators(moderatorsWithVehicles);
        } else {
          setError(data.message || "Failed to fetch moderators.");
        }
      } catch (err) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchModerators();
  }, []);

  const handleEdit = (moderator) => {
    setEditingModerator(moderator);
    setEditForm({ name: moderator.name, email: moderator.email });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/moderators/${editingModerator.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setModerators(
          moderators.map((mod) =>
            mod.id === editingModerator.id ? { ...mod, ...editForm } : mod
          )
        );
        setEditingModerator(null);
        alert("Moderator updated successfully!");
      } else {
        alert(data.message || "Failed to update moderator.");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  const handleDelete = async (moderatorId) => {
    if (!window.confirm("Are you sure you want to delete this moderator?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/moderators/${moderatorId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setModerators(moderators.filter((mod) => mod.id !== moderatorId));
        alert("Moderator deleted successfully!");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete moderator.");
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 p-6">Loading moderators...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Moderator List
      </h2>
      {moderators.length > 0 ? (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left text-gray-600">Name</th>
                <th className="p-3 text-left text-gray-600">Email</th>
                <th className="p-3 text-left text-gray-600">Vehicles Added</th>
                <th className="p-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {moderators.map((moderator) => (
                <tr key={moderator.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-gray-700">{moderator.name}</td>
                  <td className="p-3 text-gray-700">{moderator.email}</td>
                  <td className="p-3 text-gray-700">
                    {moderator.vehiclesAdded}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(moderator)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(moderator.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Modal */}
          {editingModerator && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Edit Moderator
                </h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingModerator(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-600">No moderators found.</p>
      )}
    </div>
  );
};

export default ModeratorList;
