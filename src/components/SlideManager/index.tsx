/* ---------------------------------------------------------------------------------------------- */
/*                                       NEEDS SOME CLEAN UP                                      */
/* ---------------------------------------------------------------------------------------------- */

import React, {
    FC,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import {
    LessonSlideInterface,
    LessonSlideScope,
    loadComponent,
    setPageTheme,
    SlideData,
    youtubeInit,
} from "./handler";
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
import { PrefaceData } from "components/Preface/handler";
import { PostfaceData } from "components/Postface/handler";
import LayoutComponent from "components/LayoutBox";

interface SlideManagerProps {
    lessonSlides: SlideData[];
    canProceed: Function;
    canFeedbackProceed?: Function;
    handleFeedback: Function;
    updateActiveSlide: Function;
    ref: any;
    parent?: any;
    altHeaderStyle?: string;
    handleContinue?: Function;
    lessonTitle?: string;
}

const SlideManager: FC<SlideManagerProps> = forwardRef(
    (
        {
            lessonSlides,
            canProceed,
            canFeedbackProceed,
            handleFeedback,
            updateActiveSlide,
            parent,
            altHeaderStyle,
            handleContinue,
            lessonTitle,
        },
        ref
    ) => {
        const [SlideScope] = useState<LessonSlideInterface>(
            LessonSlideScope(parent)
        );
        const [FalseScope] = useState<LessonSlideInterface>(
            LessonSlideScope(parent)
        );
        const [slides, setSlides] = useState<any>(lessonSlides);
        const [activeSlide, setActiveSlide] = useState<any>(
            slides.length ? slides[0] : null
        );
        const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
        const [hintIsActive, setHintIsActive] = useState<boolean>(false);
        const hintRef = useRef<any>();
        const containerRef = useRef<any>();

        const navigateSlide = (direction: number, slideIndex: any = null) => {
            if (
                slideIndex !== null &&
                slides.length > slideIndex &&
                slideIndex >= 0
            ) {
                performSlideChange(slideIndex);
                return;
            }

            if (
                slides.length > activeSlideIndex + direction &&
                activeSlideIndex + direction >= 0
            ) {
                performSlideChange(activeSlideIndex + direction);
            }
        };

        const performSlideChange = (index: number) => {
            const nextSlide = slides[index];
            setActiveSlide(() => nextSlide);
            setActiveSlideIndex(() => index);
            updateActiveSlide(index);
            SlideScope.registerSlideData(nextSlide);
            setHintIsActive(false);
        };

        useImperativeHandle(ref, () => ({
            navigator(direction: number, slideIndex: number) {
                navigateSlide(direction, slideIndex);
                SlideScope.progress = 0;
            },
            activeSlide() {
                return activeSlide;
            },
            activeSlideIndex() {
                return activeSlideIndex;
            },
        }));

        // const proceed = (slide: any, state: number = 1) => {
        //     if (activeSlide.length) {
        //         if (
        //             activeSlide[0].component !== "Preface" &&
        //             activeSlide[0].component !== "Postface"
        //         ) {
        //             if (SlideScope.checkSlideCanProceed(slide, true)) {
        //                 canProceed(true, state);
        //             } else {
        //                 canProceed(false, state);
        //             }
        //         } else {
        //             canProceed(false);
        //         }
        //     }
        // };

        const preloadImages = (slides: any[]) => {
            for (let i = 0; i < slides.length; i++) {
                const slide: any = slides[i];
                for (let j = 0; j < slide.length; j++) {
                    const componentData = slide[j];
                    if (componentData.component === "Image") {
                        new Image().src = componentData.url;
                    }
                    if (componentData.component === "Slider") {
                        preloadImages(componentData.slides);
                    }
                }
            }
        };

        const loadSlideManager = (slideIndex: number) => {
            if (slideIndex === activeSlideIndex) {
                return SlideScope;
            }
            return FalseScope;
        };

        const beginLesson = () => {
            navigateSlide(1);
            // setSlides((prev: any) =>  prev.slice(1));
        };


        // Core effects
        useEffect(() => {
            activeSlide && SlideScope.registerSlideData(activeSlide);
            preloadImages(slides);
            SlideScope.setAttribute("lessonTitle", lessonTitle);
        }, []);



        useEffect(() => {
            SlideScope.on('showContinue', (data: any) => {
                canProceed(true, data);
            });

        }, [SlideScope]);

        useEffect(() => {
            // SlideScope.registerSlideData(activeSlide); // Removed because it happens on slide change already
            // activeSlide &&
            //     SlideScope.setFunction("allowProceed", () =>
            //         proceed(activeSlide)
            //     );
            // SlideScope.setFunction("canProceed", canProceed);
            SlideScope.setFunction("navigateSlide", navigateSlide);
            SlideScope.setFunction("setHint", (val: boolean) =>
                setHintIsActive(val)
            );
            SlideScope.setFunction(
                "handleContinue",
                () => handleContinue && handleContinue()
            );
            SlideScope.setFunction("beginLesson", () => beginLesson());
            // activeSlide && proceed(activeSlide, 0);
            if (!parent && activeSlide) {
                const compWithTheme = activeSlide.filter((c: any) => c.theme);
                setPageTheme(
                    compWithTheme.length ? compWithTheme[0].theme : null
                );
            }
        }, [activeSlide]);

        useEffect(() => {
            activeSlide && setActiveSlide(() => slides[0]);
            activeSlide && setActiveSlideIndex(() => 0);
        }, [parent]);

        useEffect(() => {
            SlideScope.setFunction(
                "triggerFeedback",
                (message: string, type: string) => handleFeedback(message, type)
            );
        }, [activeSlide, parent]);

        useEffect(() => {
            if (hintIsActive && hintRef?.current) {
                setTimeout(() => {
                    hintRef.current.classList.remove("opacity-0");
                }, 700);
            }
        }, [hintIsActive]);

        // Experimental to allow for editorial slide update
        useEffect(() => {
            setSlides(() => lessonSlides);
        }, [lessonSlides]);


        const RenderComponent: FC<{
            index: number,
            component: any,
            viewAreaRef: any,
            slideIndex: number
        }> = ({ index, component, viewAreaRef, slideIndex }) => {

            const Component = loadComponent(component);
            const [viewArea, setViewArea] = useState<any>();

            useEffect(() => {
                // Temporary solution
                const containerElement = viewAreaRef?.current;
                setViewArea(containerElement ? { width: containerElement?.clientWidth, height: containerElement?.clientHeight } : null);
                setTimeout(() => {
                    setViewArea(containerElement ? { width: containerElement?.clientWidth, height: containerElement?.clientHeight } : null);
                }, 1000);
            }, [viewAreaRef])

            return (
                <>
                    {
                        component.layout ? (
                            <LayoutComponent
                                key={index}
                                layout={component.layout}
                            >
                                <Component
                                    key={index}
                                    data={component}
                                    slide={loadSlideManager(
                                        slideIndex
                                    )}
                                    altHeaderStyle={altHeaderStyle}
                                    activeSlideIndex={
                                        activeSlideIndex
                                    }
                                    viewArea={viewArea}
                                />
                            </LayoutComponent>
                        ) : (
                            <Component
                                key={index}
                                data={component}
                                slide={loadSlideManager(
                                    slideIndex
                                )}
                                altHeaderStyle={altHeaderStyle}
                                activeSlideIndex={
                                    activeSlideIndex
                                }
                                viewArea={viewArea}
                            />
                        )
                    }
                </>
            );
        }


        return (
            <div
                ref={containerRef}
                className="w-full h-full mx-auto my-0 py-[10px] flex flex-col no-scrollbar slide-area"
            >
                {SlideScope && (
                    <CarouselEffect activeSlideIndex={activeSlideIndex}>
                        {slides.map((slide: any, slideIndex: number) => (
                            <div
                                key={slideIndex}
                                className={`w-auto h-auto grid gap-y-4 my-5 ${activeSlideIndex == slideIndex ? 'active-slide-class': ''}`}
                            >
                                {slide.map((component: any, index: number) => {
                                    return <RenderComponent
                                        key={index}
                                        index={index}
                                        component={component}
                                        slideIndex={slideIndex}
                                        viewAreaRef={containerRef}
                                    />
                                })}
                            </div>
                        ))}
                    </CarouselEffect>
                )}
                {hintIsActive && (
                    <div
                        ref={hintRef}
                        className="w-full h-[30px] mt-[50px] mb-[10px] flex justify-end opacity-0 slide-transition"
                    >
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
    }
);

// Run before component mount
youtubeInit();

export default SlideManager;
