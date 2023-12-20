import React, { FC, useState } from "react";
import { EditorialCanvasInterface } from "../interfaces";
import ViewBox from "../ViewBox";

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
      className="w-full bg-white drop-shadow-sm min-h-[70vh] border-dotted border-slate-300 border-2"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {dragItems.map((item) => (
        <div key={item.id} className="draggable-clone">
          <ViewBox id={item.id} handleDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default EditorialCanvas;
