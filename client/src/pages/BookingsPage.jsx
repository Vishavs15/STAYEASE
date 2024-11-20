import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays } from "date-fns"; // Import the function

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from the API
    axios
      .get("/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  }, []);

  const handleDelete = (bookingId) => {
    // Send DELETE request to the server
    axios
      .delete(`/bookings/${bookingId}`)
      .then(() => {
        // Remove the booking from the local state after successful deletion
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
      });
  };

  return (
    <div>
      <AccountNav />
      <div className="mt-12 px-4 md:px-12">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={index}
              className="flex gap-4 bg-gray-300 rounded-2xl shadow-md mb-4 overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="relative w-48 h-full overflow-hidden rounded-lg m-4">
                {/* Image container with margin and height set to full */}
                <PlaceImg place={booking.place} className="" />
              </div>
              <div className="flex-1 my-4">
                <h2 className="text-2xl font-semibold my-2">
                  {booking.place.title}
                </h2>
                <div className="text-gray-700">
                  <strong>Date : </strong>{" "}
                  {new Date(booking.checkinDate).toLocaleDateString()} -{" "}
                  {new Date(booking.checkoutDate).toLocaleDateString()} <br />
                </div>
                <div className="text-gray-700 mt-2">
                  <span>
                    {differenceInCalendarDays(
                      new Date(booking.checkoutDate),
                      new Date(booking.checkinDate)
                    )}{" "}
                    Night
                  </span>{" "}
                  | <strong>Total price</strong> : {booking.price} ₹
                </div>

                {/* New Information */}
                <div className="text-gray-700 mt-2">
                  <strong>Booked by:</strong> {booking.name}
                  <br>
                  </br> {" "}
                  <strong>Mobile No.:</strong> ({booking.phone})
                  <br />
                  {/* <strong>Guests:</strong> {booking.guest} */}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Delete Booking
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xl text-gray-500 p-6 bg-gray-100 rounded-lg">
            <h2 className="font-bold text-3xl mb-2">
              Looks like you haven't booked any place yet.
            </h2>
            <p>Browse through our listings and plan your next adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
