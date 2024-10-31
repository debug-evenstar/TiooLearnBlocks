import { TextFields } from "components/extensions/TextFields";
import { LessonSlideInterface } from "../SlideManager/handler";
import { QuestionTypes } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";

export interface TextStyles {
    color?: string;
}

export interface ImageData {
    component: string;
    url: string;
    extensions?: any[];
}
export interface ImageComponentProps {
    data: ImageData;
    slide: LessonSlideInterface;
}

export const renderInputsAsOverlay = (
    inputs: any[],
    slide: LessonSlideInterface,
    callback: Function
) => {
    if (inputs.length) {
        let inputArray: any[] = [];
        inputArray = inputs.map((input, index) => {
            return (
                <input
                    key={input.data.hash+index}
                    className="absolute bg-white text-[16px] border-[0.5px] border-[#E5E5E5] rounded-[8px] p-[5px] shadow-md shadow-[inset_0_0_6px_2px_rgba(155,41,178,0.6)]"
                    data-link="Questions"
                    data-hash={input.data.hash}
                    data-question-hash={input.data.questionHash}
                    disabled={
                        input.data.questionType == QuestionTypes.Multichoice
                    }
                    style={{
                        top : (input.layout?.position?.yAxis?.offsetPercent ?? 0) + "%",
                        left : (input.layout?.position?.xAxis?.offsetPercent ?? 0) + "%",
                        ...( input.layout?.size?.widthPercent ? {width : input.layout?.size?.widthPercent + "%"} : {}),
                        ...( input.layout?.size?.heightPercent ? {height : input.layout?.size?.heightPercent + "%"} : {}),
                        minWidth: 20,
                        minHeight: 20
                    }}
                />
            );
        });
        callback(inputArray);
    }
};
