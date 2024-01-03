import { CanvasImage } from "components/Editorial/interfaces";
import React, { FC, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Image: FC<CanvasImage> = ({ id }) => {
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    handleUpload(files);
  };

  const handleUpload = (files: any) => {
    const file = files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full p-3 cursor-move justify-center items-center">
      <UploadIcon handleChange={handleChange} handleDrop={handleDrop} />

      {previewImage.length > 1 && (
        <div className="w-full mx-auto my-6 rounded-lg overflow-hidden h-full absolute ">
          <img
            src={previewImage}
            alt="placeholder"
            className="w-full h-full"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default Image;

interface UploadIconProps {
  handleChange: (e: any) => void;
  handleDrop: (e: any) => void;
}

const UploadIcon: FC<UploadIconProps> = ({ handleChange, handleDrop }) => {
  const handleDragOver = (e: any) => {
    e.preventDefault();
    // Set the drop effect and effect allowed properties
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="w-fit relative overflow-hidden cursor-pointer dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <FiUploadCloud className="text-2xl cursor-pointer" />
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full h-full absolute top-0 -left-24 opacity-0 z-50"
        />
        <p className="text-center text-[12px] mt-3">
          Drag or upload from your computer
        </p>
        <p className="text-center text-[13px] text-[#4f46e5] font-bold">
          Choose file
        </p>
      </div>
    </div>
  );
};
