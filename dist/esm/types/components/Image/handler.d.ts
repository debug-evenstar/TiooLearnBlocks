import { LessonSlideInterface } from "../SlideManager/handler";
export interface TextStyles {
    color?: string;
}
export interface ImageData {
    component: string;
    url: string;
    extensions?: any[];
}
export interface ImageComponentProps {
    data: ImageData;
    slide: LessonSlideInterface;
}
export declare const renderInputsAsOverlay: (inputs: any[], slide: LessonSlideInterface, callback: Function) => void;
