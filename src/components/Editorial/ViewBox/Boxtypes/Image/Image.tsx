import { CanvasImage } from "components/Editorial/interfaces";
import React, { FC, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Image: FC<CanvasImage> = ({ id }) => {
  const [previewImage, setPreviewImage] = useState("");

  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-3 cursor-move justify-center items-center">
      <UploadIcon handleUpload={handleUpload} />

      {previewImage.length > 1 && (
        <div className="w-6/12 mx-auto my-6 rounded-lg overflow-hidden">
          <img
            src={previewImage}
            alt="placeholder"
            className="w-full"
            draggable={false}
          />
        </div>
      )}
    </div>
  );
};

export default Image;

export interface UploadIconProps {
  handleUpload: (e: any) => void;
}

const UploadIcon: FC<UploadIconProps> = ({ handleUpload }) => {
  return (
    <div className="w-fit relative overflow-hidden cursor-pointer bg-[red]">
      <div className="w-6 justify-self-center align-self-center">
        <FiUploadCloud className="text-2xl cursor-pointer" />
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="absolute top-0 -left-24 opacity-0"
        />
      </div>
      <p className="text-center">Drag or upload from you computer</p>
      <p className="text-center text-[4f46e5]">Choose file</p>
    </div>
  );
};
