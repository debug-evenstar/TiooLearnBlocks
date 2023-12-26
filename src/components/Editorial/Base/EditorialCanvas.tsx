import React, { FC, createRef } from "react";
import { EditorialCanvasInterface } from "../interfaces";
import ViewBox from "../ViewBox";
import ComponentStateManager from "../ComponentViews/ComponentState";
import { loadComponent } from "./Components";

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
                const componentType = item.id.split("-")[0]; // Convention for now
                const Component = loadComponent(componentType);
                return (
                    <ComponentStateManager
                      id={item.id}
                      children={
                        <Component id={item.id}></Component>
                      }
                    ></ComponentStateManager>
                );
            })}
        </div>
    );
};

export default EditorialCanvas;
