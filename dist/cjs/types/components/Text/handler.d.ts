import { ComponentBaseDataInterface, ComponentBasePropsInterface } from "components/interface";
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
export interface TextComponentProps extends ComponentBasePropsInterface {
    styles?: TextStyles;
    data: TextData;
    activeSlideIndex: number;
    altHeaderStyle: string;
}
export declare const handleAnswerQuestion: (data: any) => void;
export declare const processTextStyles: () => void;
export declare const formatTextContent: (content: string) => any;
export declare const buildTextData: (data: string, viewArea: any) => string;
export {};
