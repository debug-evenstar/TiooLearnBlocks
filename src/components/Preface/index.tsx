import React, { FC, useEffect, useState } from "react";
import { PrefaceComponentProps } from "./handler";
import LineDecoration from "../../img/line-decoration.svg"
import PinkTick from "../../img/pink-tick.svg"
import { ContinueBtn } from "components/Lesson/UI/CompButton";
const PrefaceComponent: FC<PrefaceComponentProps> = ({ data, slide }) => {
    return (
        <>
            <div className="w-[50%] mx-auto mt-[30px]">
                <p className="text-center text-[25px] text-[#FF006E]">What you will learn in this lesson</p>
                <img src={LineDecoration} className="w-[80%] mx-auto" alt=""/>
                <div className="mt-[50px]">
                    {
                        data.objectives.map((item) => (
                            <div className="flex w-full h-[30px] my-5 items-center">
                                <img src={PinkTick} className="h-full mr-5" alt=""/>
                                <p className="text-[19px]">{item}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="mx-auto w-fit mt-[50px]">
                    <ContinueBtn onClick={() => slide?.functions?.beginLesson()} title={"Get Started"}/>
                </div>
            </div>
        </>
    );
};

export default PrefaceComponent;
