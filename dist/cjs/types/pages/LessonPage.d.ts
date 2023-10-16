import { FC } from "react";
interface LessonPageProps {
    subject: string;
    className: string;
    title: string;
    slides: any[];
    back: Function;
}
declare const LessonPage: FC<LessonPageProps>;
export default LessonPage;
