import React, { FC, createRef, useEffect, useState } from "react";
import { EditorialCanvasInterface } from "../interfaces";
import ViewBox from "../ViewBox";
import Draggable from "react-draggable";
import CardSlider from "../ViewBox/Boxtypes/Flashcard/CardSlider";
import { setComponentLayout } from "./EditorialManager";
import { ComponentBaseDataInterface } from "components/interface";
import Slider from "../ViewBox/Boxtypes/Slider/Slider";
import { OverlayActiveState, RightSidebarState } from "./StateInterface";

const EditorialCanvas: FC<EditorialCanvasInterface> = ({
  slideData,
  manager,
}) => {
  const [slideComponents, setSlideComponents] = useState<any[]>([]);
  const activeId = manager.states.activeViewBox;
  const onDrop = (id: string) => {
    const existingClone = slideComponents.find((item) => item.id === id);
    const itemId = id + "-clone-" + Date.now();

    if (!existingClone) {
      updateSlideComponents([...slideComponents, { id: itemId }]);
      manager.canvasManager.updateActiveSlide([
        ...(manager.canvasManager.activeSlide ?? []),
        { id: itemId },
      ]);
      manager.canvasManager.setActiveComponent(itemId);
      manager.setState("activeViewBox", itemId);
    }
  };

  const handleDelete = (id: string) => {
    const filteredItems = slideComponents.filter((item) => item.id !== id);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;
    onDrop(data);
    manager.setState("rightSidebarState", (prev: RightSidebarState) => {
      return !prev;
    });
    manager.setState("overlayActive", (prev: OverlayActiveState) => {
      return !prev;
    });
  };

  const handleClickedViewbox = (id: string) => {
    manager.setState("activeViewBox", id);
    manager.canvasManager.setActiveComponent(id);
    //manager.canvasManager.canvas.functions.saveActiveComponentData();
    manager.setState("rightSidebarState", true);
  };

  const updateSlideComponents = (components: any[]) => {
    setSlideComponents(() => components);
    // Also update slide manager
    manager.slideManager.slides[manager.slideManager.activeSlide] = components;
  };

  const loadPosition = (component: ComponentBaseDataInterface) => {
    if (component.layout && component.layout.position) {
      return {
        x: component.layout.position.xAxis.offset,
        y: component.layout.position.yAxis.offset,
      };
    }
    return { x: 0, y: 0 };
  };

  useEffect(() => {
    const parsedSlides =
      manager.canvasManager.canvas.functions.parseSlideToCanvas(slideData);
    manager.canvasManager && setSlideComponents(parsedSlides);
    manager.canvasManager.updateActiveSlide(parsedSlides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideData]);

  useEffect(() => {
    manager.canvasManager.canvas.updateActiveComponentData(
      manager.canvasManager.getComponentData(activeId)
    );
  }, [activeId]);

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
          const layout = setComponentLayout(
            manager.canvasManager.canvas.functions?.getCanvasSize(),
            {
              ...manager.canvasManager.getComponentData(item.id).layout,
              position: {
                xAxis: { offset: data.x + loadPosition(item).x },
                yAxis: { offset: data.y + loadPosition(item).y },
              },
            }
          );
          // Only update if position has changed
          if (data.x !== 0 || data.y !== 0) {
            manager.slideManager.saveComponentData(
              manager.canvasManager.getComponentIndex(item.id),
              { layout }
            );
          }
        };

        return (
          <Draggable
            key={item.id}
            axis="both"
            nodeRef={nodeRef}
            onStop={handleStop}
            handle=".handle"
            defaultClassName="w-fit"
            positionOffset={loadPosition(item)}
          >
            <div
              key={item.id}
              ref={nodeRef}
              onClick={() => handleClickedViewbox(item.id)}
            >
              {item.id.includes("Slider") ? (
                <Slider id={item.id} manager={manager} />
              ) : item.id.includes("Flash") ? (
                <CardSlider id={item.id} manager={manager} />
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
