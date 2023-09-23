import { useEffect, useRef, useState } from "react";
import { randomString } from "utilities/string";

const CarouselEffect = (props : any) => {
    const { children , activeSlideIndex} = props;
    const [activeIndex, setActiveIndex] = useState<number>(activeSlideIndex);
    const [uniqueId, setUniqueId] = useState<string>(randomString(5));
    const carouselRef = useRef<any>();
    const gotoIndex = (index : number) => {
        const calculatedWidth = carouselRef.current.offsetWidth;
        carouselRef.current.style.left = `-${index * calculatedWidth}px`;
        setActiveIndex(() => index)
    }
    useEffect(()=>{
        gotoIndex(activeSlideIndex);
    },[activeSlideIndex]);
    return (
        <>
            <div className="w-full h-auto mx-auto">
                <div id={uniqueId} ref={carouselRef} className="w-auto h-auto whitespace-nowrap relative left-0 slide-transition">
                    {(children instanceof Array) && children?.map((child : any, index : number) => (
                        <div 
                            className={`w-full h-auto inline-block slide-transition px-[10px]
                                ${activeSlideIndex === index ? "opacity-100" : "opacity-0"}
                            `}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CarouselEffect;
