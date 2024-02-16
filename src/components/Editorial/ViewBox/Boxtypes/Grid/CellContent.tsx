import React, { FC, useEffect, useState } from "react";
import { Dropdown as Icon } from "FigmaIcons/Dropdown";
import { ManagerInterface } from "components/Editorial/Base/Manager";
import { ColorResult, SketchPicker } from "react-color";
import { TriggerState } from "components/Editorial/Base/StateInterface";
import { UploadIconProps } from "../Image/Image";
import { uploadFile } from "../Image/handler";
import { FiUploadCloud } from "react-icons/fi";

interface GridObjectCoords {
  rowIndex: number;
  colIndex: number;
}

interface GridObject {
  type: "Text" | "Image";
  url?: string;
  content?: string;
  coords: GridObjectCoords;
}

interface Props {
  manager: ManagerInterface;
  rowIndex: number;
  colIndex: number;
  activeCell: {
    rowIndex: number;
    colIndex: number;
  };
  cellRef: React.RefObject<HTMLDivElement>;
}

const CellContent: FC<Props> = ({
  manager,
  rowIndex,
  colIndex,
  activeCell,
  cellRef,
}) => {
  const trigger = manager.states.trigger;

  const [data, setData] = useState<any>(
    manager.canvasManager.activeComponent.data
  );

  const [isActive, setIsActive] = useState(false);
  const [colorIsActive, setColorIsActive] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const matchCell =
    rowIndex === activeCell.rowIndex && colIndex === activeCell.colIndex;

  const matchCellCoords = (coords: GridObjectCoords) =>
    rowIndex === coords.rowIndex && colIndex === coords.colIndex;

  const matchStartOrEnd = (type: "start" | "end") => {
    if (data[type] === `${rowIndex}x${colIndex}`) return type;
    return "none";
  };

  const handleSetAsStartOrEnd = (type: "start" | "end") => {
    data[type] = `${rowIndex}x${colIndex}`;
  };

  const handleChangeCellColor = (color: ColorResult) => {
    if (!cellRef.current) return;
    cellRef.current.style.backgroundColor = color.hex;
  };

  const appendObject = (type: "Text" | "Image") => {
    if (type === "Image") {
      data.objects && data.objects.length > 0
        ? (data.objects = [
            ...data?.objects,
            {
              type,
              url: "",
              coords: {
                rowIndex,
                colIndex,
              },
              cellColor: "transparent",
            },
          ])
        : (data.objects = [
            {
              type,
              url: "",
              coords: {
                rowIndex,
                colIndex,
              },
              cellColor: "transparent",
            },
          ]);
    } else {
      data.objects && data.objects.length > 0
        ? (data.objects = [
            ...data?.objects,
            {
              type,
              content: "",
              coords: {
                rowIndex,
                colIndex,
              },
              cellColor: "transparent",
            },
          ])
        : (data.objects = [
            {
              type,
              content: "",
              coords: {
                rowIndex,
                colIndex,
              },
              cellColor: "transparent",
            },
          ]);
    }
    manager.setState("trigger", (prev: TriggerState) => !prev);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      //const imageUrl = URL.createObjectURL(selectedFile);
      //setPreviewImage(imageUrl);
      const url = await uploadFile(475, selectedFile);
      data.objects &&
        data.objects.map((object: any) => {
          if (matchCellCoords(object.coords)) {
            object.url = url;
            manager.setState("trigger", (prev: TriggerState) => !prev);
          }
        });
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
      data.objects &&
        data.objects.map((object: any) => {
          if (matchCellCoords(object.coords)) {
            object.url = url;
            manager.setState("trigger", (prev: TriggerState) => !prev);
          }
        });
    }
  };

  useEffect(() => {
    const rawData = manager.canvasManager.activeComponent.data;
    rawData.size !== undefined && setData(rawData);
    rawData.objects &&
      rawData.objects.map((object: any) => {
        if (matchCellCoords(object.coords)) setPreviewImage(object.url);
      });
  }, [trigger]);

  return (
    <>
      <div
        className={`${
          matchCell ? "" : "opacity-0"
        } absolute right-1 flex h-[30%] w-[45%] items-center justify-center border border-black overflow-hidden rounded z-10`}
        onClick={() => setIsActive(!isActive)}
      >
        <Icon />
      </div>

      {matchCell && isActive && (
        <main
          className="bg-white h-fit absolute left-10 top-7 p-2 px-3 whitespace-nowrap z-10"
          style={{ boxShadow: "0px 0.5px 8px rgba(0, 0, 0, 0.25)" }}
        >
          <p
            className="my-1 cursor-pointer"
            onClick={() => appendObject("Text")}
          >
            Insert texts
          </p>
          <p
            className="my-1 cursor-pointer"
            onClick={() => appendObject("Image")}
          >
            Insert objects
          </p>
          <>
            <p
              className="my-1 cursor-pointer"
              onClick={() => setColorIsActive(!colorIsActive)}
            >
              Color cell
            </p>
            {colorIsActive && (
              <SketchPicker
                className="absolute z-auto h-[150%] overflow-y-auto"
                onChange={(color) => handleChangeCellColor(color)}
                onChangeComplete={() => setColorIsActive(false)}
              />
            )}
          </>

          <p
            className="my-1 cursor-pointer z-auto"
            onClick={() => handleSetAsStartOrEnd("start")}
          >
            Set as start
          </p>
          <p
            className="my-1 cursor-pointer z-auto"
            onClick={() => handleSetAsStartOrEnd("end")}
          >
            Set as end
          </p>
        </main>
      )}

      <div className="absolute left-1 bottom-1 text-[11px] text-[red] z-10">
        <p>{matchStartOrEnd("start") !== "none" && matchStartOrEnd("start")}</p>
        <p>{matchStartOrEnd("end") !== "none" && matchStartOrEnd("end")}</p>
      </div>

      {data.objects?.map((object: GridObject) =>
        matchCellCoords(object.coords) ? (
          object.type === "Image" ? (
            <div className="w-full h-full absolute top-0 left-0">
              {previewImage?.length > 1 ? (
                <div className="w-full mx-auto my-6 overflow-hidden h-full absolute top-[-1.5rem] left-0">
                  <img
                    src={previewImage}
                    alt="placeholder"
                    className="w-full h-full"
                    draggable={false}
                  />
                </div>
              ) : (
                <UploadIcon
                  handleChange={handleChange}
                  handleDrop={handleDrop}
                  manager={manager}
                />
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-full h-full left-0 top-0 absolute text-center outline-none cursor-text"
              contentEditable
              dangerouslySetInnerHTML={{ __html: object.type }}
            />
          )
        ) : (
          <></>
        )
      )}
    </>
  );
};

export default CellContent;

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
      className="bg-white h-full w-full relative overflow-hidden cursor-pointer dropzone z-auto"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col justify-center items-center h-full w-full">
        <FiUploadCloud className="text-2xl cursor-pointer" />
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full h-full absolute top-0 -left-0 opacity-0"
        />

        <p className="text-center text-[13px] text-[#4f46e5] font-bold">
          Choose file
        </p>
      </div>
    </div>
  );
};
