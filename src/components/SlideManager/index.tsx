import React, { FC, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { LessonSlideInterface, LessonSlideScope, handleSlideTransition, loadComponent, youtubeInit } from "./handler";
import { TextData } from "../Text/handler";
import { ButtonGroupData } from "../ButtonGroup/handler";
import { SliderData } from "../Slider/hander";
import { ImageData } from "../Image/handler";
import { FlashCardData } from "../FlashCards/handler";
import { VideoData } from "../Video/handler";
import { WordMatchData } from "../WordMatch/handler";
import { OptionData } from "../Options/handler";
import EventBus from "utilities/bus";

interface SlideManagerProps {
  lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];
  handleFeedback : Function;
  updateActiveSlide : Function;
  ref: any;
}

const SlideManager: FC<SlideManagerProps> = forwardRef(({ lessonSlides, handleFeedback, updateActiveSlide}, ref) => {
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
  const [activeSlide, setActiveSlide] = useState<any>(lessonSlides[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [nextSlide, setNextSlide] = useState<any>(lessonSlides[1]);
  const [activeSlidePosition, setActiveSlidePosition] = useState<number>(1);
  const [indexedSlides, setIndexedSlides] = useState<any[]>([
    false,lessonSlides[0],lessonSlides[1]
  ]);


  const canProceed = (val : boolean) => {
    EventBus.emit('continue', val);
  }

  const navigateSlide = (direction: number, slideIndex : any = null) => {
    if(slideIndex !== null && lessonSlides.length > slideIndex && slideIndex >= 0) {
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

  const updateSlideIndexes = (states : any, index : number) => {
    const stateIndexes = indexedSlides;
    setActiveSlidePosition(() => states.current);
    stateIndexes[states.current] = lessonSlides[index];
    stateIndexes[states.next] = lessonSlides.length > index + 1 ? lessonSlides[index+1] : false;
    stateIndexes[states.previous] = index !== 0 ? lessonSlides[index-1] : false;
    setIndexedSlides(() => [...stateIndexes]);
  }

  const performSlideChange = (index : number) => {
    handleSlideTransition((states : any)=>{
      const nextSlide = lessonSlides[index];
      setActiveSlide(() => nextSlide);
      setActiveSlideIndex(() => index);
      setNextSlide(() => lessonSlides[index+1]);
      updateSlideIndexes(states, index);
      updateActiveSlide(index);
      if( SlideScope.checkSlideCanProceed(nextSlide) ) {
        setTimeout(()=>{
          canProceed(true);
        },1500)
      }else{
        canProceed(false);
      }
      SlideScope.resetData();
    });
  }


  useImperativeHandle(ref, ()=> ({
    navigator(direction : number, slideIndex: number) {
      navigateSlide(direction, slideIndex);
      SlideScope.progress = 0;
    },
    activeSlide() {
      return activeSlide;
    },
    activeSlideIndex() {
      return activeSlideIndex;
    }
  }));

  const proceed = (slide : any) => {
    if ( SlideScope.checkSlideCanProceed(slide , true) ){
      canProceed(true);
    }
  }

  const preloadImages = (slides : any[]) => {
    slides.forEach((slide) => {
      slide.forEach((componentData : any) => {
        if(componentData.component === "Image"){
          (new Image()).src = componentData.url;
        }
      })
    });
  }

  useEffect(()=>{
    SlideScope.setFunction('allowProceed', () => proceed(activeSlide));
  },[ activeSlide, indexedSlides ])

  // Core effects
  useEffect(()=>{
    SlideScope.setFunction('navigateSlide', navigateSlide);
    SlideScope.setFunction('triggerFeedback', (message: string, type : string) => handleFeedback(message, type));
    preloadImages(lessonSlides);
  },[]);

  const slide = (index : number) => {
    return LessonSlideScope();
  }

  const containerStyle = {
  //   background:
  //   "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691354626/praxeum/Frame_1000004416_iflseu.png')",
  // backgroundSize: "100% 100%",
    width: "100%",
    margin: "0 auto",
    padding: "10px 30px",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    display : "flex",
    position : "relative"
  } as React.CSSProperties;

  return (
    <div style={containerStyle}>
        {
          <div className="w-full mx-auto w-10/12 grid gap-y-5 my-5 slide slide-previous">
          {indexedSlides[0] && indexedSlides[0].map((component: any, index: number) => {
            const Component = loadComponent(component);
            return <Component key={index} data={component} slide={activeSlidePosition === 0 ? SlideScope : slide(0)} />;
          })}
        </div>
        }
        {SlideScope && <div className="w-full mx-auto w-10/12 grid gap-y-5 my-5 slide slide-current">
          {indexedSlides[1].map((component: any, index: number) => {
            const Component = loadComponent(component);
            return <Component key={index} data={component} slide={activeSlidePosition === 1 ? SlideScope : slide(1)} />;
          })}
        </div>}
        {
          <div className="w-full mx-auto w-10/12 grid gap-y-5 my-5 slide slide-next">
          {indexedSlides[2] && indexedSlides[2].map((component: any, index: number) => {
            const Component = loadComponent(component);
            return <Component key={index} data={component} slide={activeSlidePosition === 2 ? SlideScope : slide(2)} />;
          })}
        </div>
        }
    </div>
  );
});

// Run before component mount
youtubeInit();

export default SlideManager;
