import { FC } from "react";
import { TextData } from "../Text/handler";
import { ButtonGroupData } from "../ButtonGroup/handler";
import { SliderData } from "../Slider/handler";
import { ImageData } from "../Image/handler";
import { FlashCardData } from "../FlashCards/handler";
import { VideoData } from "../Video/handler";
import { WordMatchData } from "../WordMatch/handler";
import { OptionData } from "../Options/handler";
import { GridStepsData } from "components/GridSteps/handler";
interface SlideManagerProps {
    lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData | GridStepsData)[][];
    canProceed: Function;
    handleFeedback: Function;
    updateActiveSlide: Function;
    ref: any;
    altHeaderStyle?: string;
    parent?: any;
    altHeaderStyle?: string;
}
declare const SlideManager: FC<SlideManagerProps>;
export default SlideManager;
