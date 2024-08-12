import { FC } from "react";
interface LessonPageProps {
    textbook: any;
    chapters: any;
    lessons: any;
    back?: Function;
}
declare const LessonPage: FC<LessonPageProps>;
export default LessonPage;
