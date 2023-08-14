import { TextFieldsInterface } from "../extensions/TextFields";
export interface LessonSlideInterface {
    options?: string[];
    answers?: string[];
    status?: boolean;
    complete?: boolean;
    textFields?: TextFieldsInterface[];
    setAnswers: Function;
    setOptions: Function;
    setStatus: Function;
    addFields: Function;
    selectAnswer: Function;
    setFunction: Function;
    triggerFeedback: Function;
    functions?: {
        [key: string]: Function;
    };
    progress: number;
}
declare class LessonSlide implements LessonSlideInterface {
    options?: string[];
    answers?: string[];
    status?: boolean;
    complete?: boolean;
    textFields?: TextFieldsInterface[];
    functions?: {
        [key: string]: Function;
    };
    progress: number;
    setOptions(options: string[]): void;
    setAnswers(answers: string[]): void;
    setStatus(status: boolean): void;
    addFields(textFieldInstance: TextFieldsInterface): void;
    selectAnswer(index: number, value: string, callback: Function): void;
    selectOptionAnswer(index: number, value: string, callback: Function): void;
    callComponentFunctions(value: string): void;
    setFunction(functionName: string, handler: Function): void;
    triggerFeedback(): void;
    eventManager(): {
        on: (eventName: string, callback: any) => void;
        action: (eventName: string, data: any) => void;
    };
}
export declare const LessonSlideScope: () => LessonSlide;
export declare const loadComponent: (componentData: any) => any;
export {};
