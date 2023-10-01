/// <reference types="react" />
import { LessonSlideInterface } from "components/SlideManager/handler";
export interface TextFieldsInterface {
    data: (string | React.ReactElement)[];
    fieldIds: string[];
    fieldData: {
        [key: string]: string;
    };
    fieldReplacementFill: Function;
    slide: LessonSlideInterface;
    setFieldValue: Function;
    answers: any[];
    options: any[];
    simulateAnswerWidth: Function;
    inputAnswerMatch: Function;
    slideScopeIndex: Function;
}
declare class TextFieldsHandler implements TextFieldsInterface {
    data: (string | React.ReactElement)[];
    fieldIds: string[];
    fieldData: {
        [key: string]: any;
    };
    slide: LessonSlideInterface;
    answers: any[];
    options: any[];
    constructor(data: any, slide: LessonSlideInterface, answers?: any[], options?: any[]);
    getIdentifier(): string;
    generateToolTip(content: string): void;
    setFieldValue(id: string, value: string): void;
    fieldReplacementFill(index: number, value: string, data: any[]): any[];
    formatTextField(answerIndex?: number): {
        id: string;
        index: number;
        element: import("react/jsx-runtime").JSX.Element;
    };
    processTextFields(): (string | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>)[];
    simulateAnswerWidth(answer: string | string[]): number;
    inputAnswerMatch(input: string, answer: string | string[]): boolean;
    slideScopeIndex(id: string, answer: string | string[]): number;
}
export declare const simulateWidth: (answer: string | string[]) => number;
export declare const TextFields: (data: any, slide: LessonSlideInterface, answers: any[], options: any[]) => TextFieldsHandler;
export {};
