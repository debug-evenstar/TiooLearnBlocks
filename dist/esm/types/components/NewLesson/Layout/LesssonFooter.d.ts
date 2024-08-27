/// <reference types="react" />
interface LessonFooterProps {
    previous: () => void;
    currentLesson: any;
    hasPrevious: boolean;
    isPreview: boolean;
    closePreview: Function | undefined;
    next: Function | undefined;
    chatVisible: boolean;
    feedbackRef: React.RefObject<any>;
    handleShowAI: () => void;
}
declare const LessonFooter: import("react").ForwardRefExoticComponent<LessonFooterProps & import("react").RefAttributes<unknown>>;
export default LessonFooter;
