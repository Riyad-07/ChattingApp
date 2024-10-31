import React, { useEffect, useState } from "react";
import a1 from "/public/n1.jpg";
import { UserIcon } from "../../SVG Icons/UserIcon";

import { getDownloadURL, getStorage, ref as Ref } from "firebase/storage";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";

const ListOfFrnd = () => {
  const storage = getStorage();
  // const storageRef = ref(storage, "images/rivers.jpg");
  const [users, setUsers] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);
  const [cancelReqList, setCancelReqList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [unFriends, setUnFriends] = useState([]);

  const user = useSelector((user) => user.login.logIn);

  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const users = [];
      snapshot.forEach((UserList) => {
        if (user.uid !== UserList.key) {
          getDownloadURL(Ref(storage, UserList.key))
            .then((downloadURL) => {
              users.push({
                ...UserList.val(),
                id: UserList.key,
                photoURL: downloadURL,
              });
            })
            .catch((error) => {
              users.push({
                ...UserList.val(),
                id: UserList.key,
                photoURL: null,
              });
            })
            .then(() => {
              setUsers([...users]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  //                                 Send Friend Request

  const handleFriendRequest = (data) => {
    set(push(ref(db, "friendRequest")), {
      sendarName: user.displayName,
      sendarId: user.uid,
      senderPfofile: user.photoURL ?? a1,
      receiverName: data.username,
      receiverId: data.id,
      receiverProfile: data.photoURL ?? a1,
    });
  };

  //                                  Show Friend Request & Cancel Request

  useEffect(() => {
    const starCountRef = ref(db, "friendRequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      let cancelArr = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverId + item.val().sendarId);
        cancelArr.push({ ...item.val(), id: item.key });
      });
      setFriendReqList(reqArr);
      setCancelReqList(cancelArr);
    });
  }, [db]);

  //                              Friends

  useEffect(() => {
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      let frndArr = [];
      let unfriendArr = []
      snapshot.forEach((item) => {
        frndArr.push(item.val().receiverId + item.val().sendarId);
        unfriendArr.push({ ...item.val(), id: item.key });
      });
      setFriends(frndArr);
      setUnFriends(unfriendArr);
    });
  }, [db]);

  //                                  cancel Friend Request



  const handleCancelReq = (itemId) => {    
    const reqCancel = cancelReqList.find(
      (req) => req.receiverId == itemId && req.sendarId == user.uid
    );
    if (reqCancel) {
      remove(ref(db, "friendRequest/" + reqCancel.id));
    }
  };

  
  //                                            Unfriend

  const handleUnfriend = (data) => {
    unFriends.map(item=>{
      if(data.id === item.sendarId || data.id === item.receiverId){
        remove(ref(db, 'friends/' + item.id))
      }  
    })    
  }

  

  return (
    <>
      {users.map((item) => (
        <div className="flex items-center justify-between p-2 mt-4 transition-all duration-500 rounded-md cursor-pointer hover:bg-red-300">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center justify-center w-[82px] h-[82px] rounded-full">
              <img
                className="object-cover w-full h-full rounded-full"
                src={item.photoURL || a1}
                alt=""
              />
            </div>
            <h2 className="text-base font-semibold ">{item.username}</h2>
          </div>
          {friendReqList.includes(item.id + user.uid) ||
          friendReqList.includes(user.uid + item.id) ? (
            <button
              onClick={() => handleCancelReq(item.id)}
              className="p-2 text-white bg-red-500 rounded-md"
            >
              Cancel Request
            </button>
          ) : (
            <>
              {friends.includes(item.id + user.uid) ||
              friends.includes(user.uid + item.id) ? (
                <>
                  <div className="p-2 text-base text-black bg-green-300 rounded-md">
                    Friend
                  </div>
                  <button onClick={()=>handleUnfriend(item)} className="p-2 text-base text-white bg-red-500 rounded-md">Unfriend</button>
                </>
              ) : (
                <div
                  onClick={() => handleFriendRequest(item)}
                  className="cursor-pointer text-[#292D32]"
                >
                  <UserIcon />
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default ListOfFrnd;
