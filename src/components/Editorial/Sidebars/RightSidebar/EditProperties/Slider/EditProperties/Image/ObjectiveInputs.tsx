import { ManagerInterface } from "components/Editorial/Base/Manager";
import { QuestionInterface } from "components/interface";
import {
  handleSetCorrectOption,
  handleSetWrongOption,
} from "provider/optionsDataSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { handleToggleShowOptionBox } from "provider/showOptionsBoxSlice";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  manager: ManagerInterface;
}

const ObjectivesInputs: FC<Props> = ({ manager }) => {
  const { objectiveIndex } = manager.states.optionsData;
  const trigger = manager.states.trigger;
  const data: QuestionInterface =
    manager.canvasManager.activeComponent.data?.extensions[objectiveIndex]
      ?.question[0];
  const [question, setQuestion] = useState<QuestionInterface>(data);

  useEffect(() => {
    setQuestion(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const handleSetOptionData = (e: any, index: number) => {
    const value = e.target.value;
    if (!value) return;

    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      index,
      "Overlay"
    );

    if (index > 0) {
      manager.setState("optionsData", (optionsData: any) => {
        return { ...optionsData, ...{ correctOption: value } };
      });
    } else {
      manager.setState("optionsData", (optionsData: any) => {
        return { ...optionsData, ...{ wrongOption: value } };
      });
    }
  };

  return (
    <div className="w-full flex justify-around gap-2 my-5 relative top-[2rem] z-[5000]s">
      {question?.options?.map((option: any, i: number) => (
        <input
          key={i}
          className="border border-black w-[8rem] p-2 rounded text-center z-[5000] relative"
          type="text"
          defaultValue={option.content}
          onChange={(e) => handleSetOptionData(e, i)}
        />
      ))}
    </div>
  );
};

export default ObjectivesInputs;
