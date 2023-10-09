import { LessonSlideInterface } from "../SlideManager/handler";

export interface TextStyles {
    color?: string;
}

export interface OptionData {
    component : string;
    options : string[],
    answers : string[]
}
export interface OptionsComponentProps {
    data : OptionData;
    slide : LessonSlideInterface;
}

export const optionAlphabets = [
    "A","B","C","D","E","F","G","H","I","J","K","L"
]

export const optionStyles = {
    wrong: "w-full px-[20px] py-[15px] my-[15px] bg-[#F17B0C] rounded-[6px] text-left cursor-pointer",
    inactive:
        "w-full px-[20px] py-[15px] my-[15px] bg-white rounded-[6px] text-left cursor-pointer",
    correct : "w-full px-[20px] py-[15px] my-[15px] bg-[#86A94B] rounded-[6px] text-left cursor-pointer",
    answered : "w-full px-[20px] py-[15px] my-[15px] bg-[#AEC0C9] rounded-[6px] text-left cursor-pointer"
};
