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
    altHeaderStyle: string;
}
export declare const processTextStyles: () => void;
export declare const formatTextContent: (content: string) => any;
export declare const buildTextData: (data: string, viewArea: any) => string;
export declare const decorateActiveInput: (input: HTMLInputElement) => void;
export {};
