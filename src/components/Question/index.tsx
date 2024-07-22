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
    const [locked, setLocked] = useState<any[]>([]);
    const lessonContext = useLessonContext();
    const selectOption = (option : OptionInterface, question : QuestionInterface) => {
        // Only select if question hs not been answered
        if((question as any).index == answered.length) {

            (question.optionType == OptionTypes.Single) && setSelectedOptions([option.hash]);
            (question.optionType == OptionTypes.Multiple) && setSelectedOptions((prev : string[]) => {
                return [
                    ...(prev.includes(option.hash) ? [] : [option.hash]),
                    ...prev.filter((h:string) => h !==option.hash)
                ];
            });
            allInputs.length && option.isAnswer &&  setAnswered([...answered, option]);
            setTimeout(()=>{
                allInputs.length && option.isAnswer && setLocked([...locked, option])
            },1500)
            if ( option.feedback && lessonContext) {
                const feedback = option.feedback;
                lessonContext.feedbackRef.current.showFeedback(
                    feedback.title, feedback.content, (option.isAnswer ? FeedbackType.CORRECT : FeedbackType.WRONG)
                )
            }

        }

    }
    
    const optionColor = ( option : OptionInterface) => {
        if (selectedOptions.includes(option.hash)) {
            if (locked.map((o:OptionInterface) => o.hash).includes(option.hash)) return "bg-[#2D6A4F] text-white"
            if (option.isAnswer) return "bg-[#2C7721] text-white"
            return "bg-[#FC8B52] text-white";
        }
    }


    useEffect(() => {
        setQuestions([...(data?.data ? 
            data.data.map((q: QuestionInterface, index : number) => ({...q, index}))
            : [])
        ]);
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
                                        optionColor(option) +
                                        ` hover:shadow-[0_0_6px_2px_rgba(155,41,178,0.6)] hover:border-[0.5px]`
                                    }
                                    onClick={() => selectOption(option, question)}
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
                                        className="w-full h-full relative bg-white text-[14px] border-[0.5px] border-[#E5E5E5] rounded-[10px] p-[3px] shadow-md z-[50] shadow-[inset_0_0_6px_2px_rgba(155,41,178,0.6)]"
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
