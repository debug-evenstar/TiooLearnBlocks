import { FC, createRef, useEffect, useRef, useState } from "react";
import { BoxConfiguration, CanvasComponentViewBox } from "../interfaces";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import Draggable from "react-draggable";

const ViewBox: FC<CanvasComponentViewBox> = ({ id, children, boxConfiguration, updateBoxConfiguration }) => {
  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Image") ? 200 : 120,
  });

  const viewBoxRef = useRef<HTMLDivElement | null>(null);
  const nodeRef : any = createRef();

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });
  };

  const height = id.includes("Image") ? 200 : 120;

  const handleStop = (event: any, data: any) => {
      console.log(`Position of item ${id}:`, data.x, data.y);
  };

  useEffect(()=>{
    updateBoxConfiguration((previousConfig : BoxConfiguration) => ({
      ...previousConfig,
      width : 300,
      height: id.includes("Image") ? 200 : 120
    }));
  },[]);

  return (
    <Draggable
      key={id}
      axis="both"
      nodeRef={nodeRef}
      onStop={handleStop}
      handle=".handle"
    >
      <div ref={nodeRef}>
        <Resizable
            width={viewBoxSize.width}
            height={viewBoxSize.height}
            minConstraints={[280, height]}
            onResize={onResize}
            resizeHandles={["s", "w", "e", "n","sw", "nw", "se", "ne"]}
          >
            <div
              ref={viewBoxRef}
              className="m-5 dasheds rounded handle relative"
              style={{
                width: viewBoxSize.width + "px",
                height: viewBoxSize.height + "px",
              }}
            >
              {children} 
              <div className="w-full h-full absolute top-0">
              </div>
            </div>
          </Resizable>
      </div>

    </Draggable>
  );
};

export default ViewBox;
