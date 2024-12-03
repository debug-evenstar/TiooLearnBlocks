import { FC } from "react";
import { ComponentLayoutInterface } from "components/interface";
import { QuestionInterface } from "../InactiveSidebar";
import { Feedback } from "apps/Editorial/interfaces";
interface Props {
    question: QuestionInterface;
    setActiveQuestion: Function;
    setQuestions: Function;
}
export declare enum OptionTypes {
    Single = "single",
    Multiple = "multi",
    Button = "button"
}
export declare enum InputTypes {
    Objective = "objective",
    Subjective = "subjective"
}
export declare enum InputLinkedStates {
    Unlinked = 0,
    PendingLink = 1,
    Linked = 2
}
export interface OptionInterface {
    title: string;
    hash: string;
    value?: string;
    isAnswer?: boolean;
    feedback?: Feedback;
    layout?: ComponentLayoutInterface;
}
export interface InputInterface {
    hash: string;
    title: string;
    type: string;
    linkState?: number;
    layout?: ComponentLayoutInterface;
}
declare const ActiveQuestion: FC<Props>;
export default ActiveQuestion;
