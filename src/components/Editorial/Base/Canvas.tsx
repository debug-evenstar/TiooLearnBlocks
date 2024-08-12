import React, { FC, createRef, useEffect, useState } from "react";
import { CanvasInterface } from "../interfaces";
import ViewBox from "../ViewBox";
import Draggable from "react-draggable";
import { setComponentLayout } from "./Manager";
import { ComponentBaseDataInterface } from "components/interface";
import { OverlayActiveState, RightSidebarState } from "./StateInterface";
import { loadComponent } from "components/SlideManager/handler";
import { loadEditorialComponent } from "../Helpers/Loader";

const Canvas: FC<CanvasInterface> = ({ slideData, manager }) => {
  const [slideComponents, setSlideComponents] = useState<any[]>([]);
  const activeId = manager.states.activeViewBox;

  // Come back here later
  const onDrop = (componentName: string) => {
    const itemId = `${componentName}-${Date.now()}`;
    const existing = slideComponents.find((item) => item.id === itemId);

    if (!existing) {

      const initializeComponent = manager.canvasManager.createComponent(
        componentName,
        itemId
      );
      const updated = [...slideComponents, initializeComponent];

      updateSlideComponents(updated);
      manager.canvasManager.updateActiveSlide(updated);
      manager.canvasManager.updateSlides();
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
  };

  const handleClickedViewbox = (id: string) => {
    manager.canvasManager.setActiveComponent(id);
    manager.setState("activeViewBox", id);
    // manager.canvasManager.canvas.functions.saveActiveComponentData();
    manager.setState("rightSidebarState", true);
    id !== activeId && manager.setState("overlayActive", false);
  };

  const updateSlideComponents = (components: any[]) => {
    setSlideComponents(() => components);
    // Also update slide manager
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
      manager.canvasManager.canvas.parseSlideToCanvas(slideData);
    manager.canvasManager && setSlideComponents(parsedSlides);
    manager.canvasManager.updateActiveSlide(parsedSlides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideData]);

  useEffect(() => {
    // console.log(manager.canvasManager.getComponentData(activeId));
    // manager.canvasManager.canvas.updateActiveComponentData(
    //   manager.canvasManager.getComponentData(activeId)
    // );
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
          manager.canvasManager.setActiveComponent(item.id);
          // Offset behaviour changed at some point
          const layout = setComponentLayout(
            manager.canvasManager.canvas.functions?.getCanvasSize(),
            {
              ...manager.canvasManager.getComponentData(item.id).layout,
              position: {
                xAxis: { offset: data.x },
                yAxis: { offset: data.y },
              },
            }
          );
          // Only update if position has changed
          if (data.x !== 0 || data.y !== 0) {
            manager.canvasManager.canvas.updateActiveComponentData({layout});
          }
        };
        if (item.abstract) {
          const Component = loadEditorialComponent(item);
          return <Component data={item} key={item.id}/>
        }

        return (
          <Draggable
            key={item.id}
            axis="both"
            nodeRef={nodeRef}
            onStop={handleStop}
            handle=".handle"
            defaultClassName="w-fit"
            //positionOffset={loadPosition(item)}
            bounds="parent"
            defaultPosition={loadPosition(item)}
          >
            <div
              key={item.id}
              ref={nodeRef}
              onClick={() => handleClickedViewbox(item.id)}
              className="absolute"
            >
                <ViewBox
                  id={item.id}
                  manager={manager}
                  handleDelete={handleDelete}
                />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default Canvas;
