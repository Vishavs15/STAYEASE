import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import UserProfileCard from "./UserProfileCard";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [isUserDetailsOpen, setUserDetailsOpen] = useState(false); // State for user details card

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

  const handleUserClick = async (user) => {
    try {
      const { data } = await axios.get(`/user-details/${user._id}`); // Fetch user details
  
      // Ensure the data is in the expected format
      if (!data || !data.user) {
        console.error("No user data received from the API");
        return;
      }
  
      setSelectedUser(data.user); // Set the user details
      setSelectedUser((prev) => ({ ...prev, places: data.places || [] })); // Add places to the user data
      setUserDetailsOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Define handleCloseDetails to close the user details card
  const handleCloseDetails = () => {
    setUserDetailsOpen(false);
    setSelectedUser(null);
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
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2 cursor-pointer" onClick={() => handleUserClick(user)}>
                {user.name}
              </td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <span className={`px-2 py-1 rounded ${user.isOnline ? "text-green-500" : "text-red-500"}`}>
                  {user.isOnline ? "Online" : "Offline"}
                </span>
              </td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isConfirmModalOpen && (
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {isUserDetailsOpen && selectedUser && (
        <UserProfileCard userData={selectedUser} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default Dashboard;
