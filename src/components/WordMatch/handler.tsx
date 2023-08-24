/* -------------------------- COMPONENT INTERFACES -------------------------- */

import { hasIdenticalIndex } from "../../utilities/array";
import { LessonSlideInterface } from "../SlideManager/handler";

export interface WordMatchData {
    answers: string[];
    options: string[];
    feedbacks : any[];
}

export interface WordMatchComponentProps {
    data: WordMatchData;
    slide: LessonSlideInterface;
}

export const optionStyles = {
    active: "w-[100%] h-[100%] py-[20px] px-[15px] bg-[#86A94B] text-white polygon-clip text-left",
    inactive:
        "w-[100%] h-[100%] py-[20px] px-[15px] bg-white text-[#87909E] polygon-clip text-left",
    answered : "w-[100%] h-[100%] py-[20px] px-[15px] bg-[#66803C] polygon-clip text-left"
};


export const anwserStyles = {
    inactive:
    "w-[60%] border-[2px] rounded-[6px] border-[#86A94B] bg-white text-[#87909E] py-[10px] px-[15px] cursor-pointer",
    answered : "w-[60%] border-[2px] rounded-[6px] border-[#86A94B] bg-[#66803C] py-[10px] px-[15px] cursor-pointer",
    failed : "w-[60%] border-[2px] rounded-[6px] border-white bg-[#F17B0C] py-[10px] px-[15px] cursor-pointer"
};

export const shuffleAnswers = (answers: string[]) => {
    const shuffled = [...answers];
    while ( hasIdenticalIndex(shuffled, answers) ) {
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
    }
    return shuffled;
};
