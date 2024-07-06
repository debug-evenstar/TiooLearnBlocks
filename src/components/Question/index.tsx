import { _getManager } from "components/Editorial/Base/Manager";
import { QuestionInterface } from "components/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { InputInterface, OptionInterface, OptionTypes } from "components/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { calculateMaxResizableArea } from "components/Editorial/ViewBox/handler";
import LayoutComponent from "components/LayoutBox";
import { FeedbackType } from "components/NewLesson/Popups";
import { useLessonContext } from "contexts/LessonContext";
import { FC, createRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

interface QuestionComponentProps {
    data: any;
    viewArea: any;
}

const QuestionComponent: FC<QuestionComponentProps> = ({ data, viewArea }) => {
    const [questions, setQuestions] = useState<any>(data?.data ?? []);
    const [allInputs, setAllInputs] = useState<any>([]);
    const optionFontSizeFraction = 1.4;
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [answered, setAnswered] = useState<any[]>([]);
    const lessonContext = useLessonContext();

    const selectOption = (option : OptionInterface, type : string) => {
        (type == OptionTypes.Single) && setSelectedOptions([option.hash]);
        (type == OptionTypes.Multiple) && setSelectedOptions((prev : string[]) => {
            return [
                ...(prev.includes(option.hash) ? [] : [option.hash]),
                ...prev.filter((h:string) => h !==option.hash)
            ];
        });
        allInputs.length && option.isAnswer &&  setAnswered([...answered, option]);
        if ( option.feedback && lessonContext) {
            const feedback = option.feedback;
            lessonContext.feedbackRef.current.showFeedback(
                feedback.title, feedback.content, (option.isAnswer ? FeedbackType.CORRECT : FeedbackType.WRONG)
            )
        }
    }
    
    const optionColor = ( option : OptionInterface) => {
        if (selectedOptions.includes(option.hash)) {
            if (option.isAnswer) return "bg-[#2D6A4F] text-white"
            return "bg-[#9C29B2] text-white";
        }
    }


    useEffect(() => {
        setQuestions([...(data?.data ?? [])]);
        let inputs : InputInterface[] = [];
        data?.data.forEach((question : QuestionInterface) => {
            question?.inputs && question.inputs.forEach((input : InputInterface) => {
                inputs.push(input);
            });
        });
        setAllInputs(inputs);
    }, [data, data.data]);

    return (
        <>
            {questions.map((question: QuestionInterface, index: number) => {
                const inputs = question.inputs ?? [];
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
                                        optionColor(option)
                                    }
                                    onClick={() => selectOption(option, question.optionType)}
                                >
                                    {option.title}
                                </button>
                            </LayoutComponent>
                        );
                    }
                ).concat(
                    inputs.map(
                        (input: InputInterface, inputIndex: number) => {
                            return (
                                <LayoutComponent
                                    key={index+input.title}
                                    layout={input.layout ?? {}}
                                >
                                    {(answered.length <= inputIndex ) && <input 
                                        className="w-full h-full relative bg-white text-[14px] border-[2px] border-[#E5E5E5] rounded-[10px] p-[3px] shadow-md z-[50]"
                                    />}
                                    {(answered.length > inputIndex ) && 
                                    <div className="w-full h-full relative z-[50] flex justify-center items-center">
                                        <p className="font-bold text-[#409972] text-[18px]">{answered[inputIndex].title}</p>
                                    </div>}
                                </LayoutComponent>
                            );
                        }
                    )
                )
            })}
        </>
    );
};

export default QuestionComponent;
