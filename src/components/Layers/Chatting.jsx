import React, { useEffect, useRef, useState } from "react";
import a1 from "../../../public/n1.jpg";
import { GalleryIcon } from "../../SVG Icons/GalleryIcon";
import { SmileIcon } from "../../SVG Icons/SmileIcon";
import { useSelector } from "react-redux";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import EmojiPicker from "emoji-picker-react";
import {
  getDownloadURL,
  getStorage,
  ref as Ref,
  uploadBytesResumable,
} from "firebase/storage";

const Chatting = () => {
  const activeFriend = useSelector((single) => single.Active.active);

  const user = useSelector((user) => user.login.logIn);

  const [sms, setSms] = useState("");
  const [allSms, setAllSms] = useState([]);

  const db = getDatabase();
  const choseFile = useRef();
  const scrollRef = useRef();
  const storage = getStorage();

  const [emoji, setEmoji] = useState(false);
  const [audioSms, setAudioSms] = useState(false);

  const handleSend = () => {
    if (activeFriend?.status === "single") {
      set(push(ref(db, "messages")), {
        sendarName: user.displayName,
        sendarId: user.uid,
        receiverName: activeFriend.name,
        receiverId: activeFriend.id,
        message: sms,
        date: `${new Date().getFullYear()}- ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()}  , ${new Date().getHours()} : ${new Date().getMinutes()}`,
      }).then(() => {
        setSms("");
        setEmoji(false);
      });
    }
  };

  //                          get sms

  useEffect(() => {
    onValue(ref(db, "messages/"), (snapshot) => {
      let signleSmsArr = [];
      snapshot.forEach((item) => {
        if (
          (user.uid === item.val().sendarId &&
            item.val().receiverId === activeFriend.id) ||
          (user.uid === item.val().receiverId &&
            item.val().sendarId === activeFriend.id)
        ) {
          signleSmsArr.push(item.val());
        }
      });
      setAllSms(signleSmsArr);
    });
  }, [activeFriend?.id]);

  //                send Emoji

  const handleEmojiSend = ({ emoji }) => {
    // console.log(emoji);
    setSms(sms + emoji);
  };

  //                                  send image

  const handleImageSend = (e) => {
    const imgSend = e.target.files[0];
    const storageRef = Ref(
      storage,
      `${user.displayName} = sendImageSms/ ${imgSend}`
    );

    const uploadTask = uploadBytesResumable(storageRef, imgSend);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "messages")), {
            sendarName: user.displayName,
            sendarId: user.uid,
            receiverName: activeFriend.name,
            receiverId: activeFriend.id,
            message: sms,
            image: downloadURL,
            date: `${new Date().getFullYear()}- ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()}  , ${new Date().getHours()} : ${new Date().getMinutes()}`,
          }).then(() => {
            setSms("");
            setEmoji(false);
          });
        });
      }
    );
  };

  //                        Scroll auto

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allSms]);

  //                          enter to send sms

  const handleSendButton = (e) => {
    if (e.key == "Enter") {
      handleSend();
    }
  };

  //                                Voice sms send

  // const voiceReocrdSend = (e) => {
  //   console.log('ok');
    
  // }


  return (
    <div className="m-3 bg-white rounded-md ">
      <div>
        <div className="flex items-center gap-x-2 mb-5 bg-[#F9F9F9] py-3 px-10">
          <div className="flex items-center justify-center w-[82px] h-[82px] bg-gray-700 rounded-full">
            <img
              className="object-cover w-full h-full rounded-full"
              src={activeFriend.profile || a1}
              alt=""
            />
          </div>
          <h2 className="text-xl text-black ">
            {/* {activeFriend.name || "please select your friend for chatting"} */}
            {activeFriend?.name || "please select your friend for chatting"}
          </h2>
        </div>

        <div className="w-full overflow-y-auto h-[360px]">
          {activeFriend?.status === "single"
            ? allSms.map((item, i) => (
                <div key={i} ref={scrollRef}>
                  {item.sendarId === user.uid ? (
                    <div className="flex flex-col items-end w-1/2 ml-auto ">
                      {item.image ? (
                        <div className="flex flex-col items-end mb-2">
                          <img src={item.image} />
                          <span className="text-zinc-500">{item.date}</span>
                        </div>
                      ) : (
                        <>
                          <p className="inline-block p-3 mb-2 text-white bg-blue-600 rounded-t-md rounded-l-md ">
                            {item.message}
                          </p>
                          <span className="text-zinc-500">{item.date}</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-start w-1/2 mr-auto ">
                      {item.image ? (
                        <img src={item.image} />
                      ) : (
                        <>
                          <p className="inline-block p-3 mb-2 text-white bg-gray-400 rounded-t-md rounded-r-md">
                            {item.message}
                          </p>
                          <span className="text-zinc-500">{item.date}</span>
                        </>
                      )}
                      {/* <p className="inline-block p-3 mb-2 bg-gray-400 rounded-t-md rounded-r-md ">
                      {item.message}
                      </p> */}
                    </div>
                  )}
                </div>
              ))
            : ""}
        </div>

        <div className="mx-auto w-[532px] bg-white flex items-center justify-between rounded-md px-3">
          <div className="flex items-center gap-x-3">
            <div className="relative cursor-pointer">
              {emoji && (
                <div className="absolute -left-5 bottom-10">
                  <EmojiPicker onEmojiClick={handleEmojiSend} />
                </div>
              )}
              <div onClick={() => setEmoji(!emoji)}>
                <SmileIcon />
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => choseFile.current.click()}
            >
              <GalleryIcon />
            </div>
            <input
              onChange={handleImageSend}
              hidden
              ref={choseFile}
              type="file"
            />

            {/* <div
              className="text-gray-400 cursor-pointer"
              onClick={voiceReocrdSend}
            >
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                downloadOnSavePress={true}
                downloadFileExtension="webm"
              />
            </div> */}
          </div>

          <input
            onChange={(e) => setSms(e.target.value)}
            className="w-full px-5 py-2 outline-none "
            type="text"
            placeholder="send your message"
            value={sms}
            onKeyUp={handleSendButton}
          />

          <button
            onClick={handleSend}
            className="text-center  bg-[#4A81D3] text-white text-base w-[98px] py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
