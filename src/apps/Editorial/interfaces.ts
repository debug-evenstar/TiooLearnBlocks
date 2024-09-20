import { SlideData } from "components/SlideManager/handler";
import { ManagerInterface } from "./Base/Manager";

export interface SidebarFunctions {
  addSlide: Function;
}

export interface CanvasInterface {
  slideData: SlideData;
  manager: ManagerInterface;
}

export interface CanvasComponentViewBox {
  id: string;
  manager: ManagerInterface;
  handleDelete: (id: string) => void;
}

export interface CanvasMedia {
  id: string;
  manager: ManagerInterface;
  viewBoxRef: React.MutableRefObject<HTMLDivElement | null>;
  data?: any;
  currIndex?: number;
  isFlashcardDraggable?: boolean;
}

export interface CanvasText {
  id: string;
  manager: ManagerInterface;
  viewBoxRef: React.MutableRefObject<any>;
  data?: any;
  currIndex?: number;
  active : boolean;
}

export interface Feedback {
  title : string;
  content : string;
}
