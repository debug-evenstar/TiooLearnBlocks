import { LessonSlideInterface } from "components/SlideManager/handler";

export interface PrefaceData {
    component : string;
    objectives : string[];
}

export interface PrefaceComponentProps {
    data: PrefaceData;
    slide: LessonSlideInterface;
}