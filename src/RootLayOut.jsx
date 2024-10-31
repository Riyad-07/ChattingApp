import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const RootLayOut = () => {
  return (
    <div className="">
      <div className="flex gap-x-5 ">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayOut;
