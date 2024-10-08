import { FC } from "react";
interface LessonPageProps {
    textbook: any;
    chapters: any;
    retake?: boolean;
    lesson?: any;
    back?: Function;
}
declare const LessonPage: FC<LessonPageProps>;
export default LessonPage;
