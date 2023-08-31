import React, { FC, useState } from "react";
import SlideManager from "./SlideManager";
import {
  LessonSlideInterface,
  LessonSlideScope,
  loadComponent,
} from "./SlideManager/handler";
import { dummyData } from "utilities/data";

interface Props {
  slides: any;
  changeTo: (index:number) => void
}
const LeftSidebar: FC<Props> = ({ slides, changeTo }) => {
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
  return (
    <div className="border-r bg-white border-[#030036] border-opacity-10 shadow relative w-full h-screen max-w-[20%] overflow-auto   pl-[33px] pr-[20px] pb-[46px] overflow-y-auto  scrollbar">
      <h2 className="text-center pt-[35px] text-base text-[#87909E] font-normal">
        {slides.length} Slides
      </h2>
      <div className="w-full h-full mt-[64px] pb-[26px]">
        {slides.map((item: any, index:number) => (
          <div className="relative">
          <p className="absolute text-[#030036BD] text-sm -top-1 -left-[14px]">{index + 1}</p>
            <div className="text-preview relative z-0 border border-[#4F46E5] shadow mb-5 p-2 py-3 h-[208px] overflow-hidden rounded-lg cursor-pointer hover:scale-105 duration-100">
            {item.map((component: any, index: number) => {
              const Component = loadComponent(component);
              return (
                <Component key={index} data={component} slide={SlideScope} />
              );
            })}
            <div className="absolute z-10 w-full h-full top-0 left-0"></div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
