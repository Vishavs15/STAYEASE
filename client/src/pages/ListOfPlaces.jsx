import { Link, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

const PlacesPage = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  // Delete function to remove a place
  const handleDelete = (id) => {
    axios
      .delete(`/user-places/${id}`)
      .then(() => {
        setPlaces(places.filter((place) => place._id !== id));
      })
      .catch((err) => {
        console.error("Failed to delete place", err);
      });
  };

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
      <div className="mt-7">
        {places.length > 0 &&
          places.map((place) => (
            <div
              key={place._id} // Add a unique key prop here
              className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl gap-3 mb-2"
            >
              <Link
                to={"/account/places/" + place._id}
                className="flex flex-row w-full"
                onClick={() =>
                  console.log("Navigating to:", "/account/places/" + place._id)
                }
              >
                <div className="w-52 h-40 bg-gray-300 rounded-xl flex">
                  <PlaceImg place={place} />
                </div>

                <div className="flex flex-col w-full ml-4">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2 h-16 overflow-hidden text-ellipsis">
                    {place.description}
                  </p>
                </div>
              </Link>

              {/* Delete Button */}
              <button
                className="bg-red-500 text-white rounded-full py-1 px-3 mt-2 h-10"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the click from reaching the Link
                  handleDelete(place._id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      {action === "new" && <PlacesFormPage />}
    </div>
  );
};

export default PlacesPage;
