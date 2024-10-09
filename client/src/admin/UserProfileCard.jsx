import React from 'react';

const UserProfileCard = ({ userData, onClose }) => {
  // Log to check the structure of userData
  console.log(userData);

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        {/* <p><strong>Role:</strong> {userData.role || "User"}</p> */}
        <p><strong>Account Created:</strong> {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}</p>

        <h3 className="text-xl font-medium mt-4">Places Added:</h3>
        {userData.places && userData.places.length > 0 ? (
          <ul className="mt-2">
            {userData.places.map((place) => (
              <li key={place._id} className="border p-2 mt-2 rounded">
                <strong>{place.title}</strong>
                <p>{place.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No places added by this user.</p>
        )}

        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
