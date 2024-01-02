import { CanvasImage } from "components/Editorial/interfaces";
import React, { FC, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Video: FC<CanvasImage> = ({ id }) => {
  const [previewVideo, setPreviewVideo] = useState(
    "https://res.cloudinary.com/dic7regoe/image/upload/v1694805252/praxeum/noimage_cu02fq.jpg"
  );

  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const videoUrl = URL.createObjectURL(selectedFile);
      setPreviewVideo(videoUrl);
    }
  };

  return (
    <div className="handle p-3 h-full w-full cursor-move flex flex-col justify-center align-middle">
      <div className="w-6/12 mx-auto my-6 rounded-[18px] overflow-hidden">
        <video src={previewVideo} className="w-full" draggable={false} />
      </div>
    </div>
  );
};

export default Video;

export interface UploadIconProps {
  handleUpload: (e: any) => void;
}

const UploadIcon: FC<UploadIconProps> = ({ handleUpload }) => {
  return (
    <div className="w-6 relative overflow-hidden !cursor-pointer">
      <FiUploadCloud className="text-2xl cursor-pointer" />
      <input
        type="file"
        accept="video/*"
        onChange={handleUpload}
        className="absolute top-0 -left-24 opacity-0"
      />
    </div>
  );
};
