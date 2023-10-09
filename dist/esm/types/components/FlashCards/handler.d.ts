import { LessonSlideInterface } from "../SlideManager/handler";
export interface FlashCardData {
    component: string;
    cards: any[];
}
export interface FlashCardComponentProps {
    data: FlashCardData;
    slide: LessonSlideInterface;
}
export declare const rotationClassesImages: {
    [key: string]: string;
};
export declare const rotationClassesWords: {
    [key: string]: string;
};
