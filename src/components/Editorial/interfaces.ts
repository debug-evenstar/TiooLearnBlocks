import { SlideData } from "components/SlideManager/handler";
import { EditorialManagerInterface } from "./Base/EditorialManager";

export interface SidebarFunctions {
  addSlide: Function;
}

export interface EditorialCanvasInterface {
  slideData: SlideData;
  manager: EditorialManagerInterface;
}

export interface CanvasComponentViewBox {
  id: string;
  manager: EditorialManagerInterface;
  handleDelete: (id: string) => void;
}

export interface CanvasImage {
  id: string;
}

export interface CanvasText {
  id: string;
  manager: EditorialManagerInterface;
  viewBoxRef: React.MutableRefObject<any>;
}
