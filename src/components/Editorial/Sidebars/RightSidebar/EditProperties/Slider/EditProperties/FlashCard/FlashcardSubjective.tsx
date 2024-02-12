import React, { FC, useEffect, useState } from "react";
import { ManagerInterface } from "components/Editorial/Base/Manager";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetCorrectOption,
  handleSetObjectiveIndex,
  refreshOptionsData,
} from "provider/optionsDataSlice";
import { RiAddCircleLine, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import FeedbackIcon from "FigmaIcons/FeedbackIcon";
import {
  handleSetFeedbackStatus,
  handleSetFeedbackType,
  handleSetOptionIndex,
} from "provider/feedbackSlice";
import { QuestionInterface } from "components/interface";
import { handleToggleTrigger } from "provider/triggerSlice";
import FlashcardFeedback from "./FlashcardFeedback";
import {
  FeedbackState,
  OptionsDataState,
} from "components/Editorial/Base/StateInterface";

interface Props {
  manager: ManagerInterface;
  index: number;
  data: any;
}

const FlashcardSubjective: FC<Props> = ({ manager, index, data }) => {
  const addQuestion =
    manager.canvasManager.canvas.functions.updateFlashcardQuestion;

  const { identifier, correctOption, wrongOption } = manager.states.optionsData;
  const trigger = manager.states.trigger;

  const [isActive, setIsActive] = useState(true);

  const cardsIndex = manager.canvasManager.activeComponent.data.index;
  const questionData: QuestionInterface =
    manager.canvasManager.activeComponent.data.components[cardsIndex].cards[
      index
    ].question;
  const [question, setQuestion] = useState<QuestionInterface>();

  useEffect(() => {
    if (questionData && questionData?.type === "SUBJECTIVE") {
      setQuestion(questionData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionData, trigger]);

  const handleSetObjective = () => {
    if (question && question?.identifier) return;

    //replaceContent(questions, "OBJECTIVE", component);
    addQuestion(
      {
        type: "SUBJECTIVE",
        identifier: `Input ${index + 1}`,
        options: [
          {
            answer: false,
            content: "",
            feedback: {
              type: "",
              content: "",
            },
          },
          {
            answer: false,
            content: "",
            feedback: {
              type: "",
              content: "",
            },
          },
        ],
        answers: [""],
      },
      index
    );
    setIsActive(true);
    manager.setState("optionsData", {
      identifier: "",
      correctOption: "",
      wrongOption: "",
      objectiveIndex: 0,
    });
    manager.setState("optionsData", (prev: OptionsDataState) => {
      return { ...prev, ...({ objectiveIndex: index } as OptionsDataState) };
    });
  };

  const handleDelete = (id: string, index: number) => {
    manager.canvasManager.canvas.functions.updateActiveComponentObjective(
      null,
      "Flashcard"
    );
    manager.setState("trigger", (prev: any) => !prev);
    setQuestion(data.question);
  };

  return (
    <div className="my-1 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleSetObjective}
      >
        <p className="text-[13px]">Set Subjective</p>
      </div>

      {isActive && (
        <div className="w-full flex justify-between items-center cursor-pointer">
          <div className="w-full text-[12px]">
            {question && question?.identifier && (
              <SubjectiveItem
                sub={question}
                index={index}
                manager={manager}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardSubjective;

const SubjectiveItem: FC<any> = ({ sub, index, manager, handleDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [showManual, setShowManual] = useState(true);
  const [showAI, setShowAI] = useState(false);
  const [value, setValue] = useState("");

  const { objectiveIndex } = manager.states.optionsData;
  const { optionIndex, status: optionStatus, type } = manager.states.feedback;

  const cardsIndex = manager.canvasManager.activeComponent.data.index;
  const coreData =
    manager.canvasManager.activeComponent.data.components[cardsIndex].cards[
      index
    ].question;

  const handleSetSubjective = () => {
    if (!value) return;
    manager.canvasManager.canvas.functions.updateObjectiveData(
      {
        answers: [value],
      },
      index,
      "Flashcard"
    );
    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      index,
      "Flashcard"
    );
    setIsEditable(false);
    manager.setState("feedback", (prev: FeedbackState) => {
      return { ...prev, ...({ status: false } as FeedbackState) };
    });
  };

  const handleShowFeedback = () => {
    manager.setState("feedback", (prev: FeedbackState) => {
      return {
        ...prev,
        ...({
          type: "SUBJECTIVE",
          optionIndex: 0,
          status: true,
        } as FeedbackState),
      };
    });
  };

  return (
    <div key={sub.identifier} className="my-2 w-full">
      <div className="w-full flex justify-between items-center cursor-pointer">
        <p className="text-[12px] mr-2">
          {isEditable ? <b>Subjective</b> : `Subjective`}
        </p>

        <div className="flex gap-1 items-center">
          <RiEditLine onClick={() => setIsEditable(!isEditable)} />
          <div onClick={handleShowFeedback}>
            <FeedbackIcon />
          </div>
          <RiDeleteBinLine
            className="cursor-pointer"
            onClick={() => handleDelete(sub.identifier)}
          />
        </div>
      </div>
      {isEditable && (
        <div className="w-[90%] m-2">
          <div>
            <div className="flex justify-between items-center py-1 my-1">
              <p className="">Manual response</p>
              <input
                type="radio"
                checked={showManual}
                onChange={() => setShowManual(!showManual)}
              />
            </div>
            {showManual && (
              <textarea
                className="w-full border border-black p-2"
                placeholder="Type the answer"
                rows={5}
                onChange={(e: any) => setValue(e.target.value)}
                value={value}
              />
            )}
            <div className="flex justify-between items-center py-1 my-1">
              <p className="">AIs</p>
              <input
                type="radio"
                checked={showAI}
                onChange={() => setShowAI(!showAI)}
              />
            </div>
            {showAI && (
              <>
                <p className="text-[13px]">Add Query</p>
                <textarea
                  className="w-full border border-black p-2"
                  placeholder="Type the query"
                  rows={5}
                  onChange={(e: any) => setValue(e.target.value)}
                  value={value}
                />
              </>
            )}
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={handleSetSubjective}
              className="w-[30%] bg-[#4f46e5] text-[12px] text-white rounded-xl px-1 py-0.5"
            >
              Save
            </button>
          </div>
        </div>
      )}
      {type === "SUBJECTIVE" && optionStatus && (
        <FlashcardFeedback manager={manager} type="OBJECTIVE" index={index} />
      )}
    </div>
  );
};
