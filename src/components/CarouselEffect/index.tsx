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
    // const gotoIndex = (index : number) => {
    //     if(index !== activeSlideIndex) {
    //         carouselRef.current.style.overflowX = "hidden";
    //         const children = carouselRef.current.children;
    //         // Remove slide transition effect on slide to show
    //         // Set width to full
    //         // children[index].classList.remove("slide-transition");
    //         children[index].style.width = "760px";
    //         // children[index].classList.add("slide-transition");
    //         // // Set active index width to 0
    //         // children[activeSlideIndex].style.width = "0px";
    //         const calculatedWidth = carouselRef.current.offsetWidth;
    //         // carouselRef.current.style.left = `-${index * calculatedWidth}px`;
    //         setActiveIndex(() => index)
    //     }
    // }
    // const gotoIndex = (index : number) => {
    //     if(index !== activeIndex) {
    //         const children = carouselRef.current.children;
    //         // Remove slide transition effect on slide to show
    //         // Set width to full
    //         children[index].classList.remove("slide-transition");
    //         children[index].style.width = "100%";
    //         // children[index].classList.add("slide-transition");
    //         // // Set active index width to 0
    //         const calculatedWidth = carouselRef.current.offsetWidth;
    //         // Manually simulate transition
    //         children[activeIndex].style.opacity = "0";
    //         setTimeout(()=>{
    //             children[index].classList.add("slide-transition");
    //             children[index].style.left = `-${calculatedWidth}px`;
    //             children[index].style.opacity = "1";
    //             children[index].classList.add("px-[10px]");
    //             setTimeout(()=>{
    //                 children[index].style.removeProperty("left");
    //                 children[index].style.removeProperty("opacity");
    //                 children[activeIndex].style.removeProperty("opacity");
    //                 setActiveIndex(() => index)
    //             },500);
    //         },10);
    //     }
    // }

    const gotoIndex = (index : number) => {
        if(index !== activeIndex && index >= 0) {
            const children = carouselRef.current.children;
            if(index > activeIndex){
                children[index].classList.add("slide-left-in");
                children[activeIndex].style.opacity = "0";
                setTimeout(()=>{
                    children[activeIndex].style.removeProperty("opacity");
                    setActiveIndex(() => index);
                },1000);
            }else{
                children[index].classList.add("slide-right-in");
                children[activeIndex].style.opacity = "0";
                children[activeIndex].style.left = "100%";
                setTimeout(()=>{
                    children[activeIndex].style.removeProperty("opacity");
                    children[activeIndex].style.removeProperty("left");
                    setActiveIndex(() => index);
                },1000);
            }

        }
    }

    useEffect(()=>{
        gotoIndex(activeSlideIndex);
    },[activeSlideIndex, activeIndex]);

    return (
        <>
            <div className="w-full mx-auto">
                <div id={uniqueId} ref={carouselRef} className="w-auto whitespace-nowrap relative">
                    {(children instanceof Array) && children?.map((child : any, index : number) => (
                        <div 
                            className={`inline-block relative box-border left-0 align-top
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
