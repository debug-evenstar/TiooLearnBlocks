import { ManagerInterface } from "components/Editorial/Base/Manager";
import { CanvasMedia } from "components/Editorial/interfaces";
import React, { FC, createRef, useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { imageComponentData, toggleWrapperSize, uploadFile } from "./handler";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { OptionsDataState } from "components/Editorial/Base/StateInterface";
import {createInputOverlay} from "./InputOverlay/handler";
import {percentValue} from "../../../../../utilities/maths";
import OverlayInput from "./InputOverlay";

const Image: FC<CanvasMedia> = ({ id, manager, viewBoxRef }) => {
  const activeId = manager.states.activeViewBox;
  const showOptionsBox = manager.states.showOptionsBox;
  const overlayActive = manager.states.overlayActive;

  const [previewImage, setPreviewImage] = useState("");
  const [data, setData] = useState<any>();
  const [inputList, setInputList] = useState<any[]>([]);
  const [inputBoxDimensions, setInputBoxDimensions] = useState<any[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  const extensions: any[] =
    manager.canvasManager.activeComponent.data?.extensions;

    

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
      const url = await uploadFile(473, selectedFile);
      setPreviewImage(url);
      manager.canvasManager.canvas.updateActiveComponentData(
        imageComponentData({url})
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
    const file = files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      const url = await uploadFile(473, file);
      setPreviewImage(url);
      manager.canvasManager.canvas.functions.updateActiveComponentData(
        imageComponentData(url)
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

    manager.canvasManager.canvas.functions["toggleOverlay"] = () => {
      manager.setState("overlayActive", (prev: any) => !prev);
    };
  }, [manager, viewBoxRef]);

  useEffect(() => {
    const imageComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    imageComponentData && setData(imageComponentData);
    setPreviewImage(imageComponentData.url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddInput: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (imageRef.current) {
      const { pageX, pageY } = event;
      const imageRect = imageRef.current.getBoundingClientRect();
      const relativeX = pageX - imageRect.left;
      const relativeY = pageY - imageRect.top;
      const newInput = createInputOverlay(relativeX, relativeY, imageRef.current);
      const newList = [...inputList, newInput];
      setInputList(newList);
      manager.canvasManager.canvas.updateActiveComponentData(
        imageComponentData({
          extensions: newList,
        })
      );
      manager.setState("trigger", (prev: any) => !prev);
      setInputBoxDimensions((prevList) => [
        ...prevList,
        newInput.layout
      ]);
    }
  };
  
  const updateInputLayout = (boxIndex : number, layout : any) => {
    setInputBoxDimensions((prevDimensions) =>
        prevDimensions.map((dimensions, index) =>
            index === boxIndex
                ? {
                  ...dimensions,
                  size : layout.size ?? dimensions.size,
                  position : layout.position ?? dimensions.position
                }
                : dimensions
        )
    );

    const newList = inputList;
    newList[boxIndex] = {
      ...inputList[boxIndex],
      layout : {
        ...inputList[boxIndex].layout,
        size :layout.size ?? inputList[boxIndex].layout.size,
        position :layout.position ?? inputList[boxIndex].layout.position
      }
    };

    manager.canvasManager.canvas.updateActiveComponentData(
        imageComponentData({
          extensions: newList,
        })
    );
  }

  const onResize = (
    event: any,
    { node, size, handle }: any,
    boxIndex: number
  ) => {

    const updatedSize = {
      width : size.width,
      height : size.height,
      widthPercent : percentValue(size.width, data.layout.size.width),
      heightPercent : percentValue(size.height, data.layout.size.height)
    };

    updateInputLayout(boxIndex, { size : updatedSize});
  };

  const onDrag = (
      event: any,
      dragData : any,
      boxIndex: number
  ) => {
    const updatedPosition = {
      xAxis : { offset : dragData.x, offsetPercent : percentValue(dragData.x, data.layout.size.width)},
      yAxis : { offset : dragData.y, offsetPercent : percentValue(dragData.y, data.layout.size.height)}
    };
    updateInputLayout(boxIndex, { position : updatedPosition});
  };

  const handleClickedInput = (input: any, index: number) => {
    if (input?.question[0] && input.question[0]?.type === "OBJECTIVE") {
      manager.setState("showOptionsBox", (prev: any) => !prev);
    }
    manager.setState("optionsData", (prev: OptionsDataState) => {
      return { ...prev, ...({ objectiveIndex: index } as OptionsDataState) };
    });
  };

  return (
    <div
      className={`relative flex flex-col h-full w-full p-3 cursor-move justify-center items-center ${
        overlayActive ? "cursor-pointer" : "handle"
      }`}
    >
      <UploadIcon
        handleChange={handleChange}
        handleDrop={handleDrop}
        manager={manager}
      />

      {activeId === id &&
        overlayActive &&
        extensions &&
        extensions.length > 0 &&
        extensions.map((input, index) => {
          const nodeRef: any = createRef();
          return (
            <OverlayInput index={index} ref={nodeRef} data={input} onResize={onResize} onClick={handleClickedInput} onDrag={onDrag} parentLayout={data?.layout ?? {}}/>
          );
        })}

      {previewImage?.length > 1 && (
        <div
          className="w-full mx-auto my-6 rounded-lg overflow-hidden h-full absolute"
          onClick={
            activeId === id && overlayActive ? handleAddInput : () => null
          }
        >
          <img
            ref={imageRef}
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

export interface UploadIconProps {
  handleChange: (e: any) => void;
  handleDrop: (e: any) => void;
  manager: ManagerInterface;
}

export const UploadIcon: FC<UploadIconProps> = ({
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
