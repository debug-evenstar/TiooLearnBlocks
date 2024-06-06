import { CanvasMedia } from "components/Editorial/interfaces";
import React, { FC, useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { toggleWrapperSize } from "../Image/handler";

const Video: FC<CanvasMedia> = ({ id, manager, viewBoxRef, data }) => {
  const [previewVideo, setPreviewVideo] = useState("");

  const handleUpload = (e: any) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const videoUrl = URL.createObjectURL(selectedFile);
      setPreviewVideo(videoUrl);
    }
  };

  useEffect(() => {
    manager.canvasManager.canvas.functions["toggleVideoSize"] = (
      style: string = "",
      styleType: string
    ) => {
      const element = viewBoxRef.current;
      if (!element) return;
      toggleWrapperSize(element, style, styleType);
    };
  }, [manager, viewBoxRef]);

  return (
    <div className="flex flex-col h-full w-full p-3 cursor-move justify-center items-center">
      <UploadIcon handleUpload={handleUpload} />

      {previewVideo.length > 1 && (
        <div className="w-full mx-auto rounded-lg overflow-hidden h-full absolute">
          <video className="w-full h-full" src={previewVideo} autoPlay loop />
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
      <div className="flex flex-col justify-center items-center h-full">
        <FiUploadCloud className="text-2xl cursor-pointer" />
        <input
          type="file"
          accept="video/*"
          onChange={handleUpload}
          className="w-full h-full absolute top-0 -left-24 opacity-0 z-50"
        />
        <p className="text-center text-[12px] mt-3">
          Upload from your computer
        </p>
        <p className="text-center text-[13px] text-[#4f46e5] font-bold">
          Choose file
        </p>
      </div>
    </div>
  );
};
