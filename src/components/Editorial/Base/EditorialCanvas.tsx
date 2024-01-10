import React, { FC, createRef, useEffect, useState } from "react";
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
import Flashcard from "../ViewBox/Boxtypes/Flashcard/Flashcard";
import CardSlider from "../ViewBox/Boxtypes/Flashcard/CardSlider";
import { refreshOptionsData } from "provider/optionsDataSlice";

const EditorialCanvas: FC<EditorialCanvasInterface> = ({
  slideData,
  manager,
}) => {
  const dispatch = useDispatch();
  const [slideComponents, setSlideComponents] = useState<any[]>([]);

  const onDrop = (id: string) => {
    const existingClone = slideComponents.find((item) => item.id === id);
    const itemId = id + "-clone-" + Date.now();

    if (!existingClone) {
      // dispatch(handleSetDragItems([...slideComponents, { id: itemId }]));
      updateSlideComponents([...slideComponents, { id: itemId }]);
      dispatch(handleSetActiveViewbox(itemId));
    }
  };

  const handleDelete = (id: string) => {
    const filteredItems = slideComponents.filter((item) => item.id !== id);
    dispatch(handleSetDragItems(filteredItems));
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    onDrop(data);
    dispatch(handleToggleSidebarState());
  };

  const handleClickedViewbox = (id: string) => {
    dispatch(handleSetActiveViewbox(id));
    dispatch(handleSetSidebarState(true));
    if(manager.canvasManager.activeSlide) {
      // Set active component index whenever the component is selected or marked active
      const componentIndexInSlide : number = manager.canvasManager.activeSlide.findIndex((data : any) => data.id === id);
      manager.canvasManager.activeComponent.data.index = componentIndexInSlide;
    }
  };

  const updateSlideComponents = (components: any[]) => {
    setSlideComponents(() => components);
    // Also update slide manager
    manager.slideManager.slides[manager.slideManager.activeSlide] = components; 
  };

  useEffect(() => {
    manager.canvasManager &&
      setSlideComponents(
        manager.canvasManager.canvas.functions.parseSlideToCanvas(slideData)
      );
  }, [slideData]);

  const [images, setImages] = useState<any[]>([
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTydOExbsnMsVUb2hXKoQExzkGlhseuclV2L0mYuN4-8Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSsTi83F0-Gdgzk25Lt9CYq0WqdE__qrB9Ufus1780Zg&s",
    "https://img.freepik.com/free-photo/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds-wallpapers_181624-9331.jpg",
    "https://wallpapers.com/images/hd/cool-picture-wolf-art-o0ixt449edz5dgpa.jpg",
  ]);

  return (
    <div
      id="editorial-canvas"
      className="w-full bg-white drop-shadow-sm min-h-[70vh] border-dotted border-slate-300 border-2 p-5 flex flex-col relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {slideComponents.map((item) => {
        const nodeRef: any = createRef();

        const handleStop = (event: any, data: any) => {
          // console.log(`Position of item ${item.id}:`, data.x, data.y);
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
              {item.id.includes("Flash Card") ? (
                <CardSlider images={images} id={item.id} manager={manager} />
              ) : (
                <ViewBox
                  id={item.id}
                  manager={manager}
                  handleDelete={handleDelete}
                />
              )}
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default EditorialCanvas;
