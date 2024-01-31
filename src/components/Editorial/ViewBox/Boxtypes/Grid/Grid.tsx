import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import React, { FC, useEffect, useState } from "react";
import { parseGridDimensions } from "./handlers/generalHandler";
import { getOriginalName } from "../../handler";
import { useSelector } from "react-redux";
import { handleToggleSidebarState } from "provider/rightSidebarSlice";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";

interface GridProps {
  id: string;
  manager: EditorialManagerInterface;
}

const Grid: FC<GridProps> = ({ id, manager }) => {
  const activeId = manager.states.activeViewBox;

  const [size, setSize] = useState<{ rows: number; cols: number } | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const rawData = manager.canvasManager.canvas.functions.getComponentData(id);
    setData(rawData);
    setSize(parseGridDimensions(rawData.size));
  }, [activeId, manager]);

  return (
    <div>
      <div className="relative">
        <GridSteps size={size} data={data} manager={manager} />
      </div>
    </div>
  );
};

export default Grid;

interface GridStepsProps {
  data: any;
  size: {
    rows: number;
    cols: number;
  } | null;
  manager: EditorialManagerInterface;
}

const GridSteps: FC<GridStepsProps> = ({ data, size, manager }) => {
  const buildGridBox = ({ rows, cols }: { rows: number; cols: number }) => {
    return Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols })
    );
  };

  return (
    <>
      <div className="absolute right-0 top-[-2rem]">
        <AddOrRemoveColumn type="add" manager={manager} />
      </div>
      <div className="m-2 border border-black">
        {data &&
          size &&
          buildGridBox(size).map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="flex h-full">
              {row.map((cell: any, colIndex: number) => (
                <div
                  key={colIndex}
                  className="border border-black h-[4rem] w-[100%]"
                ></div>
              ))}
            </div>
          ))}
      </div>
      <AddOrRemoveColumn type="remove" manager={manager} />
    </>
  );
};

interface AddOrRemoveColumnProps {
  type: "add" | "remove";
  manager: EditorialManagerInterface;
}

const AddOrRemoveColumn: FC<AddOrRemoveColumnProps> = ({ type, manager }) => {
  const addOrRemoveRowOrColumns =
    manager.canvasManager.canvas.functions?.addOrRemoveRowOrColumns;

  return (
    <div className="w-fit flex justify-between m-1 py-1 px-2 bg-white border border-gray-300 rounded">
      <div className="p-1">
        <RiDeleteBinLine
          className="cursor-pointer"
          onClick={() => addOrRemoveRowOrColumns(type)}
        />
      </div>
      <div className="p-1 bg-gray-200">
        <RiAddLine />
      </div>
    </div>
  );
};
