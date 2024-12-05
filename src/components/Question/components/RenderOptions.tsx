import { _getManager } from "apps/Editorial/Base/Manager";
import {
  OptionInterface,
  OptionTypes,
} from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import LayoutComponent from "components/LayoutBox";
import { useLessonContext } from "contexts/LessonContext";
import { FC, useState } from "react";
import { handleAnswerQuestion, triggerFeedback } from "../handler";
import { QuestionInterface } from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import { LessonSlideInterface } from "components/SlideManager/handler";
import { audioManager } from "components/NewLesson/AudioManager/AudioManager";

const RenderOptions: FC<{
  options: OptionInterface[];
  answered: any[];
  setAnswered: Function;
  question: QuestionInterface;
  questionIndex: number;
  totalQuestions: number;
  slideManager: LessonSlideInterface;
  viewArea: any;
}> = ({
  options,
  answered,
  setAnswered,
  question,
  questionIndex,
  totalQuestions,
  slideManager,
  viewArea,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [locked, setLocked] = useState<any[]>([]);
  const optionFontSizeFraction = 2.3;
  const deviceWidth = document.documentElement.clientWidth;
  const lessonContext = useLessonContext();
  const { isAssessment, answerProps } = lessonContext;
  const linkableComponents = ["text", "image"];
  const optionColor = (option: OptionInterface, questionIndex: number) => {
    if (selectedOptions.includes(option.hash)) {
      if (isAssessment) {
        // highlight whatever the person picks in assessment mode as the answer
        return "cursor-pointer shadow-[0_0_6px_2px_rgba(155,41,178,0.6)] border-2 border-[#9B29B299] cursor-pointer";
      }
      if (locked.map((o: OptionInterface) => o.hash).includes(option.hash))
        return "bg-[#2D6A4F] text-white cursor-pointer";
      if (option.isAnswer) {
        return "bg-[#2C7721] text-white cursor-pointer";
      }
      return "bg-[#FC8B52]  text-white cursor-pointer";
    }
    if (!isAssessment) {
      if (answered.length > questionIndex)
        return "bg-gray-100 text-gray-300 cursor-not-allowed";
      return "cursor-pointer";
    }
  };

  const processAssesmentAnswer = (option: OptionInterface) => {
    const list = [...answered, option];
    // console.log(answerProps);
    answerProps.updateAnswer(option);
  };

  const selectOption = (
    option: OptionInterface,
    question: QuestionInterface
  ) => {
    // Only select if question has not been answered
    if ((question as any).index === answered.length) {
      question.optionType === OptionTypes.Single &&
        setSelectedOptions([option.hash]);
      question.optionType === OptionTypes.Multiple &&
        setSelectedOptions((prev: string[]) => {
          return [
            ...(prev.includes(option.hash) ? [] : [option.hash]),
            ...prev.filter((h: string) => h !== option.hash),
          ];
        });
      if (isAssessment) {
        processAssesmentAnswer(option);
      } else {
        processAnswered(option);
      }
    }
  };

  const processAnswered = (option: OptionInterface) => {
    const updatedAnsweredList = [...answered, option];
    if (option.isAnswer) {
      audioManager.playCorrect();
      setAnswered(updatedAnsweredList);

      linkableComponents.forEach((type: string) => {
        handleAnswerQuestion({ question, option }, { parentType: type });
      });

      setTimeout(() => {
        setLocked([...locked, option]);
      }, 1500);
    } else {
      audioManager.playWrong();
    }
    setTimeout(() => {
      triggerFeedback(
        option,
        lessonContext,
        updatedAnsweredList.length === totalQuestions
      );
    }, 500);
  };
  const showOptionShadow = (questionIndex: number) => {
    return answered.length > questionIndex
      ? ""
      : "hover:shadow-[0_0_6px_2px_rgba(155,41,178,0.6)] active:scale-[0.98] hover:border-[0.5px]";
  };
  const valueIsUrl = (value: string) => value.includes("https://");
  const optionsList = () => {
    return options?.map((option: OptionInterface, optionIndex: number) => {
      return (
        <LayoutComponent
          key={questionIndex + option.title}
          layout={option.layout ?? {}}
          responsiveOptions={{
            width: "auto",
            height: "auto",
            minWidth: "120px",
            minHeight: "50px",
            margin: "5px 0px",
          }}
        >
          <button
            style={{
              fontSize: `${Math.max(
                (optionFontSizeFraction * viewArea.width) / 100,
                15
              )}px`,
            }}
            className={
              `${
                deviceWidth < 640
                  ? "h-auto min-h-[50px] w-auto"
                  : "w-full h-full"
              } absolute border-[2px] inherit-font overflow-hidden
                  border-[#E5E5E5] rounded-[10px] p-[5px] ` +
              (!isAssessment ? "shadow-md " : "") + // Exclude shadow-md in assessment mode
              optionColor(option, questionIndex) +
              ` ` +
              showOptionShadow(questionIndex)
            }
            onClick={() => selectOption(option, question)}
            dangerouslySetInnerHTML={{
              __html: valueIsUrl(option.title)
                ? `<img className='h-full' src="${option.title}" alt="Option" draggable="false"/>`
                : option.title,
            }}
          ></button>
        </LayoutComponent>
      );
    });
  };
  return (
    <>
      {deviceWidth < 640 ? (
        <div className="w-full h-auto flex flex-wrap justify-evenly">
          {optionsList()}
        </div>
      ) : (
        <>{optionsList()}</>
      )}
    </>
  );
};

export default RenderOptions;
