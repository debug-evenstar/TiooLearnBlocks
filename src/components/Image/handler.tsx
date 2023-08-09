import { LessonSlideInterface } from "../SlideManager/handler";

export interface TextStyles {
    color?: string;
}

export interface ImageData {
    url : string
}
export interface ImageComponentProps {
    data : ImageData;
    slide : LessonSlideInterface;
}
