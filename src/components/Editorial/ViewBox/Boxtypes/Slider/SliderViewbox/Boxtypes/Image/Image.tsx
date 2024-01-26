import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { CanvasMedia } from "components/Editorial/interfaces";
import React, { FC, createRef, useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import {
  setImageComponentData,
  toggleWrapperSize,
  uploadFile,
} from "./handler";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import { useDispatch, useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { handleToggleTrigger } from "provider/triggerSlice";
import { handleToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import { handleSetObjectiveIndex } from "provider/optionsDataSlice";
import { handleToggleOverlayState } from "provider/overlayActiveSlice";
import "react-resizable/css/styles.css";

const Image: FC<CanvasMedia> = ({
  id,
  manager,
  viewBoxRef,
  data,
  currIndex,
}) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(refreshToggleSidebarState);
  const activeId: string = selector.payload.activeViewbox.value;
  const showOptionsBox: boolean = selector.payload.showOptionsBox.value;
  const overlayActive: boolean = selector.payload.overlayActive.value;

  const [previewImage, setPreviewImage] = useState("");
  const [inputList, setInputList] = useState<any[]>([]);
  const [inputBoxDimensions, setInputBoxDimensions] = useState<any[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);

  const extensions: any[] =
    manager.canvasManager.activeComponent.data.coreData?.extensions;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      //const imageUrl = URL.createObjectURL(selectedFile);
      //setPreviewImage(imageUrl);
      const url = await uploadFile(473, selectedFile);
      setPreviewImage(url);
      console.log(url, "url");
      manager.canvasManager.canvas.functions.updateSliderImageURL(
        url,
        currIndex
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
      const url = await uploadFile(473, file);
      setPreviewImage(url);
      manager.canvasManager.canvas.functions.updateSliderImageURL(
        url,
        currIndex
      );
    }
  };

  useEffect(() => {
    manager.canvasManager.activeComponent.functions["toggleImageSize"] = (
      style: string = "",
      styleType: string
    ) => {
      const element = viewBoxRef.current;
      if (!element) return;
      toggleWrapperSize(element, style, styleType);
    };

    manager.canvasManager.activeComponent.functions["toggleOverlay"] = () => {
      dispatch(handleToggleOverlayState());
    };
  }, [manager, viewBoxRef]);

  useEffect(() => {
    setPreviewImage(data[0].url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddInput: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (imageRef.current) {
      const { pageX, pageY } = event;
      const imageRect = imageRef.current.getBoundingClientRect();
      const relativeX = pageX - imageRect.left;
      const relativeY = pageY - imageRect.top;
      const newInput = {
        type: "input",
        x: relativeX,
        y: relativeY,
        width: 200,
        height: 5,
        question: [],
      };
      const newList = [...inputList, newInput];
      setInputList(newList);
      manager.canvasManager.canvas.functions.updateActiveComponentData(
        setImageComponentData({
          extensions: newList,
        })
      );
      dispatch(handleToggleTrigger());
      console.log(
        manager.canvasManager.activeComponent.data.coreData.extensions,
        "updated data"
      );
      setInputBoxDimensions((prevList) => [
        ...prevList,
        { width: 200, height: 40 },
      ]);
    }
  };

  const onResize = (
    event: any,
    { node, size, handle }: any,
    boxIndex: number
  ) => {
    setInputBoxDimensions((prevDimensions) =>
      prevDimensions.map((dimensions, index) =>
        index === boxIndex
          ? { ...dimensions, width: size.width, height: size.height }
          : dimensions
      )
    );
    console.log(inputBoxDimensions[boxIndex], "die");
  };

  const handleClickedInput = (input: any, index: number) => {
    if (input?.question[0] && input.question[0]?.type === "OBJECTIVE") {
      dispatch(handleToggleShowOptionBox());
    }
    dispatch(handleSetObjectiveIndex(index));
  };

  return (
    <div
      className={`relative flex flex-col h-full w-full p-3 cursor-move justify-center items-center ${
        overlayActive ? "" : "sliderHandle"
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
            <Draggable
              key={index}
              axis="both"
              nodeRef={nodeRef}
              handle=".inputHandle"
            >
              <Resizable
                width={inputBoxDimensions[index].width}
                height={inputBoxDimensions[index].height}
                minConstraints={[20, 5]}
                onResize={(event: any, { node, size, handle }: any) =>
                  onResize(event, { node, size, handle }, index)
                }
                resizeHandles={["s", "e", "se"]}
              >
                <div
                  onClick={() => handleClickedInput(input, index)}
                  ref={nodeRef}
                  style={{
                    width: inputBoxDimensions[index].width + "px",
                    height: inputBoxDimensions[index].height + "px",
                    position: "absolute",
                    top: `${input.y}px`,
                    left: `${input.x}px`,
                    zIndex: "200",
                    padding: "0.05rem",
                  }}
                >
                  <input
                    className="w-full h-full p-1.5 inputHandle"
                    placeholder={`Input ${index + 1}`}
                  />
                </div>
              </Resizable>
            </Draggable>
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
