import React from "react";
import UserList from "../components/UserList";
import FriendReq from "../components/FriendReq";
import Friends from "../components/Friends";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <div className="flex w-full gap-x-5">
        <div className="w-full overflow-y-auto h-screen bg-[#FBFBFB] border">
          <UserList />
        </div>
          <div className="w-full h-screen p-5 overflow-y-auto border">
            <FriendReq />
          </div>
          <div className="w-full h-screen p-5 overflow-y-auto border">
            <Friends />
          </div>
      </div>
    </>
  );
};

export default Home;
