import { CanvasImage } from "components/Editorial/interfaces";
import React, { FC, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

const Image: FC<CanvasImage> = ({ id, handleDelete }) => {
  const [previewImage, setPreviewImage] = useState(
    "https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg"
  );

  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <div className="handle p-3 h-full w-full cursor-move">
      <RiDeleteBin5Line
        className="text-2xl cursor-pointer z-50"
        onClick={() => handleDelete(id)}
      />

      <UploadIcon handleUpload={handleUpload} />

      <div className="w-6/12 mx-auto my-6 rounded-[18px] overflow-hidden">
        <img src={previewImage} alt="placeholder" className="w-full" />
      </div>
    </div>
  );
};

export default Image;

export interface UploadIconProps {
  handleUpload: (e: any) => void;
}

const UploadIcon: FC<UploadIconProps> = ({ handleUpload }) => {
  return (
    <div className="w-6 relative overflow-hidden !cursor-pointer">
      <FiUploadCloud className="text-2xl cursor-pointer" />
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="absolute top-0 -left-24 opacity-0"
      />
    </div>
  );
};
