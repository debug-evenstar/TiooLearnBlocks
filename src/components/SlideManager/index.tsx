import React, { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { LessonSlideInterface, LessonSlideScope, loadComponent, setPageTheme, youtubeInit } from "./handler";
import { TextData } from "../Text/handler";
import { ButtonGroupData } from "../ButtonGroup/handler";
import { SliderData } from "../Slider/handler";
import { ImageData } from "../Image/handler";
import { FlashCardData } from "../FlashCards/handler";
import { VideoData } from "../Video/handler";
import { WordMatchData } from "../WordMatch/handler";
import { OptionData } from "../Options/handler";
import CarouselEffect from "components/CarouselEffect";
import { GridStepsData } from "components/GridSteps/handler";

interface SlideManagerProps {
  lessonSlides: (
    TextData | ButtonGroupData | SliderData | ImageData | FlashCardData | 
    VideoData | WordMatchData | OptionData | GridStepsData)[][];
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
  const hintRef = useRef<any>();

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
    if( SlideScope.checkSlideCanProceed(nextSlide) ) {
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
    if ( SlideScope.checkSlideCanProceed(slide , true) ){
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

  const loadSlideManager = (slideIndex : number) => {
    if ( slideIndex === activeSlideIndex ) {
      return SlideScope;
    }
    return FalseScope;
  }

  // Core effects
  useEffect(()=>{
    SlideScope.registerSlideData(activeSlide);
    preloadImages(lessonSlides);
  },[]);


  useEffect(()=>{
    // SlideScope.registerSlideData(activeSlide); // Removed because it happens on slide change already
    SlideScope.setFunction('allowProceed', () => proceed(activeSlide));
    SlideScope.setFunction('canProceed', canProceed);
    SlideScope.setFunction('navigateSlide', navigateSlide);
    SlideScope.setFunction('setHint', (val:boolean) => setHintIsActive(val));
    proceed(activeSlide, 0);
    if( !parent ) {
      const compWithTheme = activeSlide.filter((c:any) => c.theme)
      setPageTheme(compWithTheme.length ? compWithTheme[0].theme : null);
    }
  },[ activeSlide ])

  useEffect(()=>{
    setActiveSlide(() => lessonSlides[0]);
    setActiveSlideIndex(() => 0);
  },[ parent ]);

  useEffect(()=>{
    SlideScope.setFunction('triggerFeedback', (message: string, type : string) => handleFeedback(message, type));
  },[ activeSlide, parent ])


  useEffect(()=>{
    if(hintIsActive && hintRef?.current ){
      setTimeout(()=>{
        hintRef.current.classList.remove("opacity-0");
      },700);
    } 
  },[hintIsActive]);


  

  const containerStyle = {
  //   background:
  //   "url('https://res.cloudinary.com/dic7regoe/image/upload/v1691354626/praxeum/Frame_1000004416_iflseu.png')",
  // backgroundSize: "100% 100%",
  };
  return (
    <div style={containerStyle} className="w-full h-full mx-auto my-0 py-[10px] flex flex-col no-scrollbar">
        {/* {SlideScope && <div className="w-full mx-auto w-10/12 grid gap-y-5 my-5">
          {activeSlide.map((component: any, index: number) => {
            const Component = loadComponent(component);
            return <Component key={index} data={component} slide={SlideScope} />;
          })}
        </div>} */}

        {SlideScope && <CarouselEffect activeSlideIndex={activeSlideIndex}>
            {lessonSlides.map((slide : any, slideIndex : number) => (
              <div key={slideIndex} className="w-auto h-auto grid gap-y-4 my-5">
                {slide.map((component: any, index: number) => {
                  const Component = loadComponent(component);
                  return (
                    <Component 
                      key={index} 
                      data={component} 
                      slide={loadSlideManager(slideIndex)} 
                      altHeaderStyle={altHeaderStyle}
                      activeSlideIndex={activeSlideIndex}
                    />
                  );
                })}
              </div>
            ))}
          </CarouselEffect>}
        {hintIsActive && (
          <div ref={hintRef} className="w-full h-[30px] mt-[50px] mb-[10px] flex justify-end opacity-0 slide-transition">
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
