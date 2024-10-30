import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import {
    InputInterface,
    OptionInterface,
} from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import { FC, useEffect, useState } from "react";
import { decorateActiveInput, disableInactiveInputs } from "./handler";
import RenderOptions from "./components/RenderOptions";
import RenderInputs from "./components/RenderInputs";
import { LessonSlideInterface } from "components/SlideManager/handler";
import { audioManager } from "components/NewLesson/AudioManager/AudioManager";

interface QuestionComponentProps {
    data: any;
    slide: LessonSlideInterface;
    viewArea: any;
}

const QuestionComponent: FC<QuestionComponentProps> = ({
    data,
    slide,
    viewArea,
}) => {
    const [questions, setQuestions] = useState<any>(data?.data ?? []);
    const [answered, setAnswered] = useState<OptionInterface[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

    const allInputs = () =>
        Array.from(
            document.querySelectorAll(".active-slide .text-render input")
        );

    useEffect(() => {
        setQuestions([
            ...(data?.data
                ? data.data.map((q: QuestionInterface, index: number) => ({
                      ...q,
                      index,
                  }))
                : []),
        ]);
        let inputs: InputInterface[] = [];
        data?.data.forEach((question: QuestionInterface) => {
            question?.inputs &&
                question.inputs.forEach((input: InputInterface) => {
                    inputs.push(input);
                });
        });
    }, [data, data.data]);

    useEffect(() => {
        if (answered.length !== questions.length) {
            setTimeout(() => {
                setActiveQuestionIndex(answered.length);
            }, 1500);
        }
        if (questions.length === answered.length && questions.length !== 0) {
            slide.dispatch("showContinue", {
                hasFeedback: !!answered[answered.length - 1].feedback,
            });
        }
    }, [answered]);

    useEffect(() => {
        const input = document.querySelector(
            ".active-slide .text-render input"
        );
        if (!!input) {
            setTimeout(() => {
                const activeInput = allInputs()[0] as HTMLInputElement;
                const activeQuestion = questions[activeQuestionIndex];
                decorateActiveInput(
                    activeInput,
                    activeQuestion.type == "subjective" &&
                        activeInput.getAttribute("data-question-hash") ==
                            activeQuestion.hash
                );
                // allInputs().length > 1 &&
                //     disableInactiveInputs(
                //         allInputs().slice(1) as HTMLInputElement[]
                //     );
            }, 100);
        }
    }, [answered, activeQuestionIndex]);

    useEffect(() => {
        slide.on("answerQuestion", (data: any) => {
            if (data.answer) {
                audioManager.playCorrect();
                setAnswered((prev: any) => [
                    ...prev.filter(
                        (ans: any) => ans?.question.hash !== data.question.hash
                    ),
                    { ...data },
                ]);
            }
        });
    }, [slide]);

    return (
        <>
            {questions.map((question: QuestionInterface, index: number) => {
                return (
                    <>
                        {viewArea && activeQuestionIndex === index && (
                            <RenderOptions
                                key={"option" + question.hash + index}
                                options={question.options ?? []}
                                answered={answered}
                                setAnswered={setAnswered}
                                viewArea={viewArea}
                                question={question}
                                questionIndex={index}
                                totalQuestions={questions.length}
                                slideManager={slide}
                            />
                        )}
                        <RenderInputs
                            key={"input" + question.hash + index}
                            inputs={question.inputs ?? []}
                            answered={answered}
                            questionIndex={index}
                            question={question}
                            setAnswered={setAnswered}
                        />
                    </>
                );
            })}
        </>
    );
};

export default QuestionComponent;
