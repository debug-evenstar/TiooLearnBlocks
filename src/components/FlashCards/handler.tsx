import { LessonSlideInterface } from "../SlideManager/handler";

export interface FlashCardData {
    cards : any[];
}
export interface FlashCardComponentProps {
    data : FlashCardData;
    slide : LessonSlideInterface;
}

export const rotationClassesImages : {[key : string] : string}  =  {
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

export const rotationClassesWords : {[key : string] : string}  =  {
    "1" : "w-full h-full px-[20px] py-[20px] bg-slate-300 text-black absolute flex justify-center items-center rounded-lg transform rotate-[1deg]",
    "2" : "w-full h-full px-[20px] py-[20px] bg-stone-300 text-black absolute flex justify-center items-center rounded-lg transform rotate-[2deg]",
    "3" : "w-full h-full px-[20px] py-[20px] bg-gray-300 text-black absolute flex justify-center items-center rounded-lg transform rotate-[3deg]",
    "4" : "w-full h-full px-[20px] py-[20px] bg-red-100 text-black absolute flex justify-center items-center rounded-lg transform rotate-[4deg]",
    "5" : "w-full h-full px-[20px] py-[20px] bg-orange-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[5deg]",
    "6" : "w-full h-full px-[20px] py-[20px] bg-amber-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[6deg]",
    "7" : "w-full h-full px-[20px] py-[20px] bg-yellow-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[7deg]",
    "-1" : "w-full h-full px-[20px] py-[20px] bg-lime-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-1deg]",
    "-2" : "w-full h-full px-[20px] py-[20px] bg-green-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-2deg]",
    "-3" : "w-full h-full px-[20px] py-[20px] bg-teal-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-3deg]",
    "-4" : "w-full h-full px-[20px] py-[20px] bg-cyan-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-4deg]",
    "-5" : "w-full h-full px-[20px] py-[20px] bg-sky-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-5deg]",
    "-6" : "w-full h-full px-[20px] py-[20px] bg-indigo-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-6deg]",
    "-7" : "w-full h-full px-[20px] py-[20px] bg-purple-50 text-black absolute flex justify-center items-center rounded-lg transform rotate-[-7deg]",
}