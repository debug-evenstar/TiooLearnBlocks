import {Ref} from "react";
import {percentValue} from "../../../../../../utilities/maths";

export const createInputOverlay = (x : number, y : number, imageRef : any) => {
    const imageWidth = imageRef.offsetWidth;
    const imageHeight = imageRef.offsetHeight;
    return {
        type :  "input",
        layout : {
            position : {
                xAxis : {
                    offset : x,
                    offsetPercent : percentValue(x, imageWidth)
                },
                yAxis : {
                    offset : y,
                    offsetPercent : percentValue(y, imageHeight)
                }
            },
            size : {
                width : 100,
                height : 5,
                widthPercent : percentValue(200, imageWidth),
                heightPercent : percentValue(40, imageHeight)
            }
        },
        question: [],
    }
}