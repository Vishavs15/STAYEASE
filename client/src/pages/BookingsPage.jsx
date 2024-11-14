import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="mt-12">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="p-4 border-b mb-4">
              <div>
                <strong>Booking for: </strong> {booking.place.name}
              </div>
              <div>
                <strong>Check-in: </strong> {new Date(booking.checkinDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Check-out: </strong> {new Date(booking.checkoutDate).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <div>No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
