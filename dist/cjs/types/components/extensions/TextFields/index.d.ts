/// <reference types="react" />
import { LessonSlideInterface } from "components/SlideManager/handler";
export interface TextFieldsInterface {
    data: (string | React.ReactElement)[];
    fieldIds: string[];
    fieldData: {
        [key: string]: string;
    };
    fieldReplacementFill: Function;
    triggerReplacement: Function;
    setFiller: Function;
    slide: LessonSlideInterface;
    setFieldValue: Function;
    answers: any[];
    options: any[];
    simulateAnswerWidth: Function;
    inputAnswerMatch: Function;
    slideScopeIndex: Function;
    registerField: Function;
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
    setFiller(id: any, callback: Function): void;
    setFieldValue(id: string, value: string, callback?: Function): void;
    fieldReplacementFill(value: string): import("react/jsx-runtime").JSX.Element;
    triggerReplacement(): void;
    formatTextField(answerIndex?: number): any;
    registerField(field: any): void;
    updateFieldInSlide(id: string): void;
    processTextFields(): (string | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>)[];
    simulateAnswerWidth(answer: string | string[]): number;
    inputAnswerMatch(input: string, answer: string | string[]): boolean;
    slideScopeIndex(id: string, answer: string | string[]): number;
}
export declare const simulateWidth: (answer: string | string[]) => number;
export declare const TextFields: (data: any, slide: LessonSlideInterface, answers: any[], options: any[]) => TextFieldsHandler;
export {};
