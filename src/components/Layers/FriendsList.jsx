import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getDatabase, onValue, ref } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeUser } from "../../Featchers/slice/Active";

const FriendsList = () => {
  const user = useSelector((user) => user.login.logIn);
  const activeFriend = useSelector((single) => single.Active.active);
  const [friendList, setFriendList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid == item.val().sendarId ||
          user.uid == item.val().receiverId
        ) {
          friendArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(friendArr);
    });
  }, [db, user.uid]);

  //                                    SmS

  const handleSingleChat = (data) => {
    if (user.uid === data.receiverId) {
      dispatch(
        activeUser({
          status: "single",
          id: data.sendarId,
          name: data.sendarName,
          profile: data.senderProfile,
        })
      );
      localStorage.setItem(
        "active",
        JSON.stringify({
          status: "single",
          id: data.sendarId,
          name: data.senderName,
          profile: data.senderProfile,
        })
      );
    } else {
      dispatch(
        activeUser({
          status: "single",
          id: data.receiverId,
          name: data.receiverName,
          profile: data.receiverProfile,
        })
      );
    }
    localStorage.setItem(
      "active",
      JSON.stringify({
        status: "single",
        id: data.receiverId,
        name: data.receiverName,
        profile: data.receiverProfile,
      })
    );
  };

  return (
    <>
      {friendList?.map((item) => (
        <div
          onClick={() => handleSingleChat(item)}
          className={` ${
            item?.receiverId === activeFriend?.id
              ? "bg-red-300 rounded-md"
              : item?.sendarId === activeFriend?.id && "bg-red-300 rounded-md"
          }`}
        >
          <div
            className={`flex items-center justify-between mt-4 hover:bg-red-300 rounded-md cursor-pointer p-2 transition-all duration-500`}
          >
            <div className="flex items-center gap-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={
                    user.uid === item.receiverId
                      ? item.senderPfofile
                      : item.receiverProfile
                  }
                  alt=""
                />
              </div>
              <h2 className="text-base font-semibold ">
                {user.uid == item.sendarId
                  ? item.receiverName
                  : item.sendarName}
              </h2>
            </div>

            {location.pathname === "/" && (
              <button
                onClick={() => navigate("/message")}
                className="w-[87px] text-center text-white font-medium bg-[#4A81D3] rounded-md py-1"
              >
                Message
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendsList;
