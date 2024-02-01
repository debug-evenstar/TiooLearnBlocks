import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import React, { FC, useEffect, useState } from "react";
import { parseGridDimensions } from "./handlers/generalHandler";
import { RiAddLine, RiDeleteBinLine } from "react-icons/ri";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

interface GridProps {
  id: string;
  manager: EditorialManagerInterface;
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
  manager: EditorialManagerInterface;
  height: number;
}

const GridSteps: FC<GridStepsProps> = ({ data, size, manager, id, height }) => {
  const isEditable = manager.states.grid.gridIsEditable;
  const [padding, setPadding] = useState(20);

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
              {row.map((cell: any, colIndex: number) => (
                <div key={colIndex} className={`grow border border-black`} />
              ))}
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
  manager: EditorialManagerInterface;
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
