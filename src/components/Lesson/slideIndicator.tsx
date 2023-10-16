import React, { FC } from "react";

interface Props {
    num: number;
    active: number;
    changeSlide: Function;
    hasPreface? : boolean;
    hasPostface? : boolean;
}
const SlideIndicator: FC<Props> = ({ 
    num, 
    active, 
    changeSlide,
    hasPreface = false, 
    hasPostface = false 
}) => {
    const indicator = hasPreface ? hasPostface ? num-2 : num-1 :num;
    return (
        <div className="flex items-center justify-start gap-x-1 gap-y-1 flex-wrap w-full">
            {[...Array(indicator)].map((e, i) => {
                let k = hasPreface ? i + 1 : i;
                return (<div 
                    key={k}
                    className={`${k >= active ? "bg-[#AEC0C9]" : "bg-white slide-prev"} ${
                        k === active ? "rhombus w-5 h-5 bg-white slide-prev" : "w-4 h-4"
                    } cursor-pointer rounded-[2px]`}
                    onClick={() => changeSlide(k)}
                ></div>)
            })}
        </div>
    );
};

export default SlideIndicator;
