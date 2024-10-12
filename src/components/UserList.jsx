import React, { useEffect, useState } from "react";
import ListOfFrnd from "./Layers/ListOfFrnd";

const UserList = () => {

  

  return (
    <div className="pt-4">
      <h1 className="font-medium text-base mb-5">All Users</h1>
      <ListOfFrnd />
    </div>
  );
};

export default UserList;
