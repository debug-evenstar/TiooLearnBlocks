import { ImageData } from "components/Image/handler";
import { LessonSlideInterface } from "../SlideManager/handler";
import { TextData } from "../Text/handler";
import { OptionData } from "components/Options/handler";
import { VideoData } from "components/Video/handler";
import { FlashCardData } from "components/FlashCards/handler";
import { WordMatchData } from "components/WordMatch/handler";
import { ButtonGroupData } from "components/ButtonGroup/handler";
export interface SliderData {
    slides: (TextData | ButtonGroupData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];
}
export interface SliderComponentProps {
    data: SliderData;
    slide: LessonSlideInterface;
}
export declare const sliderComponentStyles: any;
