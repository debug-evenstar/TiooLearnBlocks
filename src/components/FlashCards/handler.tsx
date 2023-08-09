import { LessonSlideInterface } from "../SlideManager/handler";

export interface FlashCardData {
    cards : any[];
}
export interface FlashCardComponentProps {
    data : FlashCardData;
    slide : LessonSlideInterface;
}