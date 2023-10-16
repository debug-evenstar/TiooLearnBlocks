import { LessonSlideInterface } from "components/SlideManager/handler";
export interface PostfaceData {
    component: string;
    terms: string[];
}
export interface PostfaceComponentProps {
    data: PostfaceData;
    slide: LessonSlideInterface;
}
