import { FC } from "react";
import { ComponentBaseDataInterface } from "components/interface";
import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
interface Props {
    close: Function;
    slide: {
        id: number;
        slide_index: number;
        slide_data: ComponentBaseDataInterface[];
        lesson_id: number;
    };
    questions: QuestionInterface[];
    updateSlideQuestions: Function;
}
declare const QuestionManager: FC<Props>;
export default QuestionManager;
