import { ButtonGroupData } from "components/ButtonGroup/handler";
import { FlashCardData } from "components/FlashCards/handler";
import { GridStepsData } from "components/GridSteps/handler";
import { OptionData } from "components/Options/handler";
import { PostfaceData } from "components/Postface/handler";
import { PrefaceData } from "components/Preface/handler";
import { SliderData } from "components/Slider/handler";
import { TextData } from "components/Text/handler";
import { VideoData } from "components/Video/handler";
import { WordMatchData } from "components/WordMatch/handler";
import { EventManagerInterface } from "utilities/event";
declare global {
    interface Window {
        SlideEventListener: any;
    }
}
export type SlideData = (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData | GridStepsData | PrefaceData | PostfaceData)[];
export interface LessonSlideInterface {
    slide: any;
    options?: any[];
    answers?: any[];
    feedbacks?: any[];
    status?: boolean;
    complete?: boolean;
    parent: any;
    textFields?: any[];
    setAnswers: Function;
    setOptions: Function;
    setFeedbacks: Function;
    setStatus: Function;
    addFields: Function;
    selectAnswer: Function;
    setFunction: Function;
    setAttribute: Function;
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
    checkSlideCanProceed: Function;
    eventManager: EventManagerInterface;
}
declare class LessonSlide implements LessonSlideInterface {
    slide: any;
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
    parent: any;
    eventManager: EventManagerInterface;
    constructor(parent?: any);
    setOptions(options: string[]): void;
    setAnswers(answers: string[]): void;
    setFeedbacks(feedbacks: any[]): void;
    setStatus(status: boolean): void;
    setVideo(video: any): void;
    addFields(textFieldInstance: any): void;
    fillWithHint(): void;
    verifySubjectiveAnswer(input: string, answer: string | string[], callback?: Function): void;
    activateNextField(): void;
    selectAnswer(index: number, value: string, callback: Function): void;
    selectOptionAnswer(index: number, value: string, callback: Function): void;
    updateProgress(): void;
    callComponentFunctions(value: string): void;
    setFunction(functionName: string, handler: Function): void;
    setAttribute(attributeName: string, value: string): void;
    feedbackMessage(type: string, list: any[], index?: number): any;
    triggerFeedback(feedbackType: string, index?: number): void;
    registerSlideData(slide: any): void;
    resetData(): void;
    on(eventName: string, callback: any): any;
    dispatch(eventName: string, data?: any): void;
    checkSlideCanProceed: (slide: any, strict?: boolean) => boolean;
}
export declare const setPageTheme: (theme?: string) => void;
export declare const formatTextColor: (target: any, status: boolean) => void;
export declare const pageContainsYoutubeScript: () => boolean;
export declare const youtubeInit: () => void;
export declare const LessonSlideScope: (parent?: any) => LessonSlide;
export declare const loadComponent: (componentData: any) => any;
export {};
