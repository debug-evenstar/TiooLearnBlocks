import { ManagerInterface } from "../Base/Manager";
import Image from "../Components/Image/Image";
import Text from "../Components/Text/Text";
import Background from "../Sidebars/RightSidebar/EditProperties/Background";
import Delete from "../Sidebars/RightSidebar/EditProperties/Delete";
import Extensions from "../Sidebars/RightSidebar/EditProperties/Extensions";
import TextProperties from "../Sidebars/RightSidebar/EditProperties/TextProperties";
import Video from "../Components/Video/Video";
import VideoProperties from "apps/Editorial/Sidebars/RightSidebar/EditProperties/VideoProperties";
import Flashcard from "../Components/Flashcard/Flashcard";
import AddImages from "../Sidebars/RightSidebar/EditProperties/FlashCard/AddImages";
import { toggleWrapperStyle } from "../Components/Text/handlers/stylesHandler";
import ImageProperties from "../Sidebars/RightSidebar/EditProperties/Image/ImageProperties";
import { useSelector } from "react-redux";
import { handleSetActiveCompName } from "provider/sliderSlice";
import Grid from "../Components/Grid/Grid";
import AddGrid from "../Sidebars/RightSidebar/EditProperties/Grid/AddGrid";
import GridType from "../Sidebars/RightSidebar/EditProperties/Grid/GridType/GridType";
import GridTheme from "../Sidebars/RightSidebar/EditProperties/Grid/GridTheme/GridTheme";
import EditGrid from "../Sidebars/RightSidebar/EditProperties/Grid/EditGrid";
import GridExtensions from "../Sidebars/RightSidebar/EditProperties/Grid/GridExtensions";

// Calculate the max area for resizing
export const calculateMaxResizableArea = (
  viewBoxPosition: DOMRect,
  canvasSize: DOMRect,
  hasHandles: boolean = false
) => {
  const maxRight = canvasSize.right - viewBoxPosition.left;
  const maxBottom = canvasSize.bottom - viewBoxPosition.top;
  return {
    maxWidth: hasHandles ? maxRight - 50 : maxRight,
    maxHeight: maxBottom,
  };
};




/* -------------------------------------------------------------------------- */
/*                                SOMETHING NEW                               */
/* -------------------------------------------------------------------------- */

interface ViewBoxHandlerInterface {
  // Some other properties and methods
  manager: ManagerInterface;
  setViewBoxStyle: Function;
}
export class ViewBoxHandler implements ViewBoxHandlerInterface {
  manager: ManagerInterface;
  constructor(manager: ManagerInterface) {
    this.manager = manager;
  }

  setViewBoxStyle(style: string, styleType: string) {
    const element = this.manager.canvasManager.activeComponentElement();
    if (!element) return;
    toggleWrapperStyle(element, style, styleType);
  }
}

export const resizeInputWidth = (input: HTMLInputElement) => {
  if (input) {
    const width = input.value.length * 8.5 + 20;
    input.style.width = `${width}px`;
  }
};
