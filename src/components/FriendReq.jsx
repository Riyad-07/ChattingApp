import React from "react";
import FriendReqList from "./Layers/FriendReqList";

const FriendReq = () => {
  return (
    <div>
        <h1 className='font-medium text-base mb-5'> Friend Requests</h1>
        <FriendReqList/>
        {/* <FriendReqList/> */}
    </div>
  );
};

export default FriendReq;
