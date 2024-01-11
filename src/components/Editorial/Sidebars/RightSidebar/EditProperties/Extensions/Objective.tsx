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
import { MdChatBubbleOutline } from "react-icons/md";

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

  useEffect(() => {
    console.log(identifier, correctOption, wrongOption, " - Options");
  }, [identifier]);

  useEffect(() => {
    coreData?.questions?.forEach((question: any) => {
      if (question?.identifier.includes(id)) {
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
}) => {
  const [isActive, setIsActive] = useState(false);

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
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <MdChatBubbleOutline />
                <p className="text-[12px] my-2">{option}</p>
              </div>
              <RiDeleteBinLine />
            </div>
          ))}

          <div className="flex justify-between py-2 items-center">
            <p className="text-[12px]">Add option</p>
            <RiAddCircleLine size={"13px"} color="grey" />
          </div>
        </main>
      )}
    </div>
  );
};
