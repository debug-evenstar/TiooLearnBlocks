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
            const fieldPosition : React.CSSProperties = {
                position : "absolute",
                top : input.y + "%",
                left : input.x + "%",
                ...( input.width ? {width : input.width + "%"} : {}),
                ...( input.height ? {height : input.height + "%"} : {})
            };
            inputArray.push( 
                <div style={fieldPosition}>
                    {field.customElement({
                        styles : {
                            margin : 0,
                            ...(input.width || input.height ? { width : "100%"} : {})
                        }
                    })}
                </div>
            );
        });
        callback(inputArray);
    }
}