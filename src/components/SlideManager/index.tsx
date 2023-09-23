import React, { FC, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { LessonSlideInterface, LessonSlideScope, loadComponent, youtubeInit } from "./handler";
import { TextData } from "../Text/handler";
import { ButtonGroupData } from "../ButtonGroup/handler";
import { SliderData } from "../Slider/handler";
import { ImageData } from "../Image/handler";
import { FlashCardData } from "../FlashCards/handler";
import { VideoData } from "../Video/handler";
import { WordMatchData } from "../WordMatch/handler";
import { OptionData } from "../Options/handler";
import CarouselEffect from "components/CarouselEffect";

interface SlideManagerProps {
  lessonSlides: (TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | VideoData | WordMatchData | OptionData)[][];
  canProceed : Function;
  handleFeedback : Function;
  updateActiveSlide : Function;
  ref: any;
  parent? : any;
  altHeaderStyle?: string
}

const SlideManager: FC<SlideManagerProps> = forwardRef(({ lessonSlides, canProceed, handleFeedback, updateActiveSlide, parent, altHeaderStyle}, ref) => {
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope(parent));
  const [FalseScope] = useState<LessonSlideInterface>(LessonSlideScope(parent));
  const [activeSlide, setActiveSlide] = useState<any>(lessonSlides[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [hintIsActive, setHintIsActive] = useState<boolean>(false);

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

  const performSlideChange = (index : number) => {
    const nextSlide = lessonSlides[index];
    setActiveSlide(() => nextSlide);
    setActiveSlideIndex(() => index);
    updateActiveSlide(index);
    SlideScope.registerSlideData(nextSlide);
    if( checkSlideCanProceed(nextSlide) ) {
      setTimeout(()=>{
        canProceed(true, 0);
      },1500)
    }else {
      setTimeout(()=>{
        canProceed(false, 0);
      },500)
    }
    setHintIsActive(false);
  }


  const checkSlideCanProceed = (slide : any, strict : boolean = false) => {
    let activate = true;
    const blockProceed = ["ButtonGroup", "FlashCards","Slider","WordMatch","Video","Options"];
    for (let i = 0; i < slide.length; i++) {
      const data = slide[i];
      if(data && blockProceed.includes(data.component)){     
        activate = false;
        if( strict ){ 
          // Check for progress match answers
          if(SlideScope.answers && SlideScope.answers.length > 0) {
            activate = (SlideScope.progress === SlideScope.answers.length);
          }
          // Check for video ended
          if (SlideScope.video) {
            activate = SlideScope.video.ended;
          }
        }
      }
      if(data && data.component === "Text" && data.answers && SlideScope.answers){
        activate = (SlideScope.progress === SlideScope.answers.length);
      }
    }
    return activate;
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

  const proceed = (slide : any, state : number = 1) => {
    if ( checkSlideCanProceed(slide , true) ){
      canProceed(true, state);
    } else {
      canProceed(false, state);
    }
  }

  const preloadImages = (slides : any[]) => {
    for (let i = 0; i < slides.length; i++) {
      const slide : any= slides[i];
      for (let j = 0; j < slide.length; j++) {
        const componentData = slide[j];
        if(componentData.component === "Image"){
          (new Image()).src = componentData.url;
        }
        if(componentData.component === "Slider"){
          preloadImages(componentData.slides);
        }
      }
    }
  }

  useEffect(()=>{
    SlideScope.setFunction('allowProceed', () => proceed(activeSlide));
    SlideScope.setFunction('canProceed', canProceed);
    proceed(activeSlide, 0);
  },[ activeSlide ])

  // Core effects
  useEffect(()=>{
    SlideScope.setFunction('navigateSlide', navigateSlide);
    SlideScope.setFunction('triggerFeedback', (message: string, type : string) => handleFeedback(message, type));
    SlideScope.setFunction('setHint', (val:boolean) => setHintIsActive(val));
    SlideScope.registerSlideData(activeSlide);
    preloadImages(lessonSlides);
  },[]);

  

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
  };
  return (
    <div style={containerStyle}>
        {/* {SlideScope && <div className="w-full mx-auto w-10/12 grid gap-y-5 my-5">
          {activeSlide.map((component: any, index: number) => {
            const Component = loadComponent(component);
            return <Component key={index} data={component} slide={SlideScope} />;
          })}
        </div>} */}

        {SlideScope && <div className="mx-auto w-10/12 grid gap-y-5 my-5">
          <CarouselEffect activeSlideIndex={activeSlideIndex}>
            {lessonSlides.map((slide : any, slideIndex : number) => (
              <div className="w-auto h-auto grid gap-y-5 my-5">
                {slide.map((component: any, index: number) => {
                  const Component = loadComponent(component);
                  return (
                    <Component 
                      key={index} 
                      data={component} 
                      slide={slideIndex === activeSlideIndex ? SlideScope : FalseScope} 
                      altHeaderStyle={altHeaderStyle} 
                    />
                  );
                })}
              </div>
            ))}
          </CarouselEffect>
        </div>}
        {hintIsActive && (
          <div className="w-full h-[30px] mt-[50px] mb-[10px] flex justify-end">
            <div 
              className="h-full cursor-pointer bg-[#86A94B] text-white text-font px-[20px] rounded-[5px]"
              onClick={() => SlideScope.fillWithHint()}
            >
                Give me a hint
            </div>
          </div>
        )}
    </div>
  );
});

// Run before component mount
youtubeInit();

export default SlideManager;
