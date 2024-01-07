import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { toggleWrapperStyle } from "./stylesHandler";
import { addTooltip, replaceContent, toggleWrapper } from "./wrapperHandler";

export const registerFunctions = (
  manager: EditorialManagerInterface,
  getRange: () => Range | undefined,
  handleSetContent: () => void,
  editableRef: React.RefObject<HTMLDivElement>,
  viewBoxRef: React.MutableRefObject<any>
) => {
  manager.canvasManager.activeComponent.functions["toggleWrapper"] = (
    elementType: string,
    style: string = "",
    link: string = ""
  ) => {
    const range = getRange();
    range && range.toString() && toggleWrapper(range, elementType, style, link);
    handleSetContent();
  };

  manager.canvasManager.activeComponent.functions["toggleWrapperStyle"] = (
    style: string = "",
    styleType: string
  ) => {
    const element = editableRef.current;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
    handleSetContent();
  };

  manager.canvasManager.activeComponent.functions["toggleTextStyle"] = (
    style: string = "",
    styleType: string
  ) => {
    const range = getRange();

    if (range && range.toString() && range.startOffset !== range.endOffset) {
      toggleWrapper(range, "span", style, "");
      return;
    }

    const element = viewBoxRef.current;
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  };

  manager.canvasManager.activeComponent.functions["replaceContent"] = () => {
    const range = getRange();
    range && range.toString() && replaceContent(range);
    console.log("replace called!");
    handleSetContent();
  };

  manager.canvasManager.activeComponent.functions["addTooltip"] = (
    tip: string
  ) => {
    const range = getRange();
    range && range.toString() && addTooltip(range, tip);

    handleSetContent();
  };
};
