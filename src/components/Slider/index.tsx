import React, { FC, useState } from "react";
import chevronRight from "../../img/chevron-right.svg";
import chevronLeft from "../../img/chevron-left.svg";
import { SliderComponentProps } from "./handler";
import { loadComponent } from "../SlideManager/handler";

const SliderComponent: FC<SliderComponentProps> = ({ data, slide }) => {
  const [activeSection, setActiveSection] = useState<any>(data.slides[0]);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);

  const moveSlide = (direction: number) => {
    if (
      activeSectionIndex + direction >= 0 &&
      activeSectionIndex + direction < data.slides.length
    ) {
      setActiveSection(() => data.slides[activeSectionIndex + direction]);
      setActiveSectionIndex(() => activeSectionIndex + direction);
    }
  };

  slide.setFunction('moveSlide', moveSlide);

  const componentLoader = (component : any) => {
    const Component = loadComponent(component);
    return <Component data={component} slide={slide} />;
  }

  return (
    <>
      <div className="w-full flex flex-row justify-center">
        <div className="w-9/12 py-6 flex flex-row justify-between items-center">
          <img
            src={chevronRight}
            onClick={() => {}}
            alt="images"
            className={`cursor-pointer h-[40px] ${
              data.slides.indexOf(activeSection) === 0 ? "hidden" : ""
            }`}
          />
          <div className="py-8 px-4 mx-[40px] bg-[#F6ECEC] text-black grow rounded-lg">
            {componentLoader(data.slides[activeSectionIndex])}
          </div>
          <img
            alt="images"
            onClick={() => {}}
            src={chevronLeft}
            className={`cursor-pointer h-[40px] ${
              data.slides.indexOf(activeSection) === data.slides.length - 1 ? "hidden" : ""
            }`}
          />
        </div>
      </div>
    </>
  );
};

export default SliderComponent;
