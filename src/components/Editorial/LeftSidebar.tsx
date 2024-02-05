import React, { FC, useState } from "react";
import {
  LessonSlideInterface,
  LessonSlideScope,
  loadComponent,
} from "../SlideManager/handler";
import { FaPlus } from "react-icons/fa";
import { EditorialManagerInterface } from "./Base/EditorialManager";
import { useDispatch } from "react-redux";
import { refreshActiveViewbox } from "provider/activeViewboxSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { ComponentBaseDataInterface } from "components/interface";
import LayoutComponent from "components/LayoutBox";

interface Props {
  slides: any;
  changeTo: (index: number) => void;
  data: any;
  manager: EditorialManagerInterface;
}
const LeftSidebar: FC<Props> = ({ slides, changeTo, data, manager }) => {
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());

  const handleChangeSlide = (index: number) => {
    changeTo(index);
    manager.setState("rightSidebarState", false);
    manager.setState("activeViewBox", "");
  };

  return (
    <div className="bg-white shadow relative w-full max-w-[20%] overflow-auto mb-20  pl-[33px] pr-[20px] overflow-y-auto  scrollbar">
      <h2 className="text-center pt-[35px] text-base text-[#87909E] font-normal">
        {slides.length} Slides
      </h2>
      <div className="w-full h-full mt-[44px] mb-12">
        {slides.map((item: any, index: number) => (
          <div
            className="relative h-[208px] border-[0.25px] border-[#4F46E5] mb-5 rounded-lg cursor-pointer hover:scale-105 duration-100"
            onClick={() => handleChangeSlide(index)}
            key={index}
          >
            <p className="absolute text-[#030036BD] text-sm -top-1 -left-[14px]">
              {index + 1}
            </p>
            <div className="absolute w-full h-full opacity-0 bg-gray-400 z-10"></div>
            <div className="text-preview relative z-0 shadow mb-5 p-2 py-3 h-[206px] overflow-hidden rounded-lg cursor-pointer hover:scale-105 duration-100">
              {item.map((component: ComponentBaseDataInterface, index: number) => {
                const Component = loadComponent(component);
                return component.layout ? (
                  <LayoutComponent layout={component.layout}>
                    <Component key={index} data={component} slide={SlideScope} />
                  </LayoutComponent>
                )
                :(
                  <Component key={index} data={component} slide={SlideScope} />
                );
              })}
            </div>
          </div>
        ))}
        <div
          className="relative h-[208px] grid place-content-center border-[0.25px] border-[#4F46E5] mb-5 rounded-lg cursor-pointer hover:scale-105 duration-100"
          onClick={() => manager.slideManager.addNewSlide()}
        >
          <div className="text-center">
            <span className="fw-600 text-xl">
              <FaPlus className="mx-auto" />
            </span>
            <p className="fs-500 fw-500 mt-2">Add Slide</p>
          </div>
        </div>
        <div className="pt-16"></div>
      </div>
    </div>
  );
};

export default LeftSidebar;
