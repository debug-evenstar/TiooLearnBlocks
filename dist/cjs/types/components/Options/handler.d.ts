import { LessonSlideInterface } from "../SlideManager/handler";
export interface TextStyles {
    color?: string;
}
export interface OptionData {
    component: string;
    options: string[];
    answers: string[];
}
export interface OptionsComponentProps {
    data: OptionData;
    slide: LessonSlideInterface;
}
export declare const optionAlphabets: string[];
export declare const optionStyles: {
    wrong: string;
    inactive: string;
    correct: string;
    answered: string;
};
