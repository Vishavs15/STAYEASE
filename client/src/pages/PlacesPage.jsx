import { Link, useParams } from "react-router-dom";
import PlacesFormPage from "./PlacesFormPage";
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();

  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  {
    /* =================================================================================================================== */
  }

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
        {places.length > 0 && places.map((place) => (
            <Link to={'/account/places/'+place._id} className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl gap-3 mb-2">
              <div className="min-w-32 min-h-32 bg-gray-300 rounded-xl grow shirnk-0 flex"> 
                {place.photos.length > 0 && (
                  <img src={'http://localhost:3000/uploads/'+place.photos[0]} alt="" />
                )}
              </div>

              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
              
            </Link>
          ))}
      </div>

      {action === "new" && <PlacesFormPage />}
    </div>
  );
};

export default PlacesPage;
