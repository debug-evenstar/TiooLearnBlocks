import React, { FC, useEffect, useState } from "react";
import chevronRight from "../../img/chevron-right.svg";
import chevronLeft from "../../img/chevron-left.svg";
import { SliderComponentProps, sliderComponentStyles } from "./handler";
import { loadComponent } from "../SlideManager/handler";

const SliderComponent: FC<SliderComponentProps> = ({ data, slide }) => {
  const [activeSection, setActiveSection] = useState<any>(data.slides[0]);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [buttonGroupComponent, setButtonGroupComponent] = useState<any>();

  const moveSlide = (direction: number) => {
    if (
      activeSectionIndex + direction >= 0 &&
      activeSectionIndex + direction < data.slides.length
    ) {
      const nextActive = data.slides[activeSectionIndex + direction];
      setActiveSection(() => nextActive);
      setActiveSectionIndex(() => activeSectionIndex + direction);
      if(!("answers" in nextActive) || "options" in nextActive){
        slide.functions?.setHint(false);
      }
    }
  };

  const manualTransition = (direction : number) => {
    if(!slide.answers || slide.answers.length === 0 || !activeSection.answers){
      moveSlide(direction);
    }
  }

  slide.setFunction('moveSlide', moveSlide);

  const componentLoader = (component : any) => {
    const Component = loadComponent(component);
    return <Component data={component} slide={slide} />;
  }

  useEffect(() => {
    setButtonGroupComponent(() => ({
      component : "ButtonGroup",
      options : activeSection.options ?? [],
      answers : activeSection.answers ?? [],
      feedbacks : activeSection.feedbacks ?? []
    }));
  },[activeSection]);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-10/12 py-4 flex flex-row justify-between items-center">
          <img
            src={chevronRight}
            onClick={() => {manualTransition(-1)}}
            alt="images"
            className={`cursor-pointer h-[40px] ${
              data.slides.indexOf(activeSection) === 0 ? "hidden" : ""
            }`}
          />
          <div className={sliderComponentStyles[data.slides[activeSectionIndex].component]}>
            {componentLoader(data.slides[activeSectionIndex])}
          </div>
          <img
            alt="images"
            onClick={() => {manualTransition(1)}}
            src={chevronLeft}
            className={`cursor-pointer h-[40px] ${
              data.slides.indexOf(activeSection) === data.slides.length - 1 ? "hidden" : ""
            }`}
          />
        </div>
        <div className="w-full flex flex-row justify-center">
          {data.slides.map((slide, index) => (
            <span className={`h-[10px] mx-[2px] border-[1px] border-white aspect-square block rounded-[10px] 
            ${index === activeSectionIndex ? 'bg-white' : ''}`}
            ></span>
          ))}
        </div>
        {activeSection.options && buttonGroupComponent && (
          <div className="w-full flex justify-center">
            {componentLoader(buttonGroupComponent)}
          </div>
        )}
      </div>
    </>
  );
};

export default SliderComponent;
