import React, { FC, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { LessonSlideInterface, LessonSlideScope, loadComponent } from "./handler";
import { TextData } from "../Text/handler";
import { ButtonGroupData } from "../ButtonGroup/handler";
import { SliderData } from "../Slider/hander";
import { ImageData } from "../Image/handler";
import { FlashCardData } from "../FlashCards/handler";
import { VideoData } from "../Video/handler";
import { WordMatchData } from "../WordMatch/handler";
import { OptionData } from "../Options/handler";

interface SlideManagerProps {
  lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];
  canProceed : Function;
  handleFeedback : Function;
  updateActiveSlide : Function;
  ref: any;
}

const SlideManager: FC<SlideManagerProps> = forwardRef(({ lessonSlides, canProceed, handleFeedback, updateActiveSlide}, ref) => {
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
  const [activeSlide, setActiveSlide] = useState<any>(lessonSlides[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const navigateSlide = (direction: number, slideIndex : any = null) => {
    console.log("Navv");
    console.log(direction);
    console.log(slideIndex);
    if(slideIndex && lessonSlides.length > slideIndex && slideIndex >= 0) {
      performSlideChange(slideIndex);
      return;
    }

    if (
      lessonSlides.length > activeSlideIndex + direction &&
      activeSlideIndex + direction >= 0
    ) {
      performSlideChange(activeSlideIndex + direction);
    }
  };

  const performSlideChange = (index : number) => {
    const nextSlide = lessonSlides[index];
    setActiveSlide(() => nextSlide);
    setActiveSlideIndex(() => index);
    updateActiveSlide(index);
    if( checkSlideCanProceed(nextSlide) ) {
      setTimeout(()=>{
        canProceed(true);
      },1500)
    }
  }


  const checkSlideCanProceed = (slide : any) => {
    let activate = true;
    const blockProceed = ["ButtonGroup", "FlashCards","WordMatch","Slider","Video","Options"];
    for (let i = 0; i < slide.length; i++) {
      const data = slide[i];
      if(data && blockProceed.includes(data.component)){
        activate = false;
      }
    }
    return activate;
  }

  useImperativeHandle(ref, ()=> ({
    navigator(direction : number, slideIndex: number) {
      console.log(direction);
      console.log(slideIndex);
      navigateSlide(direction, slideIndex);
      SlideScope.progress = 0;
    }
  }));


  useEffect(()=>{
    SlideScope.setFunction('navigateSlide', navigateSlide);
    SlideScope.setFunction('allowProceed', () => canProceed(true));
    SlideScope.setFunction('triggerFeedback', (message: string, type : string) => handleFeedback(message, type));
  },[]);

  

  const containerStyle = {
  //   background:
  //   "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691354626/praxeum/Frame_1000004416_iflseu.png')",
  // backgroundSize: "100% 100%",
    width: "100%",
    margin: "0 auto",
    padding: "10px 30px",
    color: "white",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  };
  return (
    <div style={containerStyle}>
        {SlideScope && <div className="w-full mx-auto w-10/12 grid gap-y-5 my-5">
          {activeSlide.map((component: any, index: number) => {
            const Component = loadComponent(component);
            return <Component key={index} data={component} slide={SlideScope} />;
          })}
        </div>}
    </div>
  );
});

export default SlideManager;
