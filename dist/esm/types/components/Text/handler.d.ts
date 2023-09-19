import { LessonSlideInterface } from "../SlideManager/handler";
interface TextStyles {
    color?: string;
}
export interface TextData {
    content: string;
    tips?: string[];
    answers?: any[];
    options?: string[];
}
export interface TextComponentProps {
    styles?: TextStyles;
    data: TextData;
    slide: LessonSlideInterface;
    altHeaderStyle: string;
}
export declare const processTextStyles: () => void;
export declare const formatTextContent: (content: string) => any;
export {};
