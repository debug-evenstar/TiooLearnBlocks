import { ComponentBaseDataInterface } from "components/interface";
import { LessonSlideInterface } from "../SlideManager/handler";
interface TextStyles {
    color?: string;
    fontSize?: string;
}
export interface TextData extends ComponentBaseDataInterface {
    component: string;
    content: string;
    tips?: string[];
    answers?: any[];
    options?: string[][];
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
