import React, { FC, useState } from "react";
import {
  LessonSlideInterface,
  LessonSlideScope,
  loadComponent,
} from "./SlideManager/handler";

interface Props {
  slides: any;
  changeTo: (index: number) => void;
}
const LeftSidebar: FC<Props> = ({ slides, changeTo }) => {
  console.log(slides);
  
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
  return (
    <div className="bg-white shadow relative w-full max-w-[20%] overflow-auto mb-20  pl-[33px] pr-[20px] overflow-y-auto  scrollbar">
      <h2 className="text-center pt-[35px] text-base text-[#87909E] font-normal">
        {slides.length} Slides
      </h2>
      <div className="w-full h-full mt-[44px] mb-12">
        {slides.map((item: any, index: number) => (
          <div className="relative" onClick={() => changeTo(index)} key={index}>
            <p className="absolute text-[#030036BD] text-sm -top-1 -left-[14px]">
              {index + 1}
            </p>
            <div className="text-preview relative z-0 border-[0.25px] border-[#4F46E5] shadow mb-5 p-2 py-3 h-[208px] overflow-hidden rounded-lg cursor-pointer hover:scale-105 duration-100">
              {item.map((component: any, index: number) => {
                const Component = loadComponent(component);
                return (
                  <Component key={index} data={component} slide={SlideScope} />
                );
              })}
            </div>
          </div>
        ))}
        <div className="pt-16"></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
