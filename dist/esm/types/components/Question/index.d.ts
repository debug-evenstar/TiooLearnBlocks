import { FC } from "react";
import { LessonSlideInterface } from "components/SlideManager/handler";
interface QuestionComponentProps {
    data: any;
    slide: LessonSlideInterface;
    viewArea: any;
}
declare const QuestionComponent: FC<QuestionComponentProps>;
export default QuestionComponent;
