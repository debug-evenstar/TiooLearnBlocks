declare global {
    interface Window {
        SlideEventListener: any;
    }
}
export interface LessonSlideInterface {
    options?: any[];
    answers?: any[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    textFields?: any[];
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
    attributes: {
        [key: string]: any;
    };
    progress: number;
    video: any;
    setVideo: Function;
    resetData: Function;
    on: Function;
    dispatch: Function;
    fillWithHint: Function;
    verifySubjectiveAnswer: Function;
    registerSlideData: Function;
}
declare class LessonSlide implements LessonSlideInterface {
    options?: any[];
    answers?: string[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    textFields?: any[];
    functions?: {
        [key: string]: Function;
    };
    attributes: {
        [key: string]: any;
    };
    progress: number;
    video: any;
    answered: any[];
    SUCCESS_FEEDBACK: string;
    FAILURE_FEEDBACK: string;
    eventsStorage: any;
    setOptions(options: string[]): void;
    setAnswers(answers: string[]): void;
    setFeedbacks(feedbacks: any[]): void;
    setStatus(status: boolean): void;
    setVideo(video: any): void;
    addFields(textFieldInstance: any): void;
    fillWithHint(): void;
    verifySubjectiveAnswer(index: number, input: string, answer: string | string[]): void;
    activateNextField(): void;
    selectAnswer(index: number, value: string, callback: Function): void;
    selectOptionAnswer(index: number, value: string, callback: Function): void;
    updateProgress(): void;
    callComponentFunctions(value: string): void;
    setFunction(functionName: string, handler: Function): void;
    feedbackMessage(type: string, list: any[], index?: number): any;
    triggerFeedback(feedbackType: string, index?: number): void;
    registerSlideData(slide: any): void;
    resetData(): void;
    eventManager(): {
        on: (eventName: string, callback: any) => void;
        trigger: (eventName: string, data: any) => void;
    };
    on(eventName: string, callback: any): void;
    dispatch(eventName: string, data?: any): void;
}
export declare const formatTextColor: (target: any, status: boolean) => void;
export declare const youtubeInit: () => void;
export declare const LessonSlideScope: () => LessonSlide;
export declare const loadComponent: (componentData: any) => any;
export {};
