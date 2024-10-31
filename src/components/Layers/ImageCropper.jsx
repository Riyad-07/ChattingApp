import React, { useState } from "react";
import { CloseIcone } from "../../SVG Icons/CloseIcon";
import { Cropper } from "react-cropper";
import { BarLoader } from "react-spinners";

const ImageCropper = ({ setImage, image, cropperRef, getCropData, loading }) => {

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen">
      <div className="relative w-1/3 p-4 bg-white rounded-md ">
        <h4 className="text-base font-bold text-center">
          Uplod Your Profile Picture
        </h4>
        <div
          onClick={() => setImage()}
          className="absolute cursor-pointer top-2 right-2"
        >
          <CloseIcone />
        </div>
        <div className="w-20 h-20 overflow-hidden rounded-full img-preview">
        </div>
        <div className="mt-5">
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            guides={true}
          />
        </div>
        <button
          disabled={loading}
          onClick={getCropData}
          className="w-full py-3 mt-1 font-bold text-center text-white bg-green-400 rounded-md"
        >
          {loading ? <BarLoader /> : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
