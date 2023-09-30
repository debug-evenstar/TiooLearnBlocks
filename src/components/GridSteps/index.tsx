import React, { ReactElement, useEffect, useState } from "react";
import { GridStepsComponentProps, axis, generateRows, gridOptions, handleSubmit, stepButton, stepsOptions, stepsView } from "./handler";

const GridSteps: React.FC<GridStepsComponentProps>= ({ data, slide }) => {
    const [targetPosition, setTargetPosition] = useState<number[]>(axis(data.start));
    const [endPosition, setEndPosition] = useState<number[]>(axis(data.end));
    const [size, setSize] = useState<number[]>(axis(data.size));
    const [steps, setSteps ] = useState<number>(data.steps);
    const [selectedSteps , setSelectedSteps] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [isExample, setIsExample] = useState<boolean>(data.example ?? false);

    const saveSelection = (step : any) => {
        if(selectedSteps.length < steps){
            setSelectedSteps((prev) => [...prev, step]);
        }
    }

    const selectedViews = (e? : boolean) => stepsView(selectedSteps,steps,e);

    const submit = () => {
        if( !isSolved() ) {
            setIsProcessing(() => true);
            handleSubmit(selectedSteps , setTargetPosition, size, () => {
                setIsProcessing(() => false);
            });
        }
    }

    const isSolved = () => (
        selectedSteps.length === steps && targetPosition[0] === endPosition[0] && targetPosition[1] === endPosition[1]
    );

    useEffect(()=>{
        if(!isProcessing){
            if(
                selectedSteps.length === steps
            ) {

                if( isSolved() ) {
                    setTimeout(()=>{
                        slide.updateProgress();
                        slide.triggerFeedback("success",0);
                    },100);
                } else {
                    setTimeout(()=>{
                        slide.triggerFeedback("failure",0);
                        setSelectedSteps(() => []);
                        setTargetPosition(() => axis(data.start));
                    },100);
                }
            }
        }
    },[isProcessing]);

    useEffect(()=>{
        if ( isExample ) {
            setSelectedSteps(() => [gridOptions[0], gridOptions[0], gridOptions[0]])
        } else {
            setSelectedSteps(()=>[]);
        }
        setTargetPosition(() => axis(data.start));
        slide.setAnswers(data.answers);
    },[isExample, data, slide]);

    return (
        <>
            <div className="w-11/12 max-w-[750px] mx-auto grid gap-y-3">
                <div className="w-full flex justify-between text-font">
                    <div className="w-[45%]">
                        <div className="w-full max-h-[450px] aspect-square border-[2px] border-black rounded-[2px] flex flex-col">
                            {generateRows(size[0], size[1], targetPosition, endPosition)}
                        </div>
                    </div>

                    <div className="w-[45%] border-blue-900 border-[2px] relative py-[10px]">
                        <p className="text-left px-[18px] text-black font-semibold"> Program </p>
                        <div className="w-full">
                            {!isExample ? selectedViews() : selectedViews(true)}
                        </div>
                        {isExample && <div className="w-[80%] text-center text-blue-800 font-semibold text-[14px] mx-auto mt-[40px]">
                            Each time you instruct the robot to "Move Right", it takes one step to the right direction
                        </div>}
                        {(selectedSteps.length === steps) && <div className="flex justify-center w-full absolute bottom-5">
                            <button 
                                className={`w-[40%] h-[30px] rounded-[12px] mx-auto cursor-pointer border-[1px] ${
                                    isSolved() ? "hidden" : "bg-[#E3E2FF] text-[#4f46e5] border-[#4f46e5]"
                                }`}
                                onClick={() => submit()}
                            >
                                RUN
                            </button>
                        </div>}
                    </div>
                </div>
                {!isExample && <><div className="text-font text-black font-light">
                    Using the following instructions, help the robot get to the cookie.
                </div>
                <div className="flex flex-wrap">
                    {stepsOptions(saveSelection)}
                </div></>}
            </div>
        </>
    );
};

export default GridSteps;
