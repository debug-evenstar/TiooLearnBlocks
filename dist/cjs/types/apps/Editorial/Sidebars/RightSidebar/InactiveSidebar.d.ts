import { FC } from "react";
import { InputInterface, OptionInterface, OptionTypes } from "./Questions/ActiveQuestion";
import { Feedback } from "apps/Editorial/interfaces";
interface Props {
    data: any;
    showComp: boolean;
    activeSlide: number;
    slides: any;
    lessonlist: any;
}
export declare enum QuestionTypes {
    "Multichoice" = "multichoice",
    "Subjective" = "subjective"
}
export interface QuestionInterface {
    hash: string;
    title: string;
    query: string;
    media: any[];
    type: QuestionTypes;
    optionType: OptionTypes;
    options?: OptionInterface[];
    inputs?: InputInterface[];
    answer?: string;
    feedback?: Feedback;
    topics?: any[];
    useOptionLayout?: boolean;
    layoutBoxConfig?: any;
    explanation?: string | string[];
}
declare const InactiveSidebar: FC<Props>;
export default InactiveSidebar;
