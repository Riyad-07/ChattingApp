import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const RootLayOut = () => {
  return (
    <div className='relative h-screen bg-gradient-to-t from-[#E8E8E8] to-60%  to-[#4A81D3] from-60% '>
      
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 bg-white rounded-lg h-[700px]'>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  );
};

export default RootLayOut;
