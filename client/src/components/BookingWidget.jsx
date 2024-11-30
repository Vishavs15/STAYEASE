import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [redirect, setRedirect] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  // this helps to auto-fill user name and email in booking widget
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email); // Autofill the email if the user is logged in
      setPhone(user.phone);
    }
  }, [user]);

  const validateForm = () => {
    // Full Name validation: only letters and spaces, minimum length of 3 characters
    const namePattern = /^[A-Za-z\s]{3,}$/;
    if (!namePattern.test(name)) {
      setErrorMessage("Please enter a valid name (at least 3 characters, no special characters).");
      return false;
    }

    // Mobile Number validation: exactly 10 digits, numeric only
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return false;
    }

    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/; // Simplified email validation
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid Email.");
      return false;
    }

    setErrorMessage(""); // Clear any previous error messages
    return true;
  };

  async function bookthisPlace() {
    if (!user) {
      setLoginMessage("Please log in first.");
      setTimeout(() => {
        setRedirect("/login");
      }, 2000); // Redirect to login page after 2 seconds
      return;
    }

    if (!validateForm()) return; // Don't proceed if the form is not valid

    const response = await axios.post('/bookings', { 
      checkIn, 
      checkOut, 
      maxGuest, 
      name, 
      phone,
      place: place._id,
      price: numberofDays * place.price,
    });
    const bookingID = response.data._id;
    setRedirect(`/account/bookings/${bookingID}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  let numberofDays = 0;
  if (checkIn && checkOut) {
    numberofDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  // Get today's date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <div className="bg-white shadow-md p-4 rounded-2xl">
        <div className="text-2xl text-center">
          Price: ₹{place.price} / per night
        </div>

        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check-in: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                min={today} // Ensure check-in date is today or later
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check-out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                min={checkIn} // Ensure check-out date is after check-in date
                disabled={!checkIn} // Disable check-out if no check-in date selected
              />
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of guests: </label>
            <input
              type="number"
              value={maxGuest}
              onChange={(ev) => setMaxGuest(ev.target.value)}
            />
          </div>
          {numberofDays > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your Full Name: </label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Enter full name"
              />
              {errorMessage && errorMessage.includes("name") && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <label>Email : </label>
              <input
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="Enter Your Email"
                disabled // Make email field non-editable
              />
              {errorMessage && errorMessage.includes("email") && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <label>Mobile Number: </label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                placeholder="Enter mobile number"
              />
              {errorMessage && errorMessage.includes("mobile") && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
          )}
        </div>

        <button onClick={bookthisPlace} className="primary mt-4 w-full">
          Book Now {numberofDays > 0 && <span>₹ {numberofDays * place.price}</span>}
        </button>

        {loginMessage && (
          <p className="text-red-500 text-center mt-4">{loginMessage}</p>
        )}
      </div>
    </div>
  );
};

export default BookingWidget;
