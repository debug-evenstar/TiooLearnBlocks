import React, { FC, useEffect, useRef, useState } from "react";
import Image from "./Image";
import { Resizable } from "react-resizable";
import { toggleWrapperStyle } from "../Text/handlers/stylesHandler";
import { setComponentLayout } from "components/Editorial/Base/EditorialManager";

const Flashcard: FC<any> = ({ id, manager, image }) => {
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
      resizeHandles={["s", "e", "se"]}
    >
      <div
        ref={viewBoxRef}
        className={`border-dotted m-5 p-2 border-2 border-slate-500 rounded`}
        style={{
          width: viewBoxSize.width + "px",
          height: viewBoxSize.height + "px",
        }}
      >
        <Image
          id={id}
          manager={manager}
          viewBoxRef={viewBoxRef}
          image={image}
        />
      </div>
    </Resizable>
  );
};

export default Flashcard;
