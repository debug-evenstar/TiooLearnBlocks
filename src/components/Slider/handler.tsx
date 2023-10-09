import { ImageData } from "components/Image/handler";
import { LessonSlideInterface } from "../SlideManager/handler";
import { TextData } from "../Text/handler";
import { OptionData } from "components/Options/handler";
import { VideoData } from "components/Video/handler";
import { FlashCardData } from "components/FlashCards/handler";
import { WordMatchData } from "components/WordMatch/handler";
import { ButtonGroupData } from "components/ButtonGroup/handler";

export interface SliderData {
    slides : (TextData | ButtonGroupData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][]
}
export interface SliderComponentProps {
    data : SliderData;
    slide : LessonSlideInterface;
}

export const sliderComponentStyles : any = {
    Text : "py-12 px-4 mx-[40px] bg-[#F6ECEC] text-black grow rounded-lg",
    Image : "py-5 px-8"
}
