import React, { FC, useEffect, useState } from "react";
import { PostfaceComponentProps } from "./handler";
import LineDecoration from "../../img/line-decoration.svg"
import BrainImage from "../../img/brain.svg"
import ThumbsUp from "../../img/thumbs-up.svg"
import ThumbsDown from "../../img/thumbs-down.svg"
import { ContinueBtn } from "components/Lesson/UI/CompButton";
const PostfaceComponent: FC<PostfaceComponentProps> = ({ data, slide }) => {
    const [feedback, setFeedback] = useState<any>(null);
    console.log(slide);
    return (
        <>
            <div className="w-[50%] mx-auto mt-[30px]">
                <img src={BrainImage} className="w-[80px] mx-auto" alt=""/>
                <p className="text-center text-[18px] mb-[25px]">Bravo!!! You have completed : { slide?.attributes.lessonTitle ?? "" }</p>
                <p className="text-center text-[25px] text-[#FF006E]">Key Terms</p>
                <img src={LineDecoration} className="w-[80%] mx-auto" alt=""/>
                <div className="mt-[30px] mx-auto">
                    {
                        data.terms.map((item) => (
                            <div className="flex w-full h-[30px] my-5 items-center justify-center">
                                <p className="text-[19px] text-center">{item}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center">
                    <p className="text-center text-[16px] my-[20px]">Did you enjoy this lesson? Give a feedback </p>
                    <img src={ThumbsUp} className={`w-[28px] ml-[15px] cursor-pointer transition-transform transition linear duration-[0.6s] hover:scale-125
                        ${feedback === 1 ? "scale-125" : ""}
                    `} onClick={() => setFeedback(1)} alt=""/>
                    <img src={ThumbsDown} className={`w-[28px] ml-[15px] cursor-pointer transition-transform transition linear duration-[0.6s] hover:scale-125
                        ${feedback === 0 ? "scale-125" : ""}
                    `} onClick={() => setFeedback(0)} alt=""/>
                </div>
                <div className="mx-auto w-fit mt-[50px]">
                    <ContinueBtn onClick={() => slide?.functions?.handleContinue()} title={"Next Lesson"}/>
                </div>
            </div>
        </>
    );
};

export default PostfaceComponent;
