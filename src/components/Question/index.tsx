import { _getManager } from "components/Editorial/Base/Manager";
import { OptionInterface } from "components/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { calculateMaxResizableArea } from "components/Editorial/ViewBox/handler";
import LayoutComponent from "components/LayoutBox";
import { FC, createRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

interface QuestionComponentProps {
   data : any;
   viewArea : any;
}


const QuestionComponent: FC<QuestionComponentProps> = ({
    data,
    viewArea
}) => {
    const [questions, setQuestions] = useState<any>(data?.data ?? []);
    const [allOptions, setAllOptions] = useState<any>([]);
    const optionFontSizeFraction = 1.2;

    useEffect(()=>{
        setQuestions([...(data?.data ?? [])]);
    },[data, data.data])

    useEffect(()=>{
        setAllOptions(() => {
            let options : any[] = [];
            questions.forEach((question:any) => {
                options = [...options, ...(question.options ?? [])];
            });
            return options;
        });
    },[questions]);

    return (
        <>
            {
                allOptions.map((option : any, index : number) => {
                    return(
                        <LayoutComponent
                            key={index}
                            layout={option.layout}
                        >
                            <button
                                style={{ fontSize : `${optionFontSizeFraction*viewArea.width/100}px`}}
                                className="w-full h-full absolute border-[2px] border-[#E5E5E5] rounded-[10px] p-[5px] shadow-md shadow cursor-pointer"
                            >
                                {option.title}
                            </button>
                        </LayoutComponent>
                )})
            }
        </>
    );
};

export default QuestionComponent;
