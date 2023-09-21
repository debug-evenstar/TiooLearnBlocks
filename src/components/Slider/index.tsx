import React, { FC, useEffect, useRef, useState } from "react";
import chevronRight from "../../img/chevron-right.svg";
import chevronLeft from "../../img/chevron-left.svg";
import { SliderComponentProps, sliderComponentStyles } from "./handler";
import SlideManager from "components/SlideManager";

const SliderComponent: FC<SliderComponentProps> = ({ data, slide }) => {
  const sliderRef = useRef<any>();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [canProceed, setCanProceed] = useState<boolean>(true);

  const handleContinue = () => {
      const currentSlideIndex = sliderRef?.current?.activeSlideIndex();
      if( currentSlideIndex === (data.slides.length - 1) ) {
        // Last slide
        if(slide && slide.functions){
          slide.functions.canProceed(true);
        }
      } else {
        if(canProceed){
          sliderRef?.current?.navigator(1);
          //setCanProceed(false);
          // Disable feedbacks
        }
      }
  };

  const handlePrevious = () => {
      sliderRef?.current?.navigator(-1);
      // Disable feedbacks
  };

  const proceed = (val: boolean, state : number) => {
    setCanProceed(() => val);
    if(val){
      if(state === 1){
        handleContinue();
      }
    }
  };

  //Register slide data to parent slide
  useEffect(()=>{
    // let answers : any[] = [];
    // let options : any[] = [];
    // let feedbacks : any[] = [];
    // data.slides.forEach((slide)=>{
    //   slide.forEach((component : any)=>{
    //     answers = component.answers && component.answers.length 
    //       ? [...answers, ...component.answers]
    //       : answers
    //     options = component.options && component.options.length 
    //     ? [...options, ...component.options]
    //     : options
    //     feedbacks = component.feedbacks && component.feedbacks.length 
    //     ? [...feedbacks, ...component.feedbacks]
    //     : feedbacks
    //   });
    // })
    // slide.setAnswers([...(slide.answers ?? []), ...answers]);
    // slide.setOptions([...(slide.options ?? []), ...options]);
    // slide.setFeedbacks([...(slide.feedbacks ?? []), ...feedbacks]);
  },[])


  return (
    <>
      <div className="w-full py-4 flex flex-row justify-between items-center">
          <img
            src={chevronRight}
            onClick={() => {handlePrevious()}}
            alt="images"
            className={`h-[40px] ${
              activeSlide === 0 ? "opacity-0" : "cursor-pointer"
            }`}
          />
          <SlideManager
            lessonSlides={data.slides}
            canProceed={(val: boolean, state : number) => proceed(val, state)}
            handleFeedback={(text: string, type: string)=>{
              slide.functions && slide.functions.triggerFeedback(text, type)
            }}
            updateActiveSlide={(i:number) => setActiveSlide(i)}
            ref={sliderRef}
            parent={slide}
          />
          <img
            alt="images"
            onClick={() => {handleContinue()}}
            src={chevronLeft}
            className={`h-[40px] ${
              activeSlide === data.slides.length - 1 ? "opacity-0" : "cursor-pointer"
            }`}
          />
      </div>

      <div className="w-full flex flex-row justify-center">
        {data.slides.map((slide, index) => (
          <span className={`h-[10px] mx-[2px] border-[1px] border-white aspect-square block rounded-[10px] 
          ${index === activeSlide ? 'bg-white' : ''}`}
          ></span>
        ))}
      </div>
    </>
  );
};

export default SliderComponent;
