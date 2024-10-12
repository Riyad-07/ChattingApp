import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { CloseIcone } from "../../SVG Icons/CloseIcon";
import { UploadIcon } from "../../SVG Icons/UploadIcon";
import ImageCropper from "./ImageCropper";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import { logInUsers } from "../../Featchers/slice/userSlice";

const Modal = ({ setShow }) => {
  const user = useSelector((user) => user.login.logIn);
  const storage = getStorage();
  const storageRef = ref(storage, user.uid);
  const fileRef = useRef(null);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef();
  const auth = getAuth()
  const dispatch = useDispatch()
  let [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    setLoading(true)
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
            updateProfile(auth.currentUser, {
                photoURL: downloadURL
              }).then(()=>{
                dispatch(logInUsers({...user, photoURL:downloadURL})) 
                localStorage.setItem('user', JSON.stringify({...user, photoURL:downloadURL}) )               
              })
              setShow(false)
              setLoading(false)
        });
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#4c4343d6] flex items-center justify-center">
      <div className="w-1/3 rounded-md bg-white p-4 relative ">
        <h4 className="text-base font-bold text-center">
          Uplod Your Profile Picture
        </h4>
        <div
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <CloseIcone />
        </div>
        <div className="w-full h-[300px] p-2 rounded-md border border-gray-600 mt-5 cursor-pointer">
          <div
            onClick={() => fileRef.current.click()}
            className="w-full h-full rounded-md  bg-red-300 flex items-center justify-center"
          >
            <div>
              <div className="flex justify-center items-center">
                <UploadIcon />
              </div>
              <h3 className="text-base font-semibold text-center">
                Upload Your Profile Picture
              </h3>
              <input onChange={handleChange} type="file" ref={fileRef} hidden />
            </div>
          </div>
        </div>
        {image && (
          <ImageCropper
            setImage={setImage}
            cropperRef={cropperRef}
            image={image}
            getCropData={getCropData}
            loading = {loading}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
