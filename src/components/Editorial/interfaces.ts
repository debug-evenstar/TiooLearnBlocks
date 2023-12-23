import { SlideData } from "components/SlideManager/handler";

export interface SidebarFunctions {
  addSlide: Function;
}

export interface EditorialCanvasInterface {
  slideData: SlideData;
}

export interface CanvasComponentViewBox {
  id: string;
  handleDelete: (id: string) => void;
}

export interface CanvasImage {
  id: string;
}

export interface CanvasText {
  id: string;
  viewBoxRef: React.MutableRefObject<any>;
}
