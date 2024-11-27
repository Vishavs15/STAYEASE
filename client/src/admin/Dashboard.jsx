import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmModal from "./ConfirmModal";
import UserProfileCard from "./UserProfileCard";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsOpen, setUserDetailsOpen] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalAccommodations: 0,
  });

  // Fetch users and dashboard statistics
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, statsResponse] = await Promise.all([
          axios.get("/users"),
          axios.get("/dashboard-stats"),
        ]);
  
        console.log("Users:", usersResponse.data); // Debugging
        console.log("Stats:", statsResponse.data); // Debugging
  
        setUsers(usersResponse.data);
        setDashboardStats(statsResponse.data);
  
        // Debug the updated states
        console.log("Updated Users State:", usersResponse.data);
        console.log("Updated Dashboard Stats State:", statsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
      }
    };
  
    fetchDashboardData();
  }, []);
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     setUsers([
  //       { _id: "1", name: "John Doe", email: "john@example.com", isOnline: true },
  //       { _id: "2", name: "Jane Smith", email: "jane@example.com", isOnline: false },
  //     ]);
  //     setDashboardStats({
  //       totalUsers: 2,
  //       totalBookings: 5,
  //       totalAccommodations: 10,
  //     });
  //   }, 1000);
  // }, []);
  

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
      const { data } = await axios.get(`/user-details/${user._id}`);
      if (data?.user) {
        setSelectedUser({ ...data.user, places: data.places || [] });
        setUserDetailsOpen(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleCloseDetails = () => {
    setUserDetailsOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { title: "Total Users", value: dashboardStats.totalUsers-1, color: "blue" },
          { title: "Total Bookings", value: dashboardStats.totalBookings, color: "blue" },
          { title: "Total Accommodations", value: dashboardStats.totalAccommodations, color: "blue" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 bg-${stat.color}-500 text-white rounded-lg shadow-md`}
          >
            <h2 className="text-lg font-bold">{stat.title}</h2>
            <p className="text-2xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Users Table */}
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
              <td
                className="border p-2 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                {user.name}
              </td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded ${
                    user.isOnline ? "text-green-500" : "text-red-500"
                  }`}
                >
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

      {/* Modals */}
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
