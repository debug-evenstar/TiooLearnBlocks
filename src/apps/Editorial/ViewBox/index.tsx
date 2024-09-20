import { FC, useEffect, useRef, useState } from "react";
//import { CanvasComponentViewBox } from "../interfaces";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { ViewBoxContent, calculateMaxResizableArea } from "./handler";
import { ManagerInterface, setComponentLayout } from "../Base/Manager";
import { toggleWrapperStyle } from "../Components/Text/handlers/stylesHandler";
import { ComponentBaseDataInterface } from "components/interface";
import { useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import GridObjectivesInputs from "../Sidebars/RightSidebar/EditProperties/Grid/GridExtensions/ObjectiveInputs";

interface Props {
  id: string;
  manager: ManagerInterface;
  handleDelete: Function;
}

const ViewBox: FC<Props> = ({ id, manager, handleDelete }) => {
  const activeId = manager.states.activeViewBox;
  const noTextInViewbox = manager.states.noTextInViewbox;

  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Text") ? 65 : 280,
  });
  const [isEditable, setIsEditable] = useState(false);

  const viewBoxRef = useRef<HTMLDivElement | null>(null);

  const updateComponentLayout = (width: number, height: number) => {
    const layout = setComponentLayout(
      manager.canvasManager.canvas.getCanvasSize(),
      {
        ...manager.canvasManager.getComponentData(id).layout,
        size: { width, height },
      }
    );
    manager.canvasManager.canvas.updateActiveComponentData({layout});
  };

  const onResize = (event: any, { node, size, handle }: any) => {
    const canvas = document.getElementById("editorial-canvas");
    const viewBox = viewBoxRef.current;

    if (!canvas || !viewBox) return;
    const canvasSize = canvas.getBoundingClientRect();
    const viewBoxPosition = viewBox.getBoundingClientRect();

    const maxArea = calculateMaxResizableArea(viewBoxPosition, canvasSize);

    const newWidth = Math.min(size.width, maxArea.maxWidth);
    const newHeight = Math.min(size.height, maxArea.maxHeight);

    if (newWidth !== viewBoxSize.width || newHeight !== viewBoxSize.height) {
      setViewBoxSize({ width: newWidth, height: newHeight });
      updateComponentLayout(newWidth, newHeight);
    }
  };

  const loadSize = (component: ComponentBaseDataInterface) => {
    if (component.layout && component.layout.size) {
      setViewBoxSize({
        height: component.layout.size.height,
        width: component.layout.size.width,
      });
    }
  };

  const height = id.includes("Text") ? 60 : 65;

  useEffect(() => {
    const component = manager.canvasManager.getComponentData(id);

    if (!component.layout?.size) {
      // Default Layout
      const layout = setComponentLayout(
        manager.canvasManager.canvas.functions?.getCanvasSize(),
        { size: { width: 300, height } }
      );
      manager.slideManager.saveComponentData(
        manager.canvasManager.getComponentIndex(id),
        { layout },
        true
      );
    }
  }, []);

  useEffect(() => {
    const component = manager.canvasManager.getComponentData(id);
    loadSize(component);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showBorder = () => {
    if (noTextInViewbox) return "border-dotted";
    if (id.includes("Text")) {
      if (isEditable && activeId === id) return "border-dotted";
      return "border-none";
    }
    return "border-dotted";
  };

  return (
    <>
      <Resizable
        width={viewBoxSize.width}
        height={viewBoxSize.height}
        onResize={onResize}
        resizeHandles={
          isEditable && activeId === id
            ? ["s", "e", "se"]
            : id.includes("Text")
            ? []
            : ["s", "e", "se"]
        }
      >
        <div
          ref={viewBoxRef}
          className={`border-2 border-slate-500 rounded ${showBorder()}`}
          style={{
            width: viewBoxSize.width + "px",
            height: viewBoxSize.height + "px",
          }}
        >
          {ViewBoxContent(
            id,
            manager,
            viewBoxRef,
            isEditable,
            setIsEditable,
            viewBoxSize
          )}
        </div>
      </Resizable>
    </>
  );
};

export default ViewBox;
