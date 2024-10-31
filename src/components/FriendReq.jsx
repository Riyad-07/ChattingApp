import React from "react";
import FriendReqList from "./Layers/FriendReqList";

const FriendReq = () => {
  return (
    <div className="shadow-md">
        <h1 className='mb-5 text-3xl font-semibold text-[#494949]'> Friend Requests</h1>
        <FriendReqList/>
    </div>
  );
};

export default FriendReq;
