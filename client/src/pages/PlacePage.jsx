import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div className="">
            <h2 className="text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setShowPhotos(false)}
              className="fixed flex right-12 top-8 gap-1 py-2 px-4 rounded-2xl bg-gray-300 border border-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="">
                <img src={"http://localhost:3000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8 rounded-3xl">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + place.address}
      >
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div className="">
            {place.photos?.[0] && (
              <div>
                <img
                  className="aspect-square object-cover"
                  src={"http://localhost:3000/uploads/" + place.photos[0]}
                />
              </div>
            )}
          </div>
          <div className="grid gap-2">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={"http://localhost:3000/uploads/" + place.photos[1]}
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative top-2"
                  src={"http://localhost:3000/uploads/" + place.photos[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowPhotos(!showPhotos)}
          className="absolute bg-white rounded-2xl border border-black bottom-2 right-2 py-2 px-4"
        >
          Show more photos
        </button>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-2xl mb-2">Description</h2>
        {place.description}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
        <div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
          <div className="mt-2 text-sm text-gray-700 leading-4">
            <h2 className="font-semibold text-2xl mb-2">Important Notice</h2>
            {place.extraInfo}
          </div>
          {/* <div className="mt-4">
            <h2 className="font-semibold text-2xl mb-2">Perks</h2>
            <ul className="list-disc pl-6">
              {place.perks && place.perks.length > 0 ? (
                place.perks.map((perk, index) => (
                  <li key={index} className="text-sm text-gray-700 leading-4">
                    {perk}
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No perks available.</p>
              )}
            </ul>
          </div> */}
          <div className="mt-4 mx-4">
            <h2 className="font-semibold text-2xl mb-4">Perks</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {place.perks && place.perks.length > 0 ? (
                place.perks.map((perk, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-200 p-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>{" "}
                      {/* Small color dot */}
                      <span className="font-medium text-lg text-gray-800">
                        {perk}
                      </span>
                    </div>
                    {/* <span className="text-sm text-gray-600">✔️</span>{" "} */}
                    {/* A check mark or small symbol */}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">
                  No perks available for this place.
                </p>
              )}
            </ul>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
