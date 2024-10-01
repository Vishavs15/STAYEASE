import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";
import UploadPhoto from "./UploadPhoto";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  // const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setRedirect] = useState('');

  {
    /* Different Functions =================================================================================================================== */
  }

  function inputHeader(text) {
    return <h2 className="text -2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)} 
      </>
    );
  }

  async function addNewPlace(ev) {
    ev.preventDefault();
    const {data} = await axios.post("/places", {      
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuest
    });
    setRedirect('/account/places');
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }  

  {/* =================================================================================================================== */}

  return (
    <div>
      {action !== "new" && (
        <div className="mt-7 flex justify-center">
          <Link
            to="/account/places/new"
            className="bg-primary text-white rounded-full py-3 px-5 flex flex-row gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {/* Title =================================================================================================================== */}

            {preInput("Title", "Title should be Short and Catchy")}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="Enter name of your place"
            />

            {/* Address =================================================================================================================== */}

            {preInput("Address", "Address should be exact")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="Enter address of your place"
            />

            {/* Photos =================================================================================================================== */}

            {preInput("Photos", "More = better")}
              <UploadPhoto addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

            {/* Description =================================================================================================================== */}

            {preInput("Description", "Add a description about your place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {/* Perks =================================================================================================================== */}

            {preInput(
              "Perks",
              "Select all available Perks to add them in your Place"
            )}
            <div className="grid gap-2 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {/* Extra Info =================================================================================================================== */}

            {preInput("Extra Info", "Address should be exact")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {/* Check In & Out =================================================================================================================== */}

            {preInput(
              "Check In & Out Times, Max Guests",
              "Add Check In & Out Times, Remember to have some time cleaning the room between Guests"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check In Time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="08:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="07:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Guests</h3>
                <input
                  type="number"
                  value={maxGuest}
                  onChange={(ev) => setMaxGuest(ev.target.value)}
                />
              </div>
            </div>

            {/* Save Btn =================================================================================================================== */}

            <div className="mt-4 mb-4">
              <button className="primary w-full">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
