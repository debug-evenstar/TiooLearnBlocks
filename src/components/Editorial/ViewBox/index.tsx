import { FC, useRef, useState } from "react";
import { CanvasComponentViewBox } from "../interfaces";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { ViewBoxContent } from "./handler";

const ViewBox: FC<CanvasComponentViewBox> = ({ id, handleDelete }) => {
  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Image") ? 200 : 65,
  });

  const viewBoxRef = useRef<HTMLDivElement | null>(null);

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });
    console.log(viewBoxRef.current?.offsetHeight);

    console.log(size);
  };

  const height = id.includes("Image") ? 200 : 65;

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
        className="m-5 p-2 dasheds rounded"
        style={{
          width: viewBoxSize.width + "px",
          height: viewBoxSize.height + "px",
        }}
      >
        {ViewBoxContent(id, viewBoxRef)}
      </div>
    </Resizable>
  );
};

export default ViewBox;
