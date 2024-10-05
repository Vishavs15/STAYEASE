import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    axios.get("/users").then(({ data }) => {
      setUsers(data);
    });
  }, []);

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/users/${userIdToDelete}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== userIdToDelete)
      );
      setConfirmModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCancelDelete = () => {
    setConfirmModalOpen(false);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-500 text-white">
          <tr>
            <th className="border p-2">No.</th>
            <th className="border p-2">User Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Status</th> {/* New Status Header */}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              {/* User Status */}
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    user.isOnline
                      ? "text-green-500" // Green background if online
                      : "text-red-500" // Red background if offline
                  }`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </span>
              </td>
              {/* Delete Button */}
              <td className="border p-2">
                <button
                  className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-200"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;
