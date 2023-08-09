import { LessonSlideInterface } from "../SlideManager/handler";

export interface FlashCardData {
    cards : any[];
}
export interface FlashCardComponentProps {
    data : FlashCardData;
    slide : LessonSlideInterface;
}

export const rotationClasses : {[key : string] : string}  =  {
    "1" : "w-full h-auto absolute rounded-lg transform rotate-[1deg]",
    "2" : "w-full h-auto absolute rounded-lg transform rotate-[2deg]",
    "3" : "w-full h-auto absolute rounded-lg transform rotate-[3deg]",
    "4" : "w-full h-auto absolute rounded-lg transform rotate-[4deg]",
    "5" : "w-full h-auto absolute rounded-lg transform rotate-[5deg]",
    "6" : "w-full h-auto absolute rounded-lg transform rotate-[6deg]",
    "7" : "w-full h-auto absolute rounded-lg transform rotate-[7deg]",
    "-1" : "w-full h-auto absolute rounded-lg transform rotate-[-1deg]",
    "-2" : "w-full h-auto absolute rounded-lg transform rotate-[-2deg]",
    "-3" : "w-full h-auto absolute rounded-lg transform rotate-[-3deg]",
    "-4" : "w-full h-auto absolute rounded-lg transform rotate-[-4deg]",
    "-5" : "w-full h-auto absolute rounded-lg transform rotate-[-5deg]",
    "-6" : "w-full h-auto absolute rounded-lg transform rotate-[-6deg]",
    "-7" : "w-full h-auto absolute rounded-lg transform rotate-[-7deg]",
}