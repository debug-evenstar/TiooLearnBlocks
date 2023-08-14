import { FC } from "react";
import { TextData } from "../Text/handler";
import { ButtonGroupData } from "../ButtonGroup/handler";
import { SliderData } from "../Slider/hander";
import { ImageData } from "../Image/handler";
import { FlashCardData } from "../FlashCards/handler";
import { VideoData } from "../Video/handler";
import { WordMatchData } from "../WordMatch/handler";
import { OptionData } from "../Options/handler";
interface SlideManagerProps {
    lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];
    canProceed: Function;
    handleFeedback: Function;
    ref: any;
}
declare const SlideManager: FC<SlideManagerProps>;
export default SlideManager;
