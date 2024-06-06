import { TextFields } from "components/extensions/TextFields";
import { LessonSlideInterface } from "../SlideManager/handler";

export interface TextStyles {
    color?: string;
}

export interface ImageData {
    component : string;
    url : string;
    extensions? : any[];
}
export interface ImageComponentProps {
    data : ImageData;
    slide : LessonSlideInterface;
}


export const renderInputsAsOverlay = (inputs : any[], slide : LessonSlideInterface, callback : Function) => {
    if(inputs.length) {
        const inputArray : any[] = [];
        const answers = inputs.map((input:any) => input.value);
        const fieldManager = TextFields([], slide, answers, []);
        inputs.forEach((input, index) => {
            const field = fieldManager.formatTextField(index);
            console.log(input);
            const fieldPosition : React.CSSProperties = {
                position : "absolute",
                top : input.layout.position.yAxis.offsetPercent + "%",
                left : input.layout.position.xAxis.offsetPercent + "%",
                ...( input.layout?.size?.widthPercent ? {width : input.layout?.size?.widthPercent + "%"} : {}),
                ...( input.layout?.size?.heightPercent ? {height : input.layout?.size?.heightPercent + "%"} : {})
            };
            inputArray.push( 
                <div style={fieldPosition}>
                    {field.customElement({
                        styles : {
                            margin : 0,
                            ...(input.layout?.size?.widthPercent || input.layout?.size?.heightPercent ? { width : "100%", height : "100%"} : {})
                        }
                    })}
                </div>
            );
        });
        callback(inputArray);
    }
}