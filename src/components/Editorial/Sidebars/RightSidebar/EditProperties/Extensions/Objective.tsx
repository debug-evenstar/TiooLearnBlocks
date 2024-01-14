import React, { FC, useEffect, useState } from "react";
import {
  RiAddCircleLine,
  RiDeleteBinLine,
  RiFeedbackLine,
} from "react-icons/ri";
import { ObjectiveItemProp } from "./interfaces";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import {
  handleSetCorrectOption,
  handleSetObjectiveIndex,
  handleSetWrongOption,
  refreshOptionsData,
} from "provider/optionsDataSlice";
import { MdChatBubbleOutline } from "react-icons/md";
import Feedback from "./Feedback";
import {
  handleSetFeedbackStatus,
  handleSetFeedbackType,
  handleSetOptionIndex,
} from "provider/feedbackSlice";
import { OptionInterface } from "components/interface";
import FeedbackIcon from "FigmaIcons/FeedbackIcon";
import ChatIcon from "FigmaIcons/ChatIcon";

interface Props {
  manager: EditorialManagerInterface;
  component: string;
}

const Objective: FC<Props> = ({ manager, component }) => {
  const selector: any = useSelector(handleSetCorrectOption);
  const id = selector.payload.activeViewbox.value;

  const [questions, setQuestions] = useState<any[]>([]);
  const replaceContent =
    manager.canvasManager.activeComponent.functions?.replaceContent;

  const dispatch = useDispatch();
  const { identifier, correctOption, wrongOption } = selector.payload
    .optionsData.value as {
    identifier: string;
    correctOption: string;
    wrongOption: string;
  };

  const [isActive, setIsActive] = useState(false);
  const coreData = manager.canvasManager.activeComponent.data.coreData;

  const handleSetObjective = () => {
    if (isActive) return;
    console.log(questions, "in objective");
    replaceContent(questions, "OBJECTIVE", component);
    setIsActive(true);
    dispatch(handleToggleShowOptionBox());
    dispatch(handleSetObjectiveIndex(questions.length));
    dispatch(refreshOptionsData());
  };

  const handleClick = () => {
    if (questions.length > 0) {
      replaceContent(questions, "OBJECTIVE", component);
      setIsActive(true);
      dispatch(handleToggleShowOptionBox());
      dispatch(handleSetObjectiveIndex(questions.length));
    }
    dispatch(handleSetCorrectOption(""));
    dispatch(handleSetWrongOption(""));
    console.log(
      manager.canvasManager.activeComponent.data.coreData,
      "changed data"
    );
  };

  const handleDelete = (id: string, optionIndex: number) => {
    setQuestions((prevQuestions) => {
      // Find the question to update
      const questionIndex = prevQuestions.findIndex(
        (question) => question.identifier === id
      );

      if (questionIndex !== -1) {
        const updatedQuestions = [...prevQuestions];
        const updatedQuestion = {
          ...updatedQuestions[questionIndex],
          options: [
            ...updatedQuestions[questionIndex].options.slice(0, optionIndex),
            ...updatedQuestions[questionIndex].options.slice(optionIndex + 1),
          ],
        };
        updatedQuestions[questionIndex] = updatedQuestion;
        manager.canvasManager.activeComponent.functions.updateObjectiveData(
          updatedQuestion,
          questionIndex
        );

        return updatedQuestions;
      } else {
        return prevQuestions;
      }
    });
  };

  useEffect(() => {
    console.log(identifier, correctOption, wrongOption, " - Options");
  }, [identifier]);

  useEffect(() => {
    coreData?.questions?.forEach((question: any) => {
      if (
        question?.type === "OBJECTIVE" &&
        question?.identifier?.includes(id)
      ) {
        setQuestions([...questions, question]);
        console.log(question);
      }
    });
    console.log(questions);
  }, [coreData?.questions, identifier]);

  return (
    <div className="p-2 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleSetObjective}
      >
        <p className="text-[13px]">
          {isActive ? <b>Set Objective</b> : "Set Objective"}
        </p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          <div
            className="flex justify-between items-center pb-2"
            onClick={handleClick}
          >
            <p className="text-[12px]">Add an objective</p>
            <RiAddCircleLine size={"13px"} color="grey" />
          </div>

          <section>
            {questions &&
              questions?.map((obj: any, i: number) => {
                if (!obj.identifier?.includes(id)) return <></>;
                return (
                  <ObjectiveItem
                    key={obj.identifier}
                    objective={obj}
                    index={i}
                    data={coreData}
                    handleDelete={handleDelete}
                    manager={manager}
                  />
                );
              })}
          </section>
        </main>
      )}
    </div>
  );
};

export default Objective;

export const ObjectiveItem: FC<ObjectiveItemProp> = ({
  objective,
  index,
  data,
  handleDelete,
  manager,
}) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(handleSetFeedbackStatus);
  const {
    optionIndex,
    status: optionStatus,
    type,
  } = selector.payload.feedback.value as {
    optionIndex: number;
    status: number;
    type: string;
  };
  const [isActive, setIsActive] = useState(false);

  const addOption = (data: OptionInterface) => {
    manager.canvasManager.activeComponent.functions.updateObjectiveOptions(
      data,
      index
    );
    console.log(
      manager.canvasManager.activeComponent.data.coreData.questions,
      "clicked"
    );
  };

  const handleShowFeedback = (index: number) => {
    dispatch(handleSetFeedbackType("OBJECTIVE"));
    dispatch(handleSetOptionIndex(index));
    dispatch(handleSetFeedbackStatus(true));
  };

  const handleOpenObjective = () => {
    dispatch(handleSetObjectiveIndex(index));
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
          {objective.options?.map((option: OptionInterface, i: any) => (
            <div key={i}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <ChatIcon />
                  <p className="text-[12px] my-2">{option.content}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div onClick={() => handleShowFeedback(i)}>
                    <FeedbackIcon />
                  </div>
                  <RiDeleteBinLine
                    onClick={() => handleDelete(objective.identifier, i)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div
            className="flex justify-between py-2 items-center"
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
        <Feedback manager={manager} type="OBJECTIVE" />
      )}
    </div>
  );
};
