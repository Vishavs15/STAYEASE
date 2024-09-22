import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="container flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
