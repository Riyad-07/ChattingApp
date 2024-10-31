import React from "react";
import Friends from "../components/Friends";
import Chatting from "../components/Layers/Chatting";
import { Helmet } from "react-helmet";

const Message = () => {
  return (
    <>
      <Helmet>
        <title>Message</title>
      </Helmet>
      <div className="flex w-full">
        <div className="w-1/2 overflow-y-auto h-screen bg-[#F9F9F9]">
          <Friends />
        </div>
        <div className="w-full h-screen overflow-y-auto ">
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Message;
