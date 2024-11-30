import React, { useEffect, useState } from "react";
import Perks from "../components/Perks";
import UploadPhoto from "../components/UploadPhoto";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom"; // Added this import

const PlacesFormPage = () => {
  const { id } = useParams();
  // console.log({id});
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  // const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(); // Change to maxGuests
  const [price, setPrice] = useState();
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
      // console.log(data.photos); // Check if photos are being fetched correctly
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl font-medium mt-4">{text}</h2>;
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

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    // console.log("Place data being sent:", placeData); // Check the addedPhotos array
    if (id) {
      // update
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <>
      <div>
        <form onSubmit={savePlace}>
          {/* Title =================================================================================================================== */}

          {preInput("Title", "Enter Short and Catchy Title")}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Enter name of your place"
          />

          {/* Address =================================================================================================================== */}

          {preInput("Address", "Enter Address")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="Enter address of your place"
          />

          {/* Photos =================================================================================================================== */}

          {preInput("Photos", "More = better")}
          <UploadPhoto addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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

          {preInput("Extra Info", "Optional Informations")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />

          {/* Check In & Out =================================================================================================================== */}

          {preInput(
            "Check In & Out Times",
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
                value={maxGuests} // Change here
                onChange={(ev) => setMaxGuests(ev.target.value)} // Change here
              />
            </div>
          </div>

          {/* Pricing =================================================================================================================== */}

          {preInput(
            "Set a Price for your place",
            "Try to set price which is Good for both You and the Guest"
          )}
          <div className="w-1/2">
            <h3 className="mt-2 -mb-1">Price For One Night</h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>

          {/* Save Btn =================================================================================================================== */}

          <div className="mt-4 mb-4">
            <button className="primary w-full">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
