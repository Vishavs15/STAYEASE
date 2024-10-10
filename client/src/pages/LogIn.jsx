import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../components/UserContext';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/"); // New state for redirection path
  const { setUser } = useContext(UserContext);

  async function LogInHandler(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data); 
      alert("Login successful");

      // Check if the email is for admin
      if (email === "admin2024@gmail.com") {
        setRedirectPath("/admin");
      } else {
        setRedirectPath("/"); // Redirect to homepage for regular users
      }
      setRedirect(true);
    } catch (e) {
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to={redirectPath} />; // Use the redirect path
  }

  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="-mt-12">
        <h1 className="text-5xl text-center">Login</h1>
        <div className="flex flex-col mt-2">
          <form className="max-w-md mx-auto" onSubmit={LogInHandler}>
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="primary w-full">Login</button>
            <div className="flex gap-1 justify-center my-2">
              <p className="text-center">Don’t have an account yet?</p>
              <Link to="/SignIn">
                <p className="underline underline-offset-1">Create One</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
