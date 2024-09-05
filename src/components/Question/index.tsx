import { _getManager } from "apps/Editorial/Base/Manager";
import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import {
  InputInterface,
  OptionInterface,
  OptionTypes,
} from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import LayoutComponent from "components/LayoutBox";
import { useLessonContext } from "contexts/LessonContext";
import { FC, createRef, useEffect, useState } from "react";
import { triggerFeedback } from "./handler";
import RenderOptions from "./components/RenderOptions";
import RenderInputs from "./components/RenderInputs";
import {
  LessonSlideInterface,
  LessonSlideScope,
} from "components/SlideManager/handler";

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

  useEffect(() => {
    if (questions.length == answered.length && questions.length !== 0) {
      slide.dispatch("showContinue", {
        hasFeedback: !!answered[answered.length - 1].feedback,
      });
    }
  }, [answered]);

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
  }, [answered]);

  return (
    <>
      {questions.map((question: QuestionInterface, index: number) => {
        return (
          <>
            {viewArea && activeQuestionIndex == index && (
              <RenderOptions
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
              inputs={question.inputs ?? []}
              answered={answered}
              questionIndex={index}
            />
          </>
        );
      })}
    </>
  );
};

export default QuestionComponent;
