import React, { useState, useRef, FC } from "react";
import { ContinueBtn, PreviousBtn } from "./UI/CompButton";
import SlideIndicator from "./slideIndicator";
import SuccessFeedback from "./SuccessFeedback";
import FailureFeedback from "./FailureFeedback";
import SlideManager from "components/SlideManager";

interface ComponentSlides {
    slides: any[];
    back : Function;
    title? : string;
}

const DesktopComponent: FC<ComponentSlides> = ({ slides , back, title}) => {
    const [SuccessFeed, setSuccessFeed] = useState(false);
    const [FailureFeed, setFailureFeed] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const slideManagerRef = useRef<any>(null);
    const [canProceed, setCanProceed] = useState<boolean>(true);

    const handleContinue = () => {
        const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
        if( currentSlideIndex === (slides.length - 1) ) {
            back();
        }else{
            slideManagerRef?.current?.navigator(1);
            setCanProceed(false);
            setSuccessFeed(false);
            setFailureFeed(false);
        }

    };

    const handlePrevious = () => {
        if( previousBtnVisible() ){
            slideManagerRef?.current?.navigator(-1);
            setCanProceed(false);
            setSuccessFeed(false);
            setFailureFeed(false);
        }
    };

    const changeSlide = (index: number) => {
        slideManagerRef?.current?.navigator(1, index);
        setSuccessFeed(false);
        setFailureFeed(false);
    };

    const triggerFeedback = (text: string, type: string) => {
        setMessage(text);
        if (type === "success") {
            setSuccessFeed(true);
            setFailureFeed(false);
        } else {
            setFailureFeed(true);
            setSuccessFeed(false);
        }
    };

    const slidesHavePreface = () => {
        return slides[0] && slides[0][0].component === "Preface";
    }

    const slidesHavePostface = () => {
        return slides[slides.length - 1][0].component === "Postface";
    }

    const indicatorVisible = () => {
        return ((slidesHavePreface() && activeSlide !== 0) || (!slidesHavePreface())) && 
            ((slidesHavePostface() && activeSlide !== slides.length-1) || (!slidesHavePostface()))
    }

    const previousBtnVisible = () => {
        return ((slidesHavePreface() && activeSlide !== 1) || (!slidesHavePreface())) && activeSlide > 0 ;
    }

    const continueBtnVisible = () => {
        return ((slidesHavePostface() && activeSlide !== slides.length - 1) || (!slidesHavePostface())) && canProceed && !SuccessFeed ;
    }

    return (
        <>
            <div className="h-full flex grow justify-between items-end relative overflow-y-scroll custom-scrollbar">
                <div className="w-[120px] h-full mb-[15px] ml-2 relative" onClick={() => handlePrevious()}>
                    <div className="fixed w-full bottom-5">
                        {previousBtnVisible() && ( <PreviousBtn title="Previous" prev />)}
                    </div>
                </div>
                
                <div className="h-full lg:w-[calc(100%_-_300px)] flex flex-col pb-[20px] no-scrollbar">
                    <div className="fixed top-[50px] right-[8%] w-[150px]">
                        {(indicatorVisible()) && <SlideIndicator
                            num={slides.length}
                            active={activeSlide}
                            changeSlide={changeSlide}
                            hasPreface={slidesHavePreface()}
                            hasPostface={slidesHavePostface()}
                        />}
                    </div>
                    <div className="mt-4 w-full bg-cover rounded-lg min-h-[70vh] place-center grow fw-600 no-scrollbar">
                        <SlideManager
                            lessonSlides={slides}
                            ref={slideManagerRef}
                            canProceed={(val: boolean) => setCanProceed(val)}
                            handleFeedback={(text: string, type: string) =>
                                triggerFeedback(text, type)
                            }
                            updateActiveSlide={(i:number) => setActiveSlide(i)}
                            handleContinue={() => handleContinue()}
                            lessonTitle={title}
                        />
                    </div>
                </div>
                <div
                    className={"w-[120px] h-full mb-[15px] mr-2 relative"}
                    onClick={() => handleContinue()}
                >
                    <div className="fixed w-full bottom-5">
                        {continueBtnVisible() && (<ContinueBtn title="Continue" />)}
                    </div>
                </div>
            </div>
            <div>
                {SuccessFeed && (
                    <SuccessFeedback
                        close={() => setSuccessFeed(false)}
                        message={message}
                        canProceed={canProceed}
                        proceed={() => handleContinue()}
                    />
                )}
                {FailureFeed && (
                    <FailureFeedback
                        close={() => setFailureFeed(false)}
                        message={message}
                    />
                )}
            </div>
        </>
    );
};

export default DesktopComponent;
