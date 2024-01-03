import { CanvasImage } from "components/Editorial/interfaces";
import React, { FC, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

const Video: FC<CanvasImage> = ({ id }) => {
  const [previewVideo, setPreviewVideo] = useState("");

  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const videoUrl = URL.createObjectURL(selectedFile);
      setPreviewVideo(videoUrl);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-3 cursor-move justify-center items-center">
      <UploadIcon handleUpload={handleUpload} />

      {previewVideo.length > 1 && (
        <div className="w-6/12 mx-auto my-6 rounded-lg overflow-hidden">
          <video src={previewVideo} className="w-full" draggable={false} />
        </div>
      )}
    </div>
  );
};

export default Video;

export interface UploadIconProps {
  handleUpload: (e: any) => void;
}

const UploadIcon: FC<UploadIconProps> = ({ handleUpload }) => {
  return (
    <div className="w-fit relative overflow-hidden cursor-pointer">
      <div className="flex flex-col justify-center items-center">
        <FiUploadCloud className="text-2xl cursor-pointer" />
        <input
          type="file"
          accept="video/*"
          onChange={handleUpload}
          className="h-full w-full absolute top-0 -left-24 opacity-0"
        />
        <p className="text-center text-[13px] text-[#4f46e5] font-bold mt-3">
          Choose file
        </p>
      </div>
    </div>
  );
};
