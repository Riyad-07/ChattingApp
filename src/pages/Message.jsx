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
      <div className="grid grid-cols-[2fr,6fr] px-3 gap-x-5">
        <div className="w-full overflow-y-auto h-[600px] bg-[#FBFBFB]">
          <Friends />
        </div>
        <div className="">
          <Chatting />
        </div>
      </div>
    </>
  );
};

export default Message;
