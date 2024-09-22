import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Navbar = () => {
  const {user} = useContext(UserContext)
  return (
    <>
      <header className="flex justify-between py-6">

        <Link to={"/"} className="flex gap-2 items-center">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg> */} 
          <span className="font-bold text-xl">STAYEASE</span>
        </Link>
        <div className="flex border border-gray-300 p-2 px-3 rounded-full gap-4 shadow-sm shadow-gray-50">
          <div className="flex gap-3 items-center">
            <div className="text-base">Anywhere</div>
            <div className="border border-l border-gray-300 h-5"></div>
            <div className="text-base">Any week</div>
            <div className="border border-l border-gray-300 h-5"></div>
            <div className="text-base opacity-40">Add guest</div>
          </div>
          <button>
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-9 bg-primary text-white rounded-full py-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex border border-gray-300 px-4 rounded-full gap-2 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <Link to={user?"/account":"/logIn"}>
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
            {!!user && (
              <div className="px-1">
                {user.name}
              </div>
            )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
