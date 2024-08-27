import { FC } from "react";
import { SlideData } from "./handler";
interface SlideManagerProps {
    lessonSlides: SlideData[];
    canProceed: Function;
    canFeedbackProceed?: Function;
    handleFeedback: Function;
    updateActiveSlide: Function;
    ref: any;
    parent?: any;
    altHeaderStyle?: string;
    handleContinue?: Function;
    lessonTitle?: string;
}
declare const SlideManager: FC<SlideManagerProps>;
export default SlideManager;
