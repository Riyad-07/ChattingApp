import React, { useState } from "react";
import { CloseIcone } from "../../SVG Icons/CloseIcon";
import { Cropper } from "react-cropper";
import { BarLoader } from "react-spinners";

const ImageCropper = ({ setImage, image, cropperRef, getCropData, loading }) => {

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
      <div className="w-1/3 rounded-md bg-white p-4 relative ">
        <h4 className="text-base font-bold text-center">
          Uplod Your Profile Picture
        </h4>
        <div
          onClick={() => setImage()}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <CloseIcone />
        </div>
        <div className="w-20 h-20 overflow-hidden rounded-full img-preview">
          {/* <div className="box" style={{ width: "50%", float: "right" }}>
            <h1>Preview</h1>
            <div
              className="img-preview"
              style={{ width: "100%", float: "left", height: "300px" }}
            />
          </div> */}
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
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
          />
        </div>
        <button
          disabled={loading}
          onClick={getCropData}
          className="w-full font-bold text-white text-center bg-green-400 rounded-md mt-1 py-3"
        >
          {loading ? <BarLoader /> : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
