import React from "react";
import { Link } from "react-router-dom";

const PlacesPage = () => {
  return (
    <div>
      <div className="mt-7 flex justify-center">

        <Link
          to={"/account/places/new"}
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
    
    </div>
  );
};

export default PlacesPage;
