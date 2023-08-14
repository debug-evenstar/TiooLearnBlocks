import { LessonSlideInterface } from "../SlideManager/handler";
export interface WordMatchData {
    answers: string[];
    options: string[];
}
export interface WordMatchComponentProps {
    data: WordMatchData;
    slide: LessonSlideInterface;
}
export declare const optionStyles: {
    active: string;
    inactive: string;
    answered: string;
};
export declare const anwserStyles: {
    inactive: string;
    answered: string;
};
export declare const shuffleAnswers: (answers: string[]) => string[];
