import { ReactNode } from "react";
import "./LessonLayout.css";
export interface LessonLayoutProps {
    textbook: any;
    chapters: any;
    lesson?: any;
    sideBar?: boolean;
    children?: ReactNode;
    retake?: boolean;
    back?: Function;
    lessonSlides?: Function;
    closePreview?: Function;
}
interface NavigationHandles {
    previous: Function;
    continue: Function;
}
interface LessonStateActions {
    setActiveSlide: Function;
    setCanProceed: Function;
}
export interface LessonSlideProps {
    managerRef: React.RefObject<any>;
    navigationHandles: NavigationHandles;
    slides: any[];
    stateActions: LessonStateActions;
}
export default function LessonLayout({ textbook, chapters, retake, children, lesson, back, sideBar, closePreview, lessonSlides, }: LessonLayoutProps): import("react/jsx-runtime").JSX.Element;
export {};
