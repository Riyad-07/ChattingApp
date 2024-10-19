import React from "react";
import FriendReqList from "./Layers/FriendReqList";

const FriendReq = () => {
  return (
    <div>
        <h1 className='mb-5 text-base font-medium'> Friend Requests</h1>
        <FriendReqList/>
    </div>
  );
};

export default FriendReq;
