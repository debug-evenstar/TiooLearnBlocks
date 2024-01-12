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

interface Props {
  manager: EditorialManagerInterface;
}

const Objective: FC<Props> = ({ manager }) => {
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
    console.log(questions, "in objective");
    replaceContent(questions, "OBJECTIVE");
    setIsActive(true);
    dispatch(handleToggleShowOptionBox());
    dispatch(refreshOptionsData());
  };

  const handleClick = () => {
    console.log(
      manager.canvasManager.activeComponent.data.coreData,
      "changed data"
    );
    if (questions.length > 0) {
      replaceContent(questions, "OBJECTIVE");
      setIsActive(true);
      dispatch(handleToggleShowOptionBox());
      dispatch(handleSetObjectiveIndex(questions.length));
    }
    dispatch(handleSetCorrectOption(""));
    dispatch(handleSetWrongOption(""));
  };

  const handleDelete = (id: string, optionIndex: number) => {
    setQuestions((prevQuestions) => {
      // Find the question to update
      const questionIndex = prevQuestions.findIndex(
        (question) => question.identifier === id
      );

      if (questionIndex !== -1) {
        // Create a copy of the question with the updated options
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
        // Handle the case where the question is not found
        return prevQuestions;
      }
    });
  };

  useEffect(() => {
    console.log(identifier, correctOption, wrongOption, " - Options");
  }, [identifier]);

  useEffect(() => {
    coreData?.questions?.forEach((question: any) => {
      if (question?.type === "OBJECTIVE" && question?.identifier.includes(id)) {
        setQuestions([...questions, question]);
        console.log(question);
      }
    });
  }, [coreData, identifier]);

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
              questions?.map((obj: any, i: number) => (
                <ObjectiveItem
                  key={obj.identifier}
                  objective={obj}
                  index={i}
                  data={coreData}
                  handleDelete={handleDelete}
                  manager={manager}
                />
              ))}
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
  const [isActive, setIsActive] = useState(false);

  const addOption = (data: string, optionIndex: number) => {
    manager.canvasManager.activeComponent.functions.updateObjectiveOption(
      data,
      index,
      optionIndex
    );
    console.log("cliked");
  };

  return (
    <div className="py-1">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[12px]">
          {isActive ? <b>Objective {index + 1}</b> : `Objective ${index + 1}`}
        </p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          {objective.options?.map((option: string, i: any) => (
            <div key={i}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <MdChatBubbleOutline />
                  <p className="text-[12px] my-2">{option}</p>
                </div>
                <div className="flex items-center gap-1">
                  <RiFeedbackLine />
                  <RiDeleteBinLine
                    onClick={() => handleDelete(objective.identifier, i)}
                  />
                </div>
              </div>
              {false && <Feedback />}
            </div>
          ))}

          <div
            className="flex justify-between py-2 items-center"
            onClick={() => addOption("", objective.options.length)}
          >
            <p className="text-[12px]">Add option</p>
            <RiAddCircleLine size={"13px"} color="grey" />
          </div>
        </main>
      )}
    </div>
  );
};
