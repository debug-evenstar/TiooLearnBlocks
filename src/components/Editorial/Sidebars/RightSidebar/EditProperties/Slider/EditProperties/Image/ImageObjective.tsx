import React, { FC, useEffect, useState } from "react";
import {
  RiAddCircleLine,
  RiDeleteBinLine,
  RiFeedbackLine,
} from "react-icons/ri";
import { ManagerInterface } from "components/Editorial/Base/Manager";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import {
  handleSetCorrectOption,
  handleSetObjectiveIndex,
  handleSetWrongOption,
  refreshOptionsData,
} from "provider/optionsDataSlice";
import { MdChatBubbleOutline } from "react-icons/md";
import { ObjectiveItemProp } from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions/interfaces";
import { OptionInterface, QuestionInterface } from "components/interface";
import Feedback from "../Extensions/Feedback";
import FeedbackIcon from "FigmaIcons/FeedbackIcon";
import ChatIcon from "FigmaIcons/ChatIcon";
import {
  handleSetFeedbackStatus,
  handleSetFeedbackType,
  handleSetOptionIndex,
} from "provider/feedbackSlice";
import OverlayFeedback from "./OverlayFeedback";
import { handleToggleTrigger } from "provider/triggerSlice";
import {
  FeedbackState,
  OptionsDataState,
} from "components/Editorial/Base/StateInterface";

interface Props {
  manager: ManagerInterface;
  index: number;
  data: any;
}

const ImageObjective: FC<Props> = ({ manager, index, data }) => {
  const addQuestion =
    manager.canvasManager.canvas.functions.updateImageQuestions;

  const { identifier, correctOption, wrongOption } = manager.states.optionsData;
  const trigger = manager.states.trigger;

  const [isActive, setIsActive] = useState(false);
  const questionData: QuestionInterface =
    manager.canvasManager.activeComponent.data?.extensions[index]?.question[0];
  const [question, setQuestion] = useState<QuestionInterface>();

  useEffect(() => {
    if (questionData && questionData.type === "OBJECTIVE") {
      setQuestion(questionData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionData, trigger]);

  const handleSetObjective = () => {
    if (question?.identifier) return;

    //replaceContent(questions, "OBJECTIVE", component);
    addQuestion(
      {
        type: "OBJECTIVE",
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
    manager.setState("showOptionsBox", (prev: any) => !prev);
    manager.setState("optionsData", {
      identifier: "",
      correctOption: "",
      wrongOption: "",
      objectiveIndex: 0,
    });
    manager.setState("showOptionsBox", (prev: any) => !prev);
    manager.setState("optionsData", (prev: OptionsDataState) => {
      return { ...prev, ...({ objectiveIndex: index } as OptionsDataState) };
    });
  };

  const handleDelete = (id: string, optionIndex: number) => {
    // Find the question to update

    if (!question?.options) return;
    const updatedQuestion = {
      ...question,
      options: [
        ...question.options.slice(0, optionIndex),
        ...question.options.slice(optionIndex + 1),
      ],
    };
    manager.canvasManager.canvas.functions.deleteObjectiveOptions(
      updatedQuestion.options,
      0,
      "Overlay"
    );
    manager.setState("trigger", (prev: any) => !prev);
  };

  return (
    <div className="my-1 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleSetObjective}
      >
        <p className="text-[13px]">Set Objective</p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          {question?.identifier && (
            <ObjectiveItem
              key={question.identifier}
              objective={question}
              index={0}
              data={data}
              handleDelete={handleDelete}
              manager={manager}
            />
          )}
        </main>
      )}
    </div>
  );
};

export default ImageObjective;

export const ObjectiveItem: FC<ObjectiveItemProp> = ({
  objective,
  index,
  data,
  handleDelete,
  manager,
}) => {
  const { status: optionStatus, type } = manager.states.feedback;
  const [isActive, setIsActive] = useState(true);
  const [question, setQuestion] = useState<any>();
  const [addedOption, setAddedOption] = useState(false);

  const coreData =
    manager.canvasManager.activeComponent.data?.extensions[index]?.question[0];

  useEffect(() => {
    setQuestion(coreData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedOption]);

  const addOption = (data: OptionInterface) => {
    manager.canvasManager.canvas.functions.updateObjectiveOptions(
      data,
      index,
      "Overlay"
    );
    setAddedOption(!addedOption);
    manager.setState("feedback", (prev: FeedbackState) => {
      return {
        ...prev,
        ...({
          optionIndex: question.options ? question.options.length : 0,
        } as FeedbackState),
      };
    });
  };

  const deleteOption = (i: number) => {
    handleDelete(objective.identifier, i);
    setAddedOption(!addedOption);
  };

  const handleShowFeedback = (index: number) => {
    manager.setState("feedback", (prev: FeedbackState) => {
      return {
        ...prev,
        ...({
          type: "OBJECTIVE",
          optionIndex: index,
          status: true,
        } as FeedbackState),
      };
    });
  };

  const handleOpenObjective = () => {
    manager.setState("optionsData", (prev: OptionsDataState) => {
      return { ...prev, ...({ objectiveIndex: index } as OptionsDataState) };
    });
    setIsActive(!isActive);
  };

  return (
    <div className="py-1">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleOpenObjective}
      >
        <p className="text-[12px]">
          {isActive ? <b>Objective {index + 1}</b> : `Objective ${index + 1}`}
        </p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          {question &&
            question.options?.map((option: OptionInterface, i: any) => (
              <div key={i}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChatIcon />
                    <p className="text-[12px] my-2 mr-2">{option.content}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div onClick={() => handleShowFeedback(i)}>
                      <FeedbackIcon />
                    </div>
                    <RiDeleteBinLine onClick={() => deleteOption(i)} />
                  </div>
                </div>
              </div>
            ))}

          <div
            className="flex justify-between py-2 items-center cursor-pointer"
            onClick={() =>
              addOption({
                answer: false,
                content: "",
                feedback: {
                  type: "",
                  content: "",
                },
              })
            }
          >
            <p className="text-[12px]">Add option</p>
            <RiAddCircleLine size={"13px"} color="grey" />
          </div>
        </main>
      )}
      {type === "OBJECTIVE" && optionStatus && (
        <OverlayFeedback manager={manager} type="OBJECTIVE" index={index} />
      )}
    </div>
  );
};
