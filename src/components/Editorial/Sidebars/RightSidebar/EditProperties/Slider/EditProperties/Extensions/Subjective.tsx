import React, { FC, useEffect, useState } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { useDispatch, useSelector } from "react-redux";
import {
  handleSetCorrectOption,
  handleSetObjectiveIndex,
} from "provider/optionsDataSlice";
import { RiAddCircleLine, RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import Feedback from "./Feedback";
import FeedbackIcon from "FigmaIcons/FeedbackIcon";
import {
  handleSetFeedbackStatus,
  handleSetFeedbackType,
  handleSetOptionIndex,
} from "provider/feedbackSlice";
import { QuestionInterface } from "components/interface";
import { OptionsDataState } from "components/Editorial/Base/StateInterface";

interface Props {
  manager: EditorialManagerInterface;
  component: string;
}

const Subjective: FC<Props> = ({ manager, component }) => {
  const id = manager.states.activeViewBox;
  const activeCompName = manager.states.slider.activeCompName;
  const activeCompIndex = manager.states.slider.activeCompIndex;

  const [questions, setQuestions] = useState<any[]>([]);
  const replaceContent =
    manager.canvasManager.activeComponent.functions?.replaceContent;

  const { identifier, correctOption, wrongOption } = manager.states.optionsData;

  const [isActive, setIsActive] = useState(false);
  const sliderIndex = manager.canvasManager.activeComponent.data.index;
  const coreData =
    manager.canvasManager.activeComponent.data.components[sliderIndex].slides[
      activeCompIndex
    ][0];

  const handleSetObjective = () => {
    if (isActive) return;
    replaceContent(questions, "SUBJECTIVE", component, true, activeCompIndex);
    setIsActive(true);
    manager.setState("optionsData", (prev : OptionsDataState) => ({
      ...prev,
      ...({ 
        objectiveIndex : questions.length,
        correctOption : ""
      }) as OptionsDataState
    }));
  };

  const handleClick = () => {
    console.log(manager.canvasManager.activeComponent.data, "changed data");
    if (questions.length > 0) {
      replaceContent(questions, "SUBJECTIVE", component, true, activeCompIndex);
      setIsActive(true);
    }
    manager.setState("optionsData", (prev : OptionsDataState) => ({
      ...prev,
      ...({ 
        objectiveIndex : questions.length > 0 ? questions.length : prev.objectiveIndex,
        correctOption : ""
      }) as OptionsDataState
    }));
  };

  const handleDelete = (id: string) => {
    const filteredQuestions = questions.filter(
      (question) => question.identifier !== id
    );
    setQuestions(filteredQuestions);
    manager.canvasManager.activeComponent.functions.updateActiveComponentObjective(
      filteredQuestions,
      "Slider",
      activeCompIndex
    );
  };

  useEffect(() => {
    console.log(identifier, correctOption, wrongOption, " - Optionsd");
  }, [identifier]);

  useEffect(() => {
    if (coreData?.questions) {
      const filteredQuestions = coreData.questions?.filter(
        (question: QuestionInterface) => question?.type === "SUBJECTIVE"
      );
      setQuestions(filteredQuestions);
      console.log(questions, "check id");
    }
    console.log(coreData.questions, "in slider subjective");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreData?.questions, identifier]);

  return (
    <div className="w-full p-2 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleSetObjective}
      >
        <p className="text-[13px]">
          {isActive ? <b>Set Subjective</b> : "Set Subjective"}
        </p>
      </div>

      {isActive && (
        <>
          <div
            className="flex justify-between items-center py-2"
            onClick={handleClick}
          >
            <p className="text-[12px]">Add a subjective</p>
            <RiAddCircleLine size={"13px"} color="grey" />
          </div>

          <div className="w-full flex justify-between items-center cursor-pointer">
            <div className="w-full text-[12px]">
              {questions &&
                questions?.map((sub: any, index: number) => (
                  <SubjectiveItem
                    sub={sub}
                    index={index}
                    manager={manager}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Subjective;

const SubjectiveItem: FC<any> = ({ sub, index, manager, handleDelete }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState("");

  const { objectiveIndex } = manager.states.optionsData;
  const { optionIndex, status: optionStatus, type } = manager.states.feedback;
  const activeCompIndex = manager.states.slider.activeCompIndex;

  const sliderIndex = manager.canvasManager.activeComponent.data.index;
  const coreData =
    manager.canvasManager.activeComponent.data.components[sliderIndex].slides[
      activeCompIndex
    ][0];

  const handleSetSubjective = () => {
    if (!value) return;
    manager.canvasManager.canvas.functions.updateObjectiveData(
      {
        answers: [value],
      },
      0,
      "Slider",
      activeCompIndex
    );
    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      0,
      "Slider",
      activeCompIndex
    );
    setIsEditable(false);
    manager.setFeedbackStatusState(false);
    console.log(sub, "subjective");

    console.log("typing..", value, objectiveIndex);
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
        <p className="text-[12px]">
          {isEditable ? (
            <b>Subjective {index + 1}</b>
          ) : (
            `Subjective ${index + 1}`
          )}
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
              <input type="radio" checked />
            </div>
            <div className="flex justify-between items-center py-1 my-1">
              <p className="">AI</p>
              <input type="radio" disabled />
            </div>
          </div>
          <textarea
            className="w-full border border-black p-2"
            placeholder="Type the answer"
            rows={5}
            onChange={(e: any) => setValue(e.target.value)}
            value={value}
          />
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
        <Feedback manager={manager} type="SUBJECTIVE" />
      )}
    </div>
  );
};
