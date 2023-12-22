import React, { FC, createRef } from "react";
import { EditorialCanvasInterface } from "../interfaces";
import ViewBox from "../ViewBox";
import Draggable from "react-draggable";

const EditorialCanvas: FC<EditorialCanvasInterface> = ({
  slideData,
  onDrop,
  handleDelete,
  dragItems,
}) => {
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    onDrop(data);
  };

  return (
    <div
      className="w-full bg-white drop-shadow-sm min-h-[70vh] border-dotted border-slate-300 border-2 p-5 flex flex-col relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {dragItems.map((item) => {
        const nodeRef: any = createRef();

        const handleStop = (event: any, data: any) => {
          console.log(`Position of item ${item.id}:`, data.x, data.y);
        };

        return (
          <Draggable
            key={item.id}
            axis="both"
            nodeRef={nodeRef}
            onStop={handleStop}
            handle=".handle"
          >
            <div ref={nodeRef}>
              <ViewBox id={item.id} handleDelete={handleDelete} />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default EditorialCanvas;
