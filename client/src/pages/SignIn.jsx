import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function registerUser(ev) {
    ev.preventDefault(); // this helps to prevent page reload
    try {
      if (!name || !email || !password) {
        alert("All fields are required!");
        return;
      }
      
      await axios.post("/signin", { // route updated to match backend
        name,
        email,
        password
      });
      
      alert('You successfully created your account');
    } catch (error) {
      console.error("Registration failed:", error); // log error in console for debugging
      alert('Registration failed, please try again later');
    }
  }

  return (
    <div className="grow flex flex-col items-center justify-center">
      <div className="-mt-12">
        <h1 className="text-5xl text-center">Create Account</h1>
        <div className="flex flex-col mt-2">
          <form className="max-w-md mx-auto mt-4" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            {/* <input
              type="role"
              placeholder="Host / Guest"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            /> */}
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="primary w-full">Create</button>
          </form>
        </div>
        <div className="flex gap-1 justify-center my-2">
          <p className="text-center">Already have an account?</p>
          <Link to={"/LogIn"}>
            <p className="underline underline-offset-1">LogIn</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
