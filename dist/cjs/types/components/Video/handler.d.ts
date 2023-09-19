import { LessonSlideInterface } from "../SlideManager/handler";
export interface VideoData {
    component: string;
    url: string;
}
export interface VideoComponentProps {
    data: VideoData;
    slide: LessonSlideInterface;
}
