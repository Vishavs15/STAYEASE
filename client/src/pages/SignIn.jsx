// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignIn = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [role, setRole] = useState(""); // New role state (Host / Guest)
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(""); // Error state for backend errors
//   const navigate = useNavigate(); // Initialize useNavigate

//   async function registerUser(ev) {
//     ev.preventDefault();
//     try {
//       // Validate fields
//       if (!name || !email || !mobile || !role || !password) {
//         alert("All fields are required!");
//         return;
//       }

//       // Mobile number validation (simple 10-digit validation)
//       const mobileRegex = /^[0-9]{10}$/;
//       if (!mobileRegex.test(mobile)) {
//         alert("Please enter a valid 10-digit mobile number.");
//         return;
//       }

//       // Password validation (at least 6 characters)
//       const passwordRegex =
//         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//       if (!passwordRegex.test(password)) {
//         alert(
//           "Password must be at least 6 characters long and include letters, numbers, and special characters."
//         );
//         return;
//       }

//       // Make API call to register the user
//       const response = await axios.post("/signin", {
//         name,
//         email,
//         mobile,
//         role,
//         password,
//       });

//       alert("You successfully created your account");

//       // Redirect to the homepage after successful registration
//       navigate("/"); // Redirect to the homepage (http://localhost:5173/)
//     } catch (error) {
//       console.error("Registration failed:", error);
//       if (error.response && error.response.data && error.response.data.error) {
//         setErrorMessage(error.response.data.error); // Set error message from backend
//       } else {
//         setErrorMessage("Registration failed, please try again later");
//       }
//     }
//   }

//   return (
//     <div className="grow flex flex-col items-center justify-center">
//       <div className="-mt-12">
//         <h1 className="text-5xl text-center">Create Account</h1>
//         <div className="flex flex-col mt-2">
//           <form className="max-w-md mx-auto mt-4" onSubmit={registerUser}>
//             <input
//               type="text"
//               placeholder="User Name"
//               value={name}
//               onChange={(ev) => setName(ev.target.value)}
//               className="p-2 mb-4 border rounded-md"
//             />

//             <input
//               type="email"
//               placeholder="your@gmail.com"
//               value={email}
//               onChange={(ev) => setEmail(ev.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               value={mobile}
//               onChange={(ev) => setMobile(ev.target.value)}
//             />
//             <select
//               value={role}
//               onChange={(ev) => setRole(ev.target.value)}
//               required
//             >
//               <option value="">Select Role</option>
//               <option value="Host">Host</option>
//               <option value="Guest">Guest</option>
//             </select>

//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(ev) => setPassword(ev.target.value)}
//             />
//             <button className="primary w-full">Create</button>
//           </form>
//           {/* Display error message if email or username is already taken */}
//           {errorMessage && (
//             <p className="text-red-500 text-center mt-2">{errorMessage}</p>
//           )}
//         </div>
//         <div className="flex gap-1 justify-center my-2">
//           <p className="text-center">Already have an account?</p>
//           <Link to={"/LogIn"}>
//             <p className="underline underline-offset-1">LogIn</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState(""); // New role state (Host / Guest)
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error state for backend errors
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Initialize useNavigate

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      // Validate fields
      if (!name || !email || !mobile || !role || !password) {
        alert("All fields are required!");
        return;
      }

      // Mobile number validation (simple 10-digit validation)
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      // Password validation (at least 6 characters)
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and include letters, numbers, and special characters.");
        return;
      }

      // Make API call to register the user
      const response = await axios.post("/signin", { 
        name, 
        email, 
        mobile, 
        role, 
        password 
      });
      
      alert('You successfully created your account');
      
      // Redirect to the homepage after successful registration
      navigate("/"); // Redirect to the homepage (http://localhost:5173/)
      setName("");
      setEmail("");
      setMobile("");
      setRole("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Set error message from backend
      } else {
        setErrorMessage('Registration failed, please try again later');
      }
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
              className="p-2 mb-4 border rounded-md"
            />
            <input
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="p-2 mb-4 border rounded-md"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(ev) => setMobile(ev.target.value)}
              className="p-2 mb-4 border rounded-md"
            />
            <select
              value={role}
              onChange={(ev) => setRole(ev.target.value)}
              className="p-2 mb-4 border"
              required
            >
              <option value="">Select Role</option>
              <option value="Host">Host</option>
              <option value="Guest">Guest</option>
            </select>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Enter Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="p-2 mb-4 border rounded-md w-full relative"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                className="absolute right-3 top-4 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button className="primary w-full">Create</button>
          </form>
          {/* Display error message if email or username is already taken */}
          {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
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
