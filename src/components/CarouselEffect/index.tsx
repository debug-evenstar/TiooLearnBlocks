import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { randomString } from "utilities/string";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

interface CarouselEffectProps {
    children: ReactElement[];
    activeSlideIndex: number;
}
const CarouselEffect: FC<CarouselEffectProps> = (props: any) => {
    const { children, activeSlideIndex } = props;
    const [activeIndex, setActiveIndex] = useState<number>(activeSlideIndex);
    const [uniqueId, setUniqueId] = useState<string>(randomString(5));
    const carouselRef = useRef<any>();
    const carouselContainerRef = useRef<any>();
    const {clientWidth, clientHeight} = document.documentElement;

    const gotoIndex = (index: number) => {
        if (index !== activeIndex && index >= 0) {
            const children = carouselRef.current.children;
            if (index > activeIndex) {
                carouselContainerRef.current.style.overflowX = "hidden";
                children[index].classList.add("slide-left-in");
                children[activeIndex].classList.add("slide-right-out");
                setTimeout(() => {
                    carouselContainerRef.current &&
                        carouselContainerRef.current.style.removeProperty(
                            "overflow-x"
                        );
                    setActiveIndex(() => index);
                }, 1100);
            } else {
                carouselContainerRef.current &&
                    (carouselContainerRef.current.style.overflowX = "hidden");
                children[index].classList.add("slide-right-in");
                children[activeIndex].classList.add("slide-left-out");
                setTimeout(() => {
                    carouselContainerRef.current.style.removeProperty(
                        "overflow-x"
                    );
                    setActiveIndex(() => index);
                }, 1100);
            }
        }
    };

    const internalStyles = {
        slideBox: {
            verticalAlign: "top",
        },
    };

    useEffect(() => {
        gotoIndex(activeSlideIndex);
    }, [activeSlideIndex, activeIndex]);

    return (
        <>
            {(
                <div
                    ref={carouselContainerRef}
                    className="w-full h-full mx-auto no-scrollbar"
                >
                    <div
                        id={uniqueId}
                        ref={carouselRef}
                        className="w-auto h-full whitespace-nowrap relative no-scrollbar"
                    >
                        {children instanceof Array &&
                            children?.map((child: any, index: number) => (
                                <div
                                    key={index}
                                    style={internalStyles.slideBox}
                                    className={`inline-block relative box-border left-0 no-scrollbar
                                ${
                                    activeIndex === index
                                        ? "slide-transition slisde-box w-full h-full opacity-100 px-[10px]"
                                        : "slide-box-clip opacity-0 w-[0px] h-[0px]"
                                }
                            `}
                                >
                                    {child}
                                </div>
                            ))}
                    </div>
                </div>
            )}
            {/* {(children && clientWidth <= 640) && (
                <div className="w-full h-full">
                    <Carousel
                        className="h-full"
                        swipeable={false}
                        showArrows={false}
                        showStatus={false}
                        showIndicators={false}
                        selectedItem={activeSlideIndex}
                        dynamicHeight={true}
                    >
                        {children?.map((child: any, index: number) => (
                            <div key={index} style={internalStyles.slideBox} className="h-full">
                                {child}
                            </div>
                        ))}
                    </Carousel>
                </div>
            )} */}
        </>
    );
};

export default CarouselEffect;
