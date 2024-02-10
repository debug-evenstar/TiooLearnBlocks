import { ManagerInterface } from "components/Editorial/Base/Manager";
import React, { FC, createRef, useEffect, useState } from "react";
import { parseGridDimensions } from "./handlers/generalHandler";
import {
  RiAddLine,
  RiArrowDropDownFill,
  RiDeleteBinLine,
} from "react-icons/ri";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import CellContent from "./CellContent";

interface GridProps {
  id: string;
  manager: ManagerInterface;
  viewBoxSize: {
    height: number;
    width: number;
  };
}

const Grid: FC<GridProps> = ({ id, manager, viewBoxSize }) => {
  const trigger = manager.states.trigger;

  const [data, setData] = useState<any>(
    manager.canvasManager.getComponentData(id)
  );

  useEffect(() => {
    const rawData = manager.canvasManager.activeComponent.data;
    console.log(rawData, "updated it!");
    rawData.size !== undefined && setData(rawData);
  }, [trigger]);

  return (
    <div className="relative h-full p-2">
      <GridSteps
        id={id}
        size={parseGridDimensions(data.size)}
        data={data}
        manager={manager}
        height={viewBoxSize.height}
      />
    </div>
  );
};

export default Grid;

interface GridStepsProps {
  id: string;
  data: any;
  size: {
    rows: number;
    cols: number;
  } | null;
  manager: ManagerInterface;
  height: number;
}

const GridSteps: FC<GridStepsProps> = ({ data, size, manager, id, height }) => {
  const isEditable = manager.states.grid.gridIsEditable;
  const [padding, setPadding] = useState(20);
  const [activeCell, setActiveCell] = useState({ rowIndex: 0, colIndex: 0 });
  const [cellColor, setCellColor] = useState("black");

  const buildGridBox = ({ rows, cols }: { rows: number; cols: number }) => {
    return Array.from({ length: rows }, (_, row) =>
      Array.from({ length: cols })
    );
  };

  return (
    <div className="h-full flex flex-col">
      {isEditable && (
        <div className="w-full flex justify-end">
          <AddOrRemoveColumn id={id} direction="rows" manager={manager} />
        </div>
      )}

      <div className={`grow w-full flex flex-col border border-black`}>
        {data &&
          size &&
          buildGridBox(size).map((row: any, rowIndex: number) => (
            <div key={rowIndex} className={`flex grow w-full`}>
              {row.map((cell: any, colIndex: number) => {
                const cellRef = createRef<HTMLDivElement>();

                return (
                  <div
                    key={colIndex}
                    ref={cellRef}
                    className={`grow border border-black p-1 relative cursor-pointer`}
                    onClick={() =>
                      setActiveCell({
                        rowIndex: rowIndex + 1,
                        colIndex: colIndex + 1,
                      })
                    }
                  >
                    <CellContent
                      rowIndex={rowIndex + 1}
                      colIndex={colIndex + 1}
                      activeCell={activeCell}
                      manager={manager}
                      cellRef={cellRef}
                    />
                  </div>
                );
              })}
            </div>
          ))}
      </div>
      {isEditable && (
        <div className="w-fit">
          <AddOrRemoveColumn id={id} direction="cols" manager={manager} />
        </div>
      )}
    </div>
  );
};

interface AddOrRemoveColumnProps {
  id: string;
  direction: "rows" | "cols";
  manager: ManagerInterface;
}

const AddOrRemoveColumn: FC<AddOrRemoveColumnProps> = ({
  id,
  manager,
  direction,
}) => {
  const data = manager.canvasManager.activeComponent.data;
  const addOrRemoveRowOrColumns =
    manager.canvasManager.canvas.functions?.addOrRemoveRowOrColumns;

  const getDimensions = () => {
    if (data === null) return manager.canvasManager.getComponentData(id).size;
    return manager.canvasManager.activeComponent.data.size;
  };

  return (
    <div className="w-fit flex flex-col items-center">
      <div className="w-fit flex justify-between m-1 my-0 py-1 px-2 bg-white border border-gray-300 rounded">
        <GridTooltip
          title={
            direction === "rows"
              ? "Remove 1 row below"
              : "Remove 1 column right"
          }
        >
          <div className="p-1">
            <RiDeleteBinLine
              className="cursor-pointer"
              onClick={() =>
                addOrRemoveRowOrColumns(
                  parseGridDimensions(getDimensions()),
                  "remove",
                  direction
                )
              }
            />
          </div>
        </GridTooltip>

        <GridTooltip
          title={
            direction === "rows"
              ? "Insert 1 row below"
              : "Insert 1 column right"
          }
        >
          <div className="p-1 bg-gray-200">
            <RiAddLine
              className="cursor-pointer"
              onClick={() =>
                addOrRemoveRowOrColumns(
                  parseGridDimensions(getDimensions()),
                  "add",
                  direction
                )
              }
            />
          </div>
        </GridTooltip>
      </div>
    </div>
  );
};

const GridTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#030036a4",
    color: theme.palette.common.white,
    fontSize: 11,
  },
}));
