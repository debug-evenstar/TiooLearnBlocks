import { FC, useEffect, useRef, useState } from "react";
//import { CanvasComponentViewBox } from "../interfaces";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import { ViewBoxContent } from "./handler";
import { ComponentBaseDataInterface } from "components/interface";
import { useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import ObjectivesInputs from "./ObjAndSubInputs/ObjectivesInputs";
import {
  EditorialManagerInterface,
  setComponentLayout,
} from "components/Editorial/Base/EditorialManager";
import ImageObjectivesInputs from "components/Editorial/Sidebars/RightSidebar/EditProperties/Image/Overlay/ObjectiveInputs";

interface Props {
  id: string;
  manager: EditorialManagerInterface;
  handleDelete: Function;
  data: any;
  currIndex: number;
  isFlashcardDraggable: boolean;
  setIsFlashcardDraggable: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlashcardViewBox: FC<Props> = ({
  id,
  manager,
  handleDelete,
  data,
  currIndex,
  isFlashcardDraggable,
  setIsFlashcardDraggable,
}) => {
  

  const activeId = manager.states.activeViewBox;
  const showOptionsBox = manager.states.showOptionsBox;

  const [viewBoxSize, setViewBoxSize] = useState({
    width: 300,
    height: id.includes("Text") ? 65 : 280,
  });
  const [isEditable, setIsEditable] = useState(false);

  const viewBoxRef = useRef<HTMLDivElement | null>(null);

  const updateComponentLayout = (width: number, height: number) => {
    manager.canvasManager.activeComponent.data.layout = setComponentLayout(
      manager.canvasManager.canvas.functions?.getCanvasSize(),
      {
        ...manager.canvasManager.getComponentData(id).layout,
        size: { width, height },
      }
    );
    manager.canvasManager.canvas.functions.saveActiveComponentData();
  };

  const onResize = (event: any, { node, size, handle }: any) => {
    setViewBoxSize({ width: size.width, height: size.height });
    updateComponentLayout(size.width, size.height);
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
        { layout }
      );
    }
  }, []);

  useEffect(() => {
    console.log(activeId, showOptionsBox, "for checking slider");
    const component = manager.canvasManager.getComponentData(id);
    loadSize(component);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, showOptionsBox]);

  return (
    <>
      <Resizable
        width={viewBoxSize.width}
        height={viewBoxSize.height}
        minConstraints={[280, height]}
        onResize={onResize}
        resizeHandles={
          id.includes("Text") && !isEditable ? [] : ["s", "e", "se"]
        }
      >
        <div
          ref={viewBoxRef}
          onClick={() => setIsFlashcardDraggable(false)}
          className={`m-2 border-2 border-slate-500 rounded ${
            id.includes("Text") && !isEditable ? "border-none" : "border-dotted"
          }`}
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
            data,
            currIndex,
            isFlashcardDraggable
          )}
        </div>
      </Resizable>

      {showOptionsBox && activeId.includes("Slider") && id.includes("Text") && (
        <div className="z-[500]">
          <ObjectivesInputs manager={manager} />
        </div>
      )}

      {showOptionsBox &&
        activeId.includes("Slider") &&
        id.includes("Image") && (
          <div className="z-[500]">
            <ImageObjectivesInputs manager={manager} />
          </div>
        )}
    </>
  );
};

export default FlashcardViewBox;
