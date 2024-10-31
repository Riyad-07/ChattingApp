import React, { useState } from "react";
import n1 from "../../public/n1.jpg";
import { MessageIcon } from "../SVG Icons/MessageIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logOutUsers } from "../Featchers/slice/userSlice";
import { CameraIcon } from "../SVG Icons/CameraIcon";
import { createPortal } from "react-dom";
import Modal from "./Layers/Modal";
import { LogOUtIcon } from "../SVG Icons/LogOutIcon";
import { HomeIcon } from "../SVG Icons/HomeIcon";

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
    <nav className="flex flex-col items-center justify-between bg-[#5E3493] py-2 px-7 w-[166px]">
      <div className="flex flex-col items-center gap-y-4">
        <div className="relative flex  items-center justify-center h-[109px] bg-red-300 rounded-full w-[109px]">
          <img
            className="object-cover w-full h-full rounded-full"
            src={user.photoURL || n1}
            alt="logo.jpg"
          />
          <div
            onClick={() => setShow(true)}
            className="absolute flex items-center justify-center w-6 h-6 text-white rounded-full cursor-pointer "
          >
            <CameraIcon />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-white">{user.displayName}</h2>
      </div>

      <div className="flex flex-col items-center gap-y-[70px]">
        <Link
          to="/"
          className={`relative text-white`}
        >
          <HomeIcon />
          {
          location.pathname==='/'? (<div className="absolute top-0 w-2 h-full bg-white -right-14"></div>):(<div className=""></div>)
        }
        </Link>
        
        <Link
          to="/message"
          className={`relative text-white`}
        >
          <MessageIcon />
          {
          location.pathname==='/message'? (<div className="absolute top-0 w-2 h-full bg-white -right-14"></div>):(<div className=""></div>)
        }
        </Link>
      </div>

      <button
        onClick={handleLogOut}
        className="flex items-center gap-2 text-xl font-semibold text-white"
      >
        <LogOUtIcon />
        Log Out
      </button>

      {show && createPortal(<Modal setShow={setShow} />, document.body)}
    </nav>
  );
};

export default Navbar;
