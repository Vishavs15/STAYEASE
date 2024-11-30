import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext); // Access the user context
  // const [menuOpen, setMenuOpen] = useState(false); // State to manage hamburger menu visibility
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate(); // To programmatically navigate routes

  // Toggle the hamburger menu
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle navigation for each menu item
  const handleNavigation = (route) => {
    navigate(route); // Navigate to the clicked route
    setMenuOpen(false); // Close the menu after selection
  };

  return (
    <header className="bg-white shadow-md py-6 px-8">
      <div className="flex justify-between items-center">
        {/* Logo Section */}
        <Link
          to={"/"}
          className="flex items-center gap-2 font-bold text-2xl text-primary hover:text-accent transition-all"
        >
          <span className="text-xl sm:text-2xl text-primary">STAYEASE</span>
        </Link>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu */}
          <div
            className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-all"
            onMouseEnter={() => setMenuOpen(true)} // Open menu on hover
            onMouseLeave={() => setMenuOpen(false)} // Close menu when hover ends
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            {/* Dropdown Menu for Hamburger */}
            {menuOpen && (
              <div className="absolute top-10 w-48 bg-white text-center shadow-lg rounded-lg p-4 z-10">
                <ul>
                  <li
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleNavigation("/account")}
                  >
                    Profile
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleNavigation("/account/bookings")}
                  >
                    Bookings
                  </li>
                  <li
                    className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleNavigation("/account/places")}
                  >
                    Accommodation
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Account or Login Section */}
          <Link
            to={user ? "/account" : "/logIn"}
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            {user && (
              <span className="ml-2 text-gray-800 text-sm">{user.name}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
