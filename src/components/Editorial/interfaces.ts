import { SlideData } from "components/SlideManager/handler";
import { ReactElement, ReactNode } from "react";

export interface SidebarFunctions {
  addSlide: Function;
}

export interface EditorialCanvasInterface {
  slideData: SlideData;
  onDrop: (id: string) => void;
  handleDelete: (id: string) => void;
  dragItems: any[];
}

export interface BoxConfiguration {
  width : number;
  height : number;
  xOffset : number;
  yOffset : number;
}

export interface CanvasComponentViewBox {
  id: string;
  children? : React.ReactNode;
  boxConfiguration : BoxConfiguration;
  updateBoxConfiguration : Function;
}

export interface CanvasComponentEditBox {
  id: string;
  children? : React.ReactNode;
  boxConfiguration : BoxConfiguration;
}

export interface CanvasImage {
  id: string;
}

export interface CanvasText {
  id: string;
  viewBoxRef: React.MutableRefObject<any>;
}
