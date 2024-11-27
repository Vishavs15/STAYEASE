import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const { id } = useParams();  // Get booking ID from the URL
  const [booking, setBooking] = useState(null);  // State to hold booking data
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(`/bookings/${id}`);
        setBooking(response.data);  // Set booking data
        setLoading(false);  // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching booking:", error);
        setLoading(false);  // Set loading to false in case of error
      }
    };

    fetchBooking();
  }, [id]);  // Re-run when the booking ID changes

  if (loading) {
    return <div>Loading...</div>;  // Show loading message while fetching data
  }

  if (!booking) {
    return <div>Booking not found.</div>;  // Handle case where booking doesn't exist
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <div>
        <p><strong>Booking ID:</strong> {booking._id}</p>
        <p><strong>Place:</strong> {booking.place.name}</p>
        <p><strong>Check-in:</strong> {booking.checkIn}</p>
        <p><strong>Check-out:</strong> {booking.checkOut}</p>
        <p><strong>Guests:</strong> {booking.maxGuest}</p>
        <p><strong>Total Price:</strong> ₹{booking.price}</p>
        <p><strong>User:</strong> {booking.name} ({booking.phone})</p>
      </div>
    </div>
  );
};

export default Booking;
