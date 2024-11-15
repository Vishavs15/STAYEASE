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
  const [redirect,setRedirect] = useState('');

  // this help to auto fill user name in booikng widget
  
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  //====================================================

  async function bookthisPlace(){
    const response = await axios.post('/bookings', {checkIn,checkOut,maxGuest,name,phone,
      place:place._id,
      price : numberofDays*place.price,
    });
    const bookingID = response.data._id;
    setRedirect(`/account/bookings/${bookingID}`);

    
  }

  if (redirect) {
    return <Navigate to ={redirect} />
  }
  let numberofDays = 0;
  if (checkIn && checkOut) {
    numberofDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

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
              />
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check-out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
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
              />
              <label>Mobile Number: </label>
              <input
                type="tel"
                value={""}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          )}
        </div>

        <button onClick={bookthisPlace} className="primary mt-4 w-full">
          Book Now {numberofDays > 0 && <span>₹ {numberofDays * place.price}</span>}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
