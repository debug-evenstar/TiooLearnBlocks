import React, { FC, useEffect, useState } from "react";
import { RiAddCircleLine, RiDeleteBinLine } from "react-icons/ri";
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
import Feedback from "./Feedback";
import {
  handleSetFeedbackStatus,
  handleSetFeedbackType,
  handleSetOptionIndex,
} from "provider/feedbackSlice";
import { OptionInterface, QuestionInterface } from "components/interface";
import FeedbackIcon from "FigmaIcons/FeedbackIcon";
import ChatIcon from "FigmaIcons/ChatIcon";
import { handleToggleTrigger } from "provider/triggerSlice";

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
  const { identifier } = selector.payload.optionsData.value as {
    identifier: string;
    correctOption: string;
    wrongOption: string;
  };

  const [isActive, setIsActive] = useState(false);
  const coreData = manager.canvasManager.activeComponent.data;

  const handleSetObjective = () => {
    if (isActive) return;
    console.log(questions, "in objective");
    replaceContent(
      coreData?.questions ? coreData.questions : [],
      "OBJECTIVE",
      component
    );
    setIsActive(true);
    dispatch(handleToggleShowOptionBox());
    dispatch(handleSetObjectiveIndex(questions.length));
    dispatch(refreshOptionsData());
  };

  const handleClick = () => {
    if (questions.length > 0) {
      replaceContent(
        coreData?.questions ? coreData.questions : [],
        "OBJECTIVE",
        component
      );
      setIsActive(true);
      dispatch(handleToggleShowOptionBox());
      dispatch(handleSetObjectiveIndex(questions.length));
      dispatch(handleToggleTrigger());
    }
    dispatch(handleSetCorrectOption(""));
    dispatch(handleSetWrongOption(""));
    console.log(manager.canvasManager.activeComponent.data, "changed data");
  };

  const handleDelete = (id: string, optionIndex: number, index: number = 0) => {
    // Find the question to update

    if (index !== -1) {
      const updatedQuestions = [...questions];
      const updatedQuestion = {
        ...updatedQuestions[index],
        options: [
          ...updatedQuestions[index].options.slice(0, optionIndex),
          ...updatedQuestions[index].options.slice(optionIndex + 1),
        ],
      };
      console.log(updatedQuestion.options, "updated options");
      manager.canvasManager.canvas.functions.deleteObjectiveOptions(
        updatedQuestion.options,
        index
      );
      dispatch(handleToggleTrigger());

      updatedQuestions[index] = updatedQuestion;
    }
  };

  useEffect(() => {
    if (coreData?.questions) {
      const filteredQuestions = coreData.questions?.filter(
        (question: QuestionInterface) =>
          question?.type === "OBJECTIVE" && question?.identifier?.includes(id)
      );
      setQuestions(filteredQuestions);
      console.log(questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const { status: optionStatus, type } = selector.payload.feedback.value as {
    optionIndex: number;
    status: number;
    type: string;
  };
  const [isActive, setIsActive] = useState(false);
  const [question, setQuestion] = useState<any>();
  const [addedOption, setAddedOption] = useState(false);

  const coreData = manager.canvasManager.activeComponent.data;

  useEffect(() => {
    setQuestion(coreData.questions[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedOption]);

  const addOption = (data: OptionInterface) => {
    manager.canvasManager.activeComponent.functions.updateObjectiveOptions(
      data,
      index
    );
    setAddedOption(!addedOption);
    dispatch(
      handleSetOptionIndex(question.options ? question.options.length : 0)
    );
    console.log(
      manager.canvasManager.activeComponent.data.questions,
      "clicked"
    );
  };

  const deleteOption = (i: number) => {
    console.log(i, " is the option's index.");
    handleDelete(objective.identifier, i, index);
    setAddedOption(!addedOption);
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
          {question &&
            question.options?.map((option: OptionInterface, i: any) => (
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
                    <RiDeleteBinLine onClick={() => deleteOption(i)} />
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
