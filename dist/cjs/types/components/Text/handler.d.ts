import { LessonSlideInterface } from "../SlideManager/handler";
interface TextStyles {
    color?: string;
}
export interface TextData {
    content: string;
    tips?: string[];
    answers?: string[];
    options?: string[];
}
export interface TextComponentProps {
    styles?: TextStyles;
    data: TextData;
    slide: LessonSlideInterface;
}
export declare const processTextStyles: () => void;
export declare const processTextContent: (content: string) => any;
export {};
