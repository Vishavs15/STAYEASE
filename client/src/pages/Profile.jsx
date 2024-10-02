import React, { useContext, useState } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

const Profile = () => {
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

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <AccountNav />
      {subpage === "account" && (
        <div className="text-center w-1/3 mx-auto mt-16">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary w-full">
            Logout
          </button>
        </div>
      )}

      {subpage === "accommodation" &&( 
        <PlacesPage />
      )}
    </>
  );
};

export default Profile;
