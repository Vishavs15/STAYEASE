import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";

const Account = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  // under stand work of this line
  if (subpage === undefined) {
    subpage = "account";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading Info... ";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  function linkclassNamees(type = null) {
    let classNamees = "inline-flex gap-1 py-2 px-6 rounded-full py-3 px-3 my-2"; // default classNamees
    // Add more classNamees if the 'type' matches the current 'subpage' or if no subpage is selected
    if (type === subpage || (subpage === undefined && type === "account")) {
      // if (type === subpage) {
      classNamees += " bg-primary text-white";
    } else {
      // Default non-active state classNamees
      classNamees += " border border-gray-300"; 
    }
    return classNamees;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <div className="w-full flex gap-4 justify-center text-center text-lg mt-12">
        <Link className={linkclassNamees("account")} to={"/account"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkclassNamees("bookings")} to={"/account/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
            />
          </svg>
          My Bookings
        </Link>
        <Link
          className={linkclassNamees("accommodation")}
          to={"/account/accommodation"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
          My Accommodation
        </Link>
      </div>
      {subpage === "account" && (
        <div className="text-center w-1/3 mx-auto mt-16">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary w-full">
            Logout
          </button>
        </div>
      )}

      {subpage === "accommodation" && <PlacesPage />}
    </>
  );
};

export default Account;
