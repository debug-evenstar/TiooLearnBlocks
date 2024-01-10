import React, { FC, useEffect, useState } from "react";
import {
  RiAddCircleLine,
  RiDeleteBin2Fill,
  RiDeleteBinLine,
} from "react-icons/ri";
import { ObjectiveItemProp, ObjectiveItemType, OptionType } from "./interfaces";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { useDispatch, useSelector } from "react-redux";
import {
  handleToggleShowOptionBox,
  refreshToggleShowOptionBox,
} from "provider/showOptionsBoxSlice";
import {
  handleSetCorrectOption,
  refreshOptionsData,
} from "provider/optionsDataSlice";
import { MdChatBubbleOutline } from "react-icons/md";
import { setObjandSubComponentData } from "components/Editorial/ViewBox/ObjAndSubInputs/handler";

interface Props {
  manager: EditorialManagerInterface;
}

const Objective: FC<Props> = ({ manager }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const replaceContent =
    manager.canvasManager.activeComponent.functions?.replaceContent;

  const dispatch = useDispatch();
  const selector: any = useSelector(handleSetCorrectOption);
  const { identifier, correctOption, wrongOption } = selector.payload
    .optionsData.value as {
    identifier: string;
    correctOption: string;
    wrongOption: string;
  };
  const data = selector.payload.optionsData.value;

  const [isActive, setIsActive] = useState(false);

  const [objectives, setObjectives] = useState<[ObjectiveItemType] | any[]>([]);

  const handleClick = () => {
    replaceContent();
    const nameAppend = objectives.length + 1;
    setObjectives([
      ...objectives,
      {
        id: objectives.length + 1,
        name: "Objective " + nameAppend,
        options: [
          {
            name: correctOption,
          },
          {
            name: wrongOption,
          },
        ],
      },
    ]);
    console.log(data, "identifier");

    dispatch(refreshToggleShowOptionBox());
    //dispatch(refreshOptionsData());
  };

  useEffect(() => {
    console.log(identifier, correctOption, wrongOption, " - Options");
    manager.canvasManager.canvas.functions.updateActiveComponentData(
      setObjandSubComponentData(
        "OBJECTIVE",
        identifier,
        [correctOption, wrongOption],
        [correctOption],
        [""]
      )
    );
  }, [identifier, correctOption, wrongOption]);

  const coreData = manager.canvasManager.activeComponent.data.coreData;
  useEffect(() => {
    coreData.questions.map((question: any) => {
      if (question?.identifier.includes(id)) {
        setQuestions([...questions, question]);
      }
    });
  }, [coreData, identifier]);

  const id = selector.payload.activeViewbox.value;

  return (
    <div className="p-2 shadow-md">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => {
          setIsActive(!isActive);
          dispatch(handleToggleShowOptionBox());
        }}
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
