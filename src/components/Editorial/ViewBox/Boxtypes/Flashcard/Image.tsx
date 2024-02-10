import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import React, { FC, useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { toggleWrapperSize, uploadFile } from "../Image/handler";
import { setFlashCardComponentData } from "./handlers/dataHandler";

interface Props {
  id: string;
  manager: EditorialManagerInterface;
  viewBoxRef: any;
  image: any;
}

const Image: FC<Props> = ({ id, manager, viewBoxRef, image }) => {
  const [previewImage, setPreviewImage] = useState(image);
  const [overlayActive, setOverlayActive] = useState(false);
  const [data, setData] = useState<any>();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const cards =
      manager.canvasManager.canvas.functions.getComponentData(id).cards;
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      //const imageUrl = URL.createObjectURL(selectedFile);
      //setPreviewImage(imageUrl);
      const url = await uploadFile(473, selectedFile);
      setPreviewImage(url);
      manager.canvasManager.canvas.functions.updateActiveComponentData(
        setFlashCardComponentData([...cards, { url, alternatives: [] }])
      );
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const files: any = Array.from(e.dataTransfer.files);
    handleUpload(files);
  };

  const handleUpload = async (files: FileList) => {
    const cards =
      manager.canvasManager.canvas.functions.getComponentData(id).cards;
    const file = files[0];
    if (file) {
      const url = await uploadFile(473, file);
      setPreviewImage(url);
      manager.canvasManager.canvas.functions.updateActiveComponentData(
        setFlashCardComponentData([...cards, { url, alternatives: [] }])
      );
    }
  };

  useEffect(() => {
    manager.canvasManager.canvas.functions["toggleImageSize"] = (
      style: string = "",
      styleType: string
    ) => {
      const element = viewBoxRef.current;
      if (!element) return;
      toggleWrapperSize(element, style, styleType);
    };

    manager.canvasManager.canvas.functions["toggleOverlay"] = (
      status: boolean
    ) => {
      setOverlayActive(status);
    };
  }, [manager, viewBoxRef]);

  useEffect(() => {
    const imageComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    imageComponentData && setData(imageComponentData.content);
    setPreviewImage(imageComponentData.url);
  }, [id]);

  const [inputList, setInputList] = useState<any[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAddInput: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (imageRef.current) {
      const { pageX, pageY } = event;
      const imageRect = imageRef.current.getBoundingClientRect();
      const relativeX = pageX - imageRect.left;
      const relativeY = pageY - imageRect.top;
      const newInput = { x: relativeX, y: relativeY };
      setInputList((prevList) => [...prevList, newInput]);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full p-3 handle cursor-move justify-center items-center">
      <UploadIcon
        handleChange={handleChange}
        handleDrop={handleDrop}
        manager={manager}
      />

      <div>{image.question?.identifier}</div>

      {inputList.map((input, index) => (
        <input
          className="w-20 p-1.5"
          key={index}
          style={{
            position: "absolute",
            top: `${input.y}px`,
            left: `${input.x}px`,
            zIndex: "200",
          }}
          placeholder={`Input ${index + 1}`}
        />
      ))}

      <div
        className="w-full mx-auto my-6 rounded-lg overflow-hidden h-full absolute"
        onClick={overlayActive ? handleAddInput : () => null}
      >
        <img
          ref={imageRef}
          src={image?.url}
          alt="placeholder"
          className="w-full h-full"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default Image;

export interface UploadIconProps {
  handleChange: (e: any) => void;
  handleDrop: (e: any) => void;
  manager: EditorialManagerInterface;
}

const UploadIcon: FC<UploadIconProps> = ({
  handleChange,
  handleDrop,
  manager,
}) => {
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
