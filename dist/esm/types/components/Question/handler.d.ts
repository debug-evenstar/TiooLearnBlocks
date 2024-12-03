import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { OptionInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
export declare const triggerFeedback: (initiator: OptionInterface | QuestionInterface, lessonContext: any, shouldContinue?: boolean) => void;
export declare const getQuestionsComponent: (slide: any, hash: string) => any;
export declare const attachTextInputHandler: (element: HTMLElement, slide: any, onAnswer: Function) => void;
interface fillOptions {
    parentType: string;
    styles?: any;
}
export declare const handleAnswerQuestion: (data: any, options: fillOptions) => void;
export declare const decorateActiveInput: (input: HTMLInputElement, isSubjectiveQuestion?: boolean) => void;
export declare const disableInactiveInputs: (inputs: HTMLInputElement[]) => void;
export declare const tooltipListener: (container: HTMLElement) => void;
export {};
