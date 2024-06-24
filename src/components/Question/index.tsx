import { _getManager } from "components/Editorial/Base/Manager";
import { QuestionInterface } from "components/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { OptionInterface, OptionTypes } from "components/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { calculateMaxResizableArea } from "components/Editorial/ViewBox/handler";
import LayoutComponent from "components/LayoutBox";
import { FC, createRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

interface QuestionComponentProps {
    data: any;
    viewArea: any;
}

const QuestionComponent: FC<QuestionComponentProps> = ({ data, viewArea }) => {
    const [questions, setQuestions] = useState<any>(data?.data ?? []);
    const [allOptions, setAllOptions] = useState<any>([]);
    const optionFontSizeFraction = 1.4;
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const selectOption = (hash : string, type : string) => {
        (type == OptionTypes.Single) && setSelectedOptions([hash]);
        (type == OptionTypes.Multiple) && setSelectedOptions((prev : string[]) => {
            return [
                ...(prev.includes(hash) ? [] : [hash]),
                ...prev.filter((h:string) => h !==hash)
            ];
        });
    }

    useEffect(() => {
        setQuestions([...(data?.data ?? [])]);
    }, [data, data.data]);

    return (
        <>
            {questions.map((question: QuestionInterface, index: number) => {
                return viewArea && question.options?.map(
                    (option: OptionInterface, optionIndex: number) => {
                        return (
                            <LayoutComponent
                                key={index+option.title}
                                layout={option.layout ?? {}}
                            >
                                <button
                                    style={{
                                        fontSize: `${
                                            (optionFontSizeFraction *
                                                viewArea.width) /
                                            100
                                        }px`,
                                    }}
                                    className={`w-full h-full absolute border-[2px] 
                                        border-[#E5E5E5] rounded-[10px] p-[5px] shadow-md shadow cursor-pointer ` + 
                                        (selectedOptions.includes(option.hash) ? "bg-[#9C29B2] text-white" : '')
                                    }
                                    onClick={() => selectOption(option.hash, question.optionType)}
                                >
                                    {option.title}
                                </button>
                            </LayoutComponent>
                        );
                    }
                )
            })}
        </>
    );
};

export default QuestionComponent;
