import { LessonSlideInterface } from "../SlideManager/handler";
export interface TextStyles {
    color?: string;
}
export interface ImageData {
    component: string;
    url: string;
}
export interface ImageComponentProps {
    data: ImageData;
    slide: LessonSlideInterface;
}
