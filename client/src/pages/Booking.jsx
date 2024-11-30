import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Booking = () => {
  const { id } = useParams(); // Get booking ID from the URL
  const [booking, setBooking] = useState(null); // State to hold booking data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/bookings/${id}`);
        console.log("API Response:", response.data); // Log the full booking object
        setBooking(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking:", error);
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-medium text-red-600">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Booking Details
      </h1>
      <div className="space-y-4">
        <p className="text-lg">
          <strong className="font-semibold text-gray-700">Booking ID:</strong>{" "}
          {booking._id}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-700">Place:</strong>{" "}
          {booking.place?.title || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-700">Check-in:</strong>{" "}
          {booking.place?.checkIn || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-700">Check-out:</strong>{" "}
          {booking.place?.checkOut || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-700">Guests:</strong>{" "}
          {booking.place?.maxGuests || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-700">Total Price:</strong>{" "}
          ₹{booking.place?.price || "N/A"}
        </p>
        <p className="text-lg">
          <strong className="font-semibold text-gray-700">User:</strong>{" "}
          {booking.name} ({booking.phone || "No phone provided"})
        </p>
      </div>
    </div>
  );
};

export default Booking;
