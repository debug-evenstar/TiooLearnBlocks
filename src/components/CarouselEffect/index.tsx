import React, { FC, ReactElement, useEffect, useRef, useState } from "react";
import { randomString } from "utilities/string";
interface CarouselEffectProps {
    children : ReactElement[];
    activeSlideIndex : number
}
const CarouselEffect : FC<CarouselEffectProps> = (props : any) => {
    const { children , activeSlideIndex} = props;
    const [activeIndex, setActiveIndex] = useState<number>(activeSlideIndex);
    const [uniqueId, setUniqueId] = useState<string>(randomString(5));
    const carouselRef = useRef<any>();
    const carouselContainerRef = useRef<any>();

    const gotoIndex = (index : number) => {
        if(index !== activeIndex && index >= 0) {
            const children = carouselRef.current.children;
            if(index > activeIndex){
                carouselContainerRef.current.style.overflowX = "hidden";
                children[index].classList.add("slide-left-in");
                children[activeIndex].classList.add("slide-right-out");
                setTimeout(()=>{
                    carouselContainerRef.current.style.removeProperty("overflow-x");
                    setActiveIndex(() => index);
                },1500);
            }else{
                carouselContainerRef.current.style.overflowX = "hidden";
                children[index].classList.add("slide-right-in");
                children[activeIndex].classList.add("slide-left-out");
                setTimeout(()=>{
                    carouselContainerRef.current.style.removeProperty("overflow-x");
                    setActiveIndex(() => index);
                },1500);
            }

        }
    }

    const internalStyles = {
        slideBox : {
            verticalAlign : "top"
        }
    };

    useEffect(()=>{
        gotoIndex(activeSlideIndex);
    }, [activeSlideIndex, activeIndex]);

    return (
        <>
            <div ref={carouselContainerRef} className="w-full mx-auto">
                <div id={uniqueId} ref={carouselRef} className="w-auto whitespace-nowrap relative">
                    {(children instanceof Array) && children?.map((child : any, index : number) => (
                        <div 
                            style={internalStyles.slideBox}
                            className={`inline-block relative box-border left-0
                                ${activeIndex === index ? "slide-transition slide-box w-full h-auto opacity-100 px-[10px]" : "slide-box-clip opacity-0 w-0 h-0"}
                            `}
                        >
                            {child}
                        </div>
                    ))}
                    {/* <div className={`h-[400px] slide-transition inline-block bg-red-500
                                ${activeSlideIndex === 0 ? "opacity-100 px-[10px] w-[760px]" : "opacity-100 w-0"}
                            `}></div>
                    <div className={`h-[400px] slide-transition inline-block bg-green-500
                                ${activeSlideIndex === 1 ? "opacity-100 px-[10px] w-[760px]" : "opacity-100 w-0"}
                            `}></div>
                    <div className={`h-[400px] slide-transition inline-block bg-yellow-500
                                ${activeSlideIndex === 2 ? "opacity-100 px-[10px] w-[760px]" : "opacity-100 w-0"}
                            `}></div>
                    <div className={`h-[400px] slide-transition inline-block bg-orange-500
                                ${activeSlideIndex === 3 ? "opacity-100 px-[10px] w-[760px]" : "opacity-100 w-0"}
                            `}></div> */}
                </div>
            </div>
        </>
    );
};

export default CarouselEffect;
