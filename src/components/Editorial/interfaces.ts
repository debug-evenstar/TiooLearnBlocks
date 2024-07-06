import { SlideData } from "components/SlideManager/handler";
import { ManagerInterface } from "./Base/Manager";
import { FeedbackType } from "components/NewLesson/Popups";

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
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any;
  currIndex?: number;
}

export interface Feedback {
  title : string;
  content : string;
}
