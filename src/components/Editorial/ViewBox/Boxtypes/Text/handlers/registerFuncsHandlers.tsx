import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { toggleWrapperStyle } from "./stylesHandler";
import { addTooltip, replaceContent, toggleWrapper } from "./wrapperHandler";

export const registerFunctions = (
  manager: EditorialManagerInterface,
  getRange: () => Range | undefined,
  editableRef: React.RefObject<HTMLDivElement>,
  viewBoxRef: React.MutableRefObject<any>,
  setIdentifier: (id: string) => void,
  componentId: string
) => {
  manager.canvasManager.activeComponent.functions["toggleWrapper"] = (
    elementType: string,
    style: string = "",
    styleType: string = "",
    link: string = ""
  ) => {
    const range = getRange();
    if (range && range.toString()) {
      toggleWrapper(range, elementType, style, styleType, link);
    }

    const element = editableRef.current;
    if (styleType !== "position") return;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.activeComponent.functions["toggleWrapperStyle"] = (
    style: string = "",
    styleType: string
  ) => {
    const element = editableRef.current;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.activeComponent.functions["toggleTextStyle"] = (
    style: string = "",
    styleType: string
  ) => {
    const range = getRange();

    if (range && range.toString() && range.startOffset !== range.endOffset) {
      toggleWrapper(range, "span", style, styleType, "");
      return;
    }

    const element = viewBoxRef.current;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.activeComponent.functions["replaceContent"] = () => {
    const range = getRange();
    if (range && range.toString()) {
      const id = componentId + "-" + range?.toString() + "-" + Date.now();
      setIdentifier(id);
      replaceContent(range, id);
    }
  };

  manager.canvasManager.activeComponent.functions["addTooltip"] = (
    tip: string
  ) => {
    const range = getRange();
    range && range.toString() && addTooltip(range, tip);
  };
};
