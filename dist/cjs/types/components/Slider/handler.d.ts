import { LessonSlideInterface } from "../SlideManager/handler";
import { TextData } from "../Text/handler";
export interface SliderData {
    slides: (TextData)[];
}
export interface SliderComponentProps {
    data: SliderData;
    slide: LessonSlideInterface;
}
