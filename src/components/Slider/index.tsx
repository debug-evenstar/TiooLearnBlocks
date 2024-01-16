import React, { FC, useEffect, useRef, useState } from "react";
import chevronRight from "../../img/chevron-right.svg";
import chevronLeft from "../../img/chevron-left.svg";
import chevronRightBlack from "../../img/chevron-right-black.svg";
import chevronLeftBlack from "../../img/chevron-left-black.svg";
import { SliderComponentProps } from "./handler";
import SlideManager from "components/SlideManager";
import { LessonSlideInterface } from "components/SlideManager/handler";

const SliderComponent: FC<SliderComponentProps> = ({ data, slide }) => {
  const sliderRef = useRef<any>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const [parentSlideScope, setParentSlideScope] =
    useState<LessonSlideInterface>(slide);

  const handleContinue = () => {
    const currentSlideIndex = sliderRef?.current?.activeSlideIndex();
    if (currentSlideIndex === data.slides.length - 1) {
      // Last slide
      if (slide && slide.functions) {
        slide.functions?.canProceed(true);
      }
    } else {
      if (canProceed) {
        // hideButtonsDuringTransition();
        setTimeout(() => {
          sliderRef?.current?.navigator(1);
        }, 50);
        //setCanProceed(false);
        // Disable feedbacks
      }
    }
  };

  const hideButtonsDuringTransition = () => {
    const btns = document.querySelectorAll(".slider-nav-btn");
    btns.forEach((element: any) => {
      element.style.opacity = 0;
      setTimeout(() => {
        element.style.removeProperty("opacity");
      }, 1200);
    });
  };

  const handlePrevious = () => {
    // hideButtonsDuringTransition();
    sliderRef?.current?.navigator(-1);
    // Disable feedbacks
  };

  const proceed = (val: boolean, state: number) => {
    setCanProceed(() => val);
    if (val) {
      if (state === 1) {
        handleContinue();
      } else {
        if (slide && slide.functions && slide.functions?.canProceed) {
          setTimeout(() => {
            slide.functions?.canProceed(val, 0);
          }, 1000);
        }
      }
    }
  };

  //Register slide data to parent slide
  useEffect(() => {
    setParentSlideScope(slide);
  }, [slide, activeSlide]);

  // Need to optimize dynamic image handling
  return (
    <>
      <div className="w-full py-4 flex flex-row justify-between items-center">
        <img
          src={chevronRight}
          onClick={() => {
            handlePrevious();
          }}
          alt="images"
          className={`h-[40px] slider-nav-btn theme-default ${
            activeSlide === 0 ? "opacity-0" : "cursor-pointer opacity-100"
          }`}
        />
        <img
          src={chevronRightBlack}
          onClick={() => {
            handlePrevious();
          }}
          alt="images"
          className={`h-[40px] slider-nav-btn theme-white ${
            activeSlide === 0 ? "opacity-0" : "cursor-pointer opacity-100"
          }`}
        />
        {parentSlideScope && (
          <SlideManager
            lessonSlides={data.slides}
            canProceed={(val: boolean, state: number) => proceed(val, state)}
            handleFeedback={(text: string, type: string) => {
              parentSlideScope.functions &&
                parentSlideScope.functions.triggerFeedback(text, type);
            }}
            updateActiveSlide={(i: number) => setActiveSlide(i)}
            ref={sliderRef}
            parent={parentSlideScope}
          />
        )}
        <img
          alt="images"
          onClick={() => {
            handleContinue();
          }}
          src={chevronLeft}
          className={`h-[40px] slider-nav-btn theme-default ${
            activeSlide === data.slides.length - 1
              ? "opacity-0"
              : "cursor-pointer opacity-100"
          }`}
        />
        <img
          alt="images"
          onClick={() => {
            handleContinue();
          }}
          src={chevronLeftBlack}
          className={`h-[40px] slider-nav-btn theme-white ${
            activeSlide === data.slides.length - 1
              ? "opacity-0"
              : "cursor-pointer opacity-100"
          }`}
        />
      </div>

      <div className="w-full flex flex-row justify-center">
        {data.slides.map((slide, index) => (
          <span
            key={index}
            className={`h-[10px] mx-[2px] border-[1px] border-white aspect-square block rounded-[10px] 
          ${index === activeSlide ? "bg-white" : ""}`}
          ></span>
        ))}
      </div>
    </>
  );
};

export default SliderComponent;
