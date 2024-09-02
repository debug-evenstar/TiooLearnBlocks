import { OptionInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { FC } from "react";
import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { LessonSlideInterface } from "components/SlideManager/handler";
declare const RenderOptions: FC<{
    options: OptionInterface[];
    answered: any[];
    setAnswered: Function;
    question: QuestionInterface;
    questionIndex: number;
    totalQuestions: number;
    slideManager: LessonSlideInterface;
    viewArea: any;
}>;
export default RenderOptions;
