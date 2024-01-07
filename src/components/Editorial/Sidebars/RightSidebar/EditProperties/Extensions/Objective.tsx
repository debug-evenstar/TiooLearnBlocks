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

interface Props {
  manager: EditorialManagerInterface;
}

const Objective: FC<Props> = ({ manager }) => {
  const replaceContent =
    manager.canvasManager.activeComponent.functions?.replaceContent;

  const dispatch = useDispatch();
  const selector: any = useSelector(handleSetCorrectOption);
  const { correctOption, wrongOption } = selector.payload.optionsData.value as {
    correctOption: string;
    wrongOption: string;
  };

  const [isActive, setIsActive] = useState(false);
  const [optionData, setOptionData] = useState<any>({
    correctOption: "",
    wrongOption: "",
  });

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
    dispatch(refreshOptionsData());
    dispatch(refreshToggleShowOptionBox());
  };

  useEffect(() => {
    console.log(correctOption, wrongOption, " - Options");
  }, [correctOption, wrongOption]);

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
            {objectives.map((obj: ObjectiveItemType) => (
              <ObjectiveItem key={obj.id} objective={obj} />
            ))}
          </section>
        </main>
      )}
    </div>
  );
};

export default Objective;

export const ObjectiveItem: FC<ObjectiveItemProp> = ({
  objective: { name, options },
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="py-1">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[12px]">{isActive ? <b>{name}</b> : name}</p>
      </div>

      {isActive && (
        <main className="w-full p-2">
          {options?.map((option: OptionType, i: any) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <MdChatBubbleOutline />
                <p className="text-[12px] my-2">{option.name}</p>
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
