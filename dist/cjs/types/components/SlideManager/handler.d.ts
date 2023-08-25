import { TextFieldsInterface } from "../extensions/TextFields";
export interface LessonSlideInterface {
    options?: any[];
    answers?: string[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    textFields?: TextFieldsInterface[];
    setAnswers: Function;
    setOptions: Function;
    setFeedbacks: Function;
    setStatus: Function;
    addFields: Function;
    selectAnswer: Function;
    setFunction: Function;
    triggerFeedback: Function;
    updateProgress: Function;
    functions?: {
        [key: string]: Function;
    };
    progress: number;
}
declare class LessonSlide implements LessonSlideInterface {
    options?: any[];
    answers?: string[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    textFields?: TextFieldsInterface[];
    functions?: {
        [key: string]: Function;
    };
    progress: number;
    SUCCESS_FEEDBACK: string;
    FAILURE_FEEDBACK: string;
    setOptions(options: string[]): void;
    setAnswers(answers: string[]): void;
    setFeedbacks(feedbacks: any[]): void;
    setStatus(status: boolean): void;
    addFields(textFieldInstance: TextFieldsInterface): void;
    selectAnswer(index: number, value: string, callback: Function): void;
    selectOptionAnswer(index: number, value: string, callback: Function): void;
    updateProgress(): void;
    callComponentFunctions(value: string): void;
    setFunction(functionName: string, handler: Function): void;
    feedbackMessage(type: string, list: any[], index?: number): any;
    triggerFeedback(feedbackType: string, index?: number): void;
    eventManager(): {
        on: (eventName: string, callback: any) => void;
        action: (eventName: string, data: any) => void;
    };
}
export declare const LessonSlideScope: () => LessonSlide;
export declare const loadComponent: (componentData: any) => any;
export {};
