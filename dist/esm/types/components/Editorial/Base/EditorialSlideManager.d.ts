import { SlideData } from "components/SlideManager/handler";
import { EditorialManagerInterface } from "./EditorialManager";
export interface EditorialSlideManagerInterface {
    manager: EditorialManagerInterface;
    slides: any[];
    activeSlide: number;
    saveSlide: Function;
    setActiveSlide: Function;
    saveComponentData: Function;
    handleSlidesUpdate: Function;
}
export declare class EditorialSlideManager implements EditorialSlideManagerInterface {
    manager: EditorialManagerInterface;
    slides: any[];
    activeSlide: number;
    handleSlidesUpdate: Function;
    constructor(manager: EditorialManagerInterface, slides: any[]);
    setActiveSlide(slide: number): void;
    activeSlideData(): any;
    saveComponentData(index: number, data: any, initialization?: boolean): void;
    saveSlide(slideId: number, payload: SlideData, callback: Function): void;
}
