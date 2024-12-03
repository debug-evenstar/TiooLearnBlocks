import { LessonSlideInterface } from "./SlideManager/handler";
export interface PositionProperties {
    offset: number;
    offsetPercent?: number;
}
export interface ComponentPositionInterface {
    xAxis: PositionProperties;
    yAxis: PositionProperties;
}
export interface ComponentSizeInterface {
    width: number;
    widthPercent?: number;
    height: number;
    heightPercent?: number;
}
export interface ComponentLayoutInterface {
    position?: ComponentPositionInterface;
    size?: ComponentSizeInterface;
}
interface ComponentStylesInterface {
    backgroundColor?: string;
    borderProperties?: {
        radius: string;
        stroke: number;
    };
}
export interface FeedbackInterface {
    type: string;
    content: string;
}
export interface OptionInterface {
    answer: boolean;
    content: string;
    feedback: FeedbackInterface;
}
export type ObjectiveQuestionType = "OBJECTIVE";
export type SubjectiveQuestionType = "SUBJECTIVE";
export interface QuestionInterface {
    type: ObjectiveQuestionType | SubjectiveQuestionType;
    identifier: string;
    options?: OptionInterface[][] | OptionInterface[];
    answers?: string[][] | string[];
}
export interface ComponentBaseDataInterface {
    id?: string;
    component: string;
    theme: string | any;
    extensions?: any[];
    layout?: ComponentLayoutInterface;
    styles?: ComponentStylesInterface;
    canvas?: boolean;
    abstract?: boolean;
    questions?: QuestionInterface[];
}
export interface ComponentBasePropsInterface {
    slide: LessonSlideInterface;
    viewArea?: any;
}
export {};
