import React, { useState } from "react";
import n1 from "../../public/n1.jpg";
import { FriendIcon } from "../SVG Icons/Friend";
import { MessageIcon } from "../SVG Icons/MessageIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logOutUsers } from "../Featchers/slice/userSlice";
import { CameraIcon } from "../SVG Icons/CameraIcon";
import { createPortal } from "react-dom";
import Modal from "./Layers/Modal";

const Navbar = () => {
  
  const user = useSelector((user) => user.login.logIn);
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let [show, setShow] = useState(false);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/sign-in");
        localStorage.removeItem("user");
        dispatch(logOutUsers());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="flex items-center justify-around bg-[#232323] py-2">
      <div className="flex gap-x-3 items-center">
        <div className="h-10 w-10 rounded-full bg-red-300 flex justify-center items-center relative">
          <img
            className="h-full w-full object-cover rounded-full"
            src={user.photoURL || n1}
            alt="logo.jpg"
          />
          <div
            onClick={() => setShow(true)}
            className="absolute right-0 bottom-0 rounded-full flex justify-center items-center h-4 w-4 bg-white cursor-pointer"
          >
            <CameraIcon />
          </div>
        </div>
        <h2 className="font-semibold text-white text-xl">{user.displayName}</h2>
      </div>

      <div className="flex items-center gap-x-3">
        <Link
          to="/"
          className={` ${
            location.pathname === "/"
              ? "bg-[#6CD0FB] text-white"
              : "bg-white text-[#292D32]"
          } h-10 w-10 rounded-full  flex items-center justify-center`}
        >
          <FriendIcon />
        </Link>
        <Link
          to="/message"
          className={` ${
            location.pathname === "/message"
              ? "bg-[#6CD0FB] text-white"
              : "bg-white text-[#292D32]"
          } h-10 w-10 rounded-full  flex items-center justify-center`}
        >
          <MessageIcon />
        </Link>
      </div>

      <button
        onClick={handleLogOut}
        className="bg-[#6CD0FB]  text-white text-xl py-2 w-[100px] text-center rounded-md"
      >
        Log Out
      </button>

      { show && createPortal(
        <Modal setShow={setShow} />
        , document.body
      )}
    </nav>
  );
};

export default Navbar;
