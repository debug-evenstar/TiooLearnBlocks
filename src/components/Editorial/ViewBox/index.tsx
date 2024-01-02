import { FC, useEffect, useRef, useState } from "react";
import { CanvasComponentViewBox } from "../interfaces";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { ViewBoxContent } from "./handler";
import { toggleWrapperStyle } from "./Boxtypes/Text/handlers/stylesHandler";

const ViewBox: FC<CanvasComponentViewBox> = ({ id, manager, handleDelete }) => {
  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Text") ? 65 : 280,
  });

  const viewBoxRef = useRef<HTMLDivElement | null>(null);

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });
    console.log(viewBoxRef.current?.offsetHeight);

    console.log(size);
  };

  const height = id.includes("Text") ? 65 : 280;

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

  return (
    <Resizable
      width={viewBoxSize.width}
      height={viewBoxSize.height}
      minConstraints={[280, height]}
      onResize={onResize}
      resizeHandles={["s", "e", "se"]}
    >
      <div
        ref={viewBoxRef}
        className="m-5 p-2 border-2 border-slate-500 border-dotted rounded"
        style={{
          width: viewBoxSize.width + "px",
          height: viewBoxSize.height + "px",
        }}
      >
        {ViewBoxContent(id, manager, viewBoxRef)}
      </div>
    </Resizable>
  );
};

export default ViewBox;
