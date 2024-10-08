import { _getManager } from "apps/Editorial/Base/Manager";
import {
    QuestionInterface,
    QuestionTypes,
} from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import {
    InputInterface,
    InputLinkedStates,
} from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import LayoutComponent from "components/LayoutBox";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";

const RenderInputs: FC<{
    inputs: any[];
    answered: any[];
    setAnswered: Function;
    questionIndex: number;
    question: QuestionInterface;
}> = ({ inputs, answered, questionIndex, question, setAnswered }) => {
    const textFillRef = useRef<HTMLParagraphElement>(null);
    const animationStyle: CSSProperties = {
        transition: "transform 0.4s, text-shadow 0.4s",
        transitionTimingFunction: "linear",
        textShadow: "0px 0px 0px #fff",
    };
    const [isCorrect, setIsCorrect] = useState<any>(null);
    const animate = () => {
        if (textFillRef?.current) {
            textFillRef?.current.style.setProperty("transform", "scale(1.5)");
            textFillRef?.current.style.setProperty(
                "text-shadow",
                "0px 0px 15px #ffb870"
            );
            setTimeout(() => {
                textFillRef?.current &&
                    textFillRef?.current.style.setProperty(
                        "transform",
                        "scale(1)"
                    );
                textFillRef?.current &&
                    textFillRef?.current.style.setProperty(
                        "text-shadow",
                        "0px 0px 0px #fff"
                    );
            }, 400);
        }
    };

    const handleInputChange = (e: any) => {
        const val = e.target.value;
        if (question.answer && val) {
            if (question.answer.substring(0, val.length) === val) {
                setIsCorrect(true);
                if (question.answer?.length === val.length) {
                    setAnswered((prev: any) => [...prev, question.answer]);
                }
            } else {
                setIsCorrect(false);
            }
        }
    };

    useEffect(() => {
        if (answered.length - 1 === questionIndex) {
            setTimeout(() => {
                animate();
            }, 50);
        }
    }, [answered, questionIndex]);
    return (
        <>
            {inputs.map((input: InputInterface, inputIndex: number) => {
                return input.linkState !== InputLinkedStates.Linked ? (
                    <LayoutComponent
                        key={inputIndex + input.title}
                        layout={input.layout ?? {}}
                    >
                        {answered.length <= questionIndex && (
                            <input
                                disabled={
                                    question.type === QuestionTypes.Multichoice
                                }
                                className={`w-full h-full relative bg-white text-[16px] text-center font-bold border-[0.5px] border-[#E5E5E5] rounded-[8px] p-[3px] shadow-md z-[50] shadow-[inset_0_0_6px_2px_rgba(155,41,178,0.6)]
                                    ${
                                        answered.length === questionIndex
                                            ? " input-is-active"
                                            : ""
                                    }
                                    ${
                                        isCorrect !== null
                                            ? isCorrect
                                                ? " text-green-500"
                                                : " text-red-500"
                                            : " text-black"
                                    }
                                `}
                                onChange={handleInputChange}
                            />
                        )}
                        {answered.length > questionIndex && (
                            <div className="w-full h-full relative z-[50] flex justify-center items-center">
                                <p
                                    style={animationStyle}
                                    ref={textFillRef}
                                    className="font-bold text-[#089c28] text-[20px] scale-100"
                                >
                                    {question.type === QuestionTypes.Multichoice
                                        ? answered[questionIndex].title
                                        : answered[questionIndex]}
                                </p>
                            </div>
                        )}
                    </LayoutComponent>
                ) : (
                    <div key={inputIndex + input.title}></div>
                );
            })}
        </>
    );
};

export default RenderInputs;
