import { LessonSlideInterface } from "components/SlideManager/handler";
import { ReactElement } from "react";
import { functionsWithDelay } from "utilities/array";

export interface GridStepsData {
    size : string;
    start : string;
    end : string;
    steps : number;
    example? : boolean;
    theme? : string;
    answers? : any[];
}

export interface GridStepsComponentProps {
    data: GridStepsData;
    slide: LessonSlideInterface;
}

export const gridOptions = [
    { label : "MOVE RIGHT", action : "move", data : [1,0]},
    { label : "MOVE LEFT", action : "move", data : [-1,0]},
    { label : "MOVE UP", action : "move", data : [0,-1]},
    { label : "MOVE DOWN", action : "move", data : [0,1]}
];

export const axis = (position : string) => position.toLowerCase().split("x").map(a => parseInt(a));


export const generateCells = (x : number, targetPositionX : number|null, endPositionX : number|null) => {
    const cells : ReactElement[] = [];
    const width = 1/x * 100;
    let robotImage : any, cookieImage : any;
    try {
        robotImage = require("./assets/robot.png");
        cookieImage = require("./assets/cookie.png");
    } catch (error) {
        try{
            // Force dist to load from src // To be changed later
            robotImage = require("../../src/components/GridSteps/assets/robot.png");
            cookieImage = require("../../src/components/GridSteps/assets/cookie.png");
        }catch(e){}
    }
    for (let i = 0; i < x; i++) {
        cells.push(
            <div key={i} className={`w-1/${x} flex justify-center items-center aspect-square border-black ${i !== (x - 1)  ? "border-r-[2px]" : ""}`}>
                {targetPositionX && (targetPositionX === i + 1) && (
                    <img
                        className="w-[35px]"
                        src={robotImage}
                        alt="Robot"
                    />
                )}
                {endPositionX && (endPositionX === i + 1) && (
                    <img
                        className="w-[35px]"
                        src={cookieImage}
                        alt="Cookie"
                    />
                )}
            </div>
        );
    }
    return cells;
}


export const generateRows = (x : number, y : number, targetPosition : number[], endPosition : number[]) => {
    const rows : ReactElement[] = [];
    for (let i = 0; i < y; i++) {
        rows.push(
            <div key={i} className={`flex flex-1 w-full border-black ${i !== (y - 1)  ? "border-b-[2px]" : ""}`}>
                { generateCells(
                    x, 
                    targetPosition[1] === (i + 1) ? targetPosition[0] : null,
                    endPosition[1] === (i + 1) ? endPosition[0] : null
                ) }
            </div>
        );
    }
    return rows;
}

export const stepButton = (step : any, click? : Function) => {
    return (
        <div 
            className="px-[10px] text-font text-red-700 border-red-700 border-[1px] rounded-[10px] mr-[10px] cursor-pointer"
            onClick={() => { click && click(step) }}
        >
            {step.label}
        </div>
    );
}

export const stepsView = (selected : any[], steps : number, example? : boolean) => {
    const views : ReactElement[] = [];
    for (let i = 0; i < (example ? 3 : steps); i++) {
        views.push(
            <div key={i} className="flex items-center text-black text-[16px] font-light px-[18px] my-[5px]">
                {`${i + 1}. `}
                <div className="mx-[10px] text-[16px] font-light">
                    {
                        selected.length > i 
                            ? (<div>{selected[i].label}</div>)
                            : example ? <div>{gridOptions[0].label}</div> : ""
                    }
                </div>

            </div>
        );
    }
    return views;
}

export const stepsOptions = (save : Function) => {
    const optionBtns : ReactElement[] = [];
    for (let i = 0; i < gridOptions.length; i++) {
        optionBtns.push(
            <div key={i} className="flex mr-[10px] justify-between">
                {stepButton(gridOptions[i], (step : any) => { save(step); } )}
            </div>
        );
    }
    return optionBtns;
}

export const handleSubmit = (steps : any[], moveTarget : Function, gridSize : any[], callback : Function) => {
    let dataset = steps.map(step => step.data);
    let index = 0;
    const end = functionsWithDelay(
        dataset,
        (data : any) => {
            moveTarget((prev : any) => {
                const x = prev[0] + data[0];
                const y = prev[1] + data[1];
                if( x < 1 || y < 1 || x > gridSize[0] || y > gridSize[1]) {
                    end();
                    callback();
                    return prev;
                }
                const newPosition = [x,y];
                return newPosition;
            });
            index++;
            if(steps.length === index){
                callback();
            }
        },
        500
    );
}