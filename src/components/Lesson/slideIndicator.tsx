import React, { FC } from "react";

interface Props {
    num: number;
    active: number;
    changeSlide: Function;
}
const SlideIndicator: FC<Props> = ({ num, active, changeSlide }) => {
    const indicator = num;
    return (
        <div className="flex items-center justify-start gap-x-1 gap-y-1 flex-wrap w-full">
            {[...Array(indicator)].map((e, i) => (
                <div
                    key={i}
                    className={`${i >= active ? "bg-[#AEC0C9]" : "bg-white slide-prev"} ${
                        i === active ? "rhombus w-5 h-5 bg-white slide-prev" : "w-4 h-4"
                    } cursor-pointer rounded-[2px]`}
                    onClick={() => changeSlide(i)}
                ></div>
            ))}
        </div>
    );
};

export default SlideIndicator;
