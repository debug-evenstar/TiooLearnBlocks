import React, { useRef, useState, FC } from "react";
import SlideIndicator from "./slideIndicator";
import MobileSuccessFeedback from "./MobileSuccess";
import MobileFailureFeedback from "./MobileFailure";
import SlideManager from "components/SlideManager";


interface ComponentSlides {
    slides: any[];
    back : Function;
    title? : string;
}

const MobileComponent: FC<ComponentSlides> = ({ slides , back, title}) => {
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
        slideManagerRef?.current?.navigator(-1);
        setCanProceed(false);
        setSuccessFeed(false);
        setFailureFeed(false);
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
        }
    };

    return (
        <>
            <div className="flex justify-between items-center mt-8">
                <div className="w-full">
                    <SlideIndicator
                        num={slides.length}
                        active={activeSlide + 1}
                        changeSlide={changeSlide}
                    />
                    <div className="h-[400px] border mt-4 w-full bg-cover rounded-lg">
                        <SlideManager
                            lessonSlides={slides}
                            ref={slideManagerRef}
                            canProceed={(val: boolean) => setCanProceed(val)}
                            handleFeedback={(text: string, type: string) =>
                                triggerFeedback(text, type)
                            }
                            updateActiveSlide={(i: number) => setActiveSlide(i)}
                        />
                    </div>
                </div>
                {/* nav buttons */}
                <div>
                    {canProceed && (
                        <p
                            className="fixed bottom-0 right-0 p-5 py-3 rounded-tl-[30px] text-center fw-600 text-xl text-white bg-[#86A94B] w-5/12"
                            onClick={() => handleContinue()}
                        >
                            Continue
                        </p>
                    )}
                    {activeSlide > 0 && (
                        <p
                            className="fixed bottom-0 left-0 p-5 py-3 rounded-tr-[30px] text-center fw-700 text-xl text-[#27397A] bg-[#E3E2FF] w-5/12"
                            onClick={() => handlePrevious()}
                        >
                            Previous
                        </p>
                    )}
                </div>
            </div>
            <div>
                {SuccessFeed && (
                    <MobileSuccessFeedback
                        close={() => setSuccessFeed(false)}
                        message={message}
                        canProceed={canProceed}
                        proceed={() => handleContinue()}
                    />
                )}
                {FailureFeed && (
                    <MobileFailureFeedback
                        close={() => setFailureFeed(false)}
                        message={message}
                    />
                )}
            </div>
        </>
    );
};

export default MobileComponent;
