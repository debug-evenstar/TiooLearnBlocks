import { SlideData } from "components/SlideManager/handler";
import { ManagerInterface } from "./Manager";
export interface SlideManagerInterface {
    manager: ManagerInterface;
    slides: any[];
    activeSlide: number;
    saveSlide: Function;
    createSlide: Function;
    deleteSlide: Function;
    setActiveSlide: Function;
    saveComponentData: Function;
    handleSlidesUpdate: Function;
    updateLessonSlides: Function;
    addNewSlide: Function;
    reorderSlide: Function;
}
export declare class SlideManager implements SlideManagerInterface {
    manager: ManagerInterface;
    slides: any[];
    activeSlide: number;
    handleSlidesUpdate: Function;
    updateLessonSlides: Function;
    constructor(manager: ManagerInterface, slides: any[]);
    setActiveSlide(slide: number): void;
    activeSlideData(): any;
    addNewSlide(): void;
    saveComponentData(index: number, data: any, initialization?: boolean): void;
    saveSlide(slideId: number, payload: SlideData, callback: Function): Promise<void>;
    createSlide(index: number, lessonId: number, payload: SlideData, callback: Function): Promise<void>;
    reorderSlide(slideIndex: number, direction: number, callback: Function): Promise<void>;
    deleteSlide(slideIndex: number, callback?: Function): Promise<void>;
}
