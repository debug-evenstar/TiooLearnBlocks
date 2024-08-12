import { FC } from "react";
import { InputInterface, OptionInterface, OptionTypes } from "./Questions/ActiveQuestion";
interface Props {
    data: any;
    showComp: boolean;
    activeSlide: number;
    slides: any;
    lessonlist: any;
}
export interface QuestionInterface {
    hash: string;
    title: string;
    query: string;
    media: any[];
    optionType: OptionTypes;
    options?: OptionInterface[];
    inputs?: InputInterface[];
    topics?: any[];
}
declare const InactiveSidebar: FC<Props>;
export default InactiveSidebar;
