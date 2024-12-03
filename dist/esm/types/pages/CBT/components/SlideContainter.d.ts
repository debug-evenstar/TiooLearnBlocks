import { FC } from "react";
export interface SlideContainerProps {
    activeSlide: number;
    slideManagerRef: React.RefObject<any>;
    setActiveSlide: Function;
    lesson: any;
    answerProps: {
        updateAnswer: Function;
    };
    setCanProceed: Function;
    ref: any;
}
declare const SlideContainer: FC<SlideContainerProps>;
export default SlideContainer;
