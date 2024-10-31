import React, { useEffect, useState } from "react";
import a1 from "/public/n1.jpg";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const FriendReqList = () => {
  const user = useSelector((user) => user.login.logIn);
  const [friendReqList, setFriendReqList] = useState([]);
  const db = getDatabase();


  //                          Show Request

  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      const reqArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().receiverId) {
          reqArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendReqList(reqArr);
    });
  }, [db, user.uid]);

  //                      Accept Request

  const handleAccept = (data) => {
    set(push(ref(db, "friends/")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendRequest/" + data.id));
    });
  };

  //                      Reject Request

  const handleReject = (data) => {
    remove(ref(db, "friendRequest/" + data.id));
  };

  return (
    <>
      {friendReqList?.map((item) => (
        <div
          className="flex items-center justify-between p-2 mt-4 transition-all duration-500 rounded-md cursor-pointer hover:bg-red-300"
          key={item.key}
        >
          <div className="flex items-center gap-x-2">
            <div className="h-[64px] w-[64px] bg-gray-700 rounded-full flex items-center justify-center">
              <img
                className="object-cover w-full h-full rounded-full"
                src={item.senderPfofile || a1}
                alt=""
              />
            </div>
            <h2 className="text-base font-semibold text-black">
              {item.sendarName}
            </h2>
          </div>
          <div className="flex items-center gap-x-3">
            <button
              onClick={() => handleAccept(item)}
              className="w-[87px] text-center text-white font-medium bg-[#4A81D3] rounded-md py-1"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(item)}
              className="w-[87px] text-center text-white font-medium bg-[#D34A4A] rounded-md py-1"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendReqList;
