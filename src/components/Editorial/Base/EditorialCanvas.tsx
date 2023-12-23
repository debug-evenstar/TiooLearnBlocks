import React, { FC, createRef } from "react";
import { EditorialCanvasInterface } from "../interfaces";
import ViewBox from "../ViewBox";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetSidebarState,
  handleToggleSidebarState,
} from "provider/rightSidebarSlice";
import { handleSetDragItems } from "provider/dragItemsSlice";
import { handleSetActiveViewbox } from "provider/activeViewboxSlice";

const EditorialCanvas: FC<EditorialCanvasInterface> = ({ slideData }) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(handleSetDragItems);

  const dragItems: any[] = selector.payload.dragItems.value;

  const onDrop = (id: string) => {
    const existingClone = dragItems.find((item) => item.id === id);
    const itemId = id + "-clone-" + Date.now();

    if (!existingClone) {
      dispatch(handleSetDragItems([...dragItems, { id: itemId }]));
      console.log(itemId);
      dispatch(handleSetActiveViewbox(itemId));
    }
  };

  const handleDelete = (id: string) => {
    const filteredItems = dragItems.filter((item) => item.id !== id);
    dispatch(handleSetDragItems(filteredItems));
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    onDrop(data);
    dispatch(handleToggleSidebarState());
  };

  const handleClickedViewbox = (id: string) => {
    dispatch(handleSetActiveViewbox(id));
    dispatch(handleSetSidebarState(true));
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
            <div ref={nodeRef} onClick={() => handleClickedViewbox(item.id)}>
              <ViewBox id={item.id} handleDelete={handleDelete} />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default EditorialCanvas;
