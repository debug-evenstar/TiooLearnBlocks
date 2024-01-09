import { FC, useEffect, useRef, useState } from "react";
//import { CanvasComponentViewBox } from "../interfaces";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { ViewBoxContent } from "./handler";
import { setComponentLayout } from "../Base/EditorialManager";
import { toggleWrapperStyle } from "./Boxtypes/Text/handlers/stylesHandler";

const ViewBox: FC<any> = ({ id, manager, handleDelete }) => {
  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Text") ? 65 : 280,
  });
  const [isEditable, setIsEditable] = useState(false);

  const viewBoxRef = useRef<HTMLDivElement | null>(null);

  const updateComponentLayout = (width: number, height: number) => {
    manager.canvasManager.activeComponent.data.layoutData = setComponentLayout(
      manager.canvasManager.canvas.functions?.getCanvasSize(),
      {
        size: { width, height },
      }
    );
  };

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });
    updateComponentLayout(size.width, size.height);
  };

  const height = id.includes("Text") ? 60 : 65;

  useEffect(() => {
    manager.canvasManager.activeComponent.functions["toggleViewboxStyle"] = (
      style: string = "",
      styleType: string
    ) => {
      const element = viewBoxRef.current;
      if (!element) return;
      toggleWrapperStyle(element, style, styleType);
    };
  }, [manager]);

  useEffect(() => {
    updateComponentLayout(300, height);
  }, []);

  return (
    <Resizable
      width={viewBoxSize.width}
      height={viewBoxSize.height}
      minConstraints={[280, height]}
      onResize={onResize}
      resizeHandles={id.includes("Text") && !isEditable ? [] : ["s", "e", "se"]}
    >
      <div
        ref={viewBoxRef}
        className={`border-2 border-slate-500 rounded ${
          id.includes("Text") && !isEditable
            ? "border-none"
            : "border-dotted m-5 p-2"
        }`}
        style={{
          width: viewBoxSize.width + "px",
          height: viewBoxSize.height + "px",
        }}
      >
        {ViewBoxContent(id, manager, viewBoxRef, isEditable, setIsEditable)}
      </div>
    </Resizable>
  );
};

export default ViewBox;
