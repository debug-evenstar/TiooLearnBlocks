import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { FC } from "react";
declare const RenderInputs: FC<{
    inputs: any[];
    answered: any[];
    setAnswered: Function;
    questionIndex: number;
    question: QuestionInterface;
    totalQuestions: number;
}>;
export default RenderInputs;
