import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import BookingsPage from "./BookingsPage";  // Assuming BookingsPage exists as you shared previously
import PlacesPage from "./ListOfPlaces";    // Assuming PlacesPage lists the user's accommodations

const Profile = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "account";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");  // Redirect to home after logging out
    setUser(null);
  }

  useEffect(() => {
    // Fetch user profile or bookings here if needed
    // Example: axios.get('/api/user-profile')
  }, []);

  if (!ready) {
    return "Loading Info... ";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <AccountNav />
      <div className="container mx-auto mt-12">
        {/* Profile Info Section */}
        {subpage === "account" && (
          <div className="text-center w-2/3 mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Profile Information</h2>
            <p>Logged in as <strong>{user.name}</strong> ({user.email})</p>
            <button onClick={logout} className="primary w-full mt-4">Logout</button>
          </div>
        )}

        {/* Bookings Section */}
        {subpage === "bookings" && (
          <div>
            <h2 className="text-center text-3xl font-semibold mb-6">My Bookings</h2>
            <BookingsPage />  {/* Assuming BookingsPage handles displaying the bookings */}
          </div>
        )}

        {/* Accommodations Section */}
        {subpage === "accommodation" && (
          <div>
            <h2 className="text-center text-3xl font-semibold mb-6">My Accommodations</h2>
            <PlacesPage />  {/* Assuming PlacesPage displays the user's accommodations */}
          </div>
        )}

       
      </div>
    </>
  );
};

export default Profile;
