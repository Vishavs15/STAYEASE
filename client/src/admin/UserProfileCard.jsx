import React, { useEffect, useState } from 'react';

const UserProfileCard = ({ userData, onClose }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings for the user
    if (userData && userData._id) {
      axios
        .get(`/bookings?userId=${userData._id}`)
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user bookings:', error);
        });
    }
  }, [userData]);

  return (
    <div className="fixed inset-0 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Account Created:</strong> {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "N/A"}</p>

        {/* Places Added */}
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

        {/* Bookings Made */}
        <h3 className="text-xl font-medium mt-4">Bookings Made:</h3>
        {bookings.length > 0 ? (
          <ul className="mt-2">
            {bookings.map((booking) => (
              <li key={booking._id} className="border p-2 mt-2 rounded">
                <strong>Place:</strong> {booking.place.title || "N/A"}
                <p>
                  <strong>Dates:</strong> {new Date(booking.checkinDate).toLocaleDateString()} -{" "}
                  {new Date(booking.checkoutDate).toLocaleDateString()}
                </p>
                <p><strong>Total Price:</strong> ₹{booking.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings made by this user.</p>
        )}

        {/* Close Button */}
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
