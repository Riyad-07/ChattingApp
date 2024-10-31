import React, { useEffect, useState } from "react";
import ListOfFrnd from "./Layers/ListOfFrnd";

const UserList = () => {

  

  return (
    <div className="h-screen pt-4 overflow-y-auto shadow-md">
      <h1 className="mb-5 text-3xl font-semibold text-[#494949]">All Users</h1>
      <ListOfFrnd />
    </div>
  );
};

export default UserList;
