import { SlideData } from "components/SlideManager/handler";

export interface SidebarFunctions {
  addSlide: Function;
}

export interface EditorialCanvasInterface {
  slideData: SlideData;
  onDrop: (id: string) => void;
  handleDelete: (id: string) => void;
  dragItems: any[];
}

export interface CanvasComponentViewBox {
  id: string;
  handleDelete: (id: string) => void;
  canvasRef: React.MutableRefObject<HTMLDivElement | null>;
}
