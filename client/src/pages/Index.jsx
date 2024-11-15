import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const Index = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/places")
      .then((response) => { setPlaces(response.data);     })
      .catch((error) => {
        console.error("Error fetching places:", error);
      });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-4">
      {places.length > 0 && places.map((place) => (
          <Link to={'/place/'+place._id} key={place._id}>
            <div className="bg-gray-500 rounded-2xl flex">
              {place.photos?.[0] && (
                <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:3000/uploads/" + place.photos[0]} alt=""/>
              )}
            </div>
              <h2 className="text-md font-semibold truncate mt-2"> {place.title} </h2>
              <h3 className="text-gray-300"> {place.address} </h3>
              <div className="mt-2">
                <span className="font-bold">₹{place.price}</span> night
              </div>
          </Link>
        ))}
    </div>
  );
};

export default Index;