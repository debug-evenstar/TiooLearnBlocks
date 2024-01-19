import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
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
  manager: EditorialManagerInterface;
}

const ObjectivesInputs: FC<Props> = ({ manager }) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(refreshToggleSidebarState);
  const { objectiveIndex } = selector.payload.optionsData.value as {
    objectiveIndex: number;
    correctOption: string;
    wrongOption: string;
  };
  const trigger: boolean = selector.payload.trigger.value;
  const data: QuestionInterface =
    manager.canvasManager.activeComponent.data.coreData?.extensions[
      objectiveIndex
    ]?.question[0];
  const [question, setQuestion] = useState<QuestionInterface>(data);

  useEffect(() => {
    console.log(trigger, "changed");
    setQuestion(data);
    console.log(
      manager.canvasManager.activeComponent.data.coreData?.extensions,
      "data extensions"
    );
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
    if (index > 0) dispatch(handleSetCorrectOption(value));
    else dispatch(handleSetWrongOption(value));
  };

  return (
    <div className="w-full flex justify-around gap-2 my-5 relative top-[2rem] z-[5000]s">
      {question?.options?.map((option: any, i: number) => (
        <input
          key={i}
          className="border border-black w-[8rem] p-2 rounded text-center z-[5000] relative"
          type="text"
          value={option.content}
          onChange={(e) => handleSetOptionData(e, i)}
        />
      ))}
    </div>
  );
};

export default ObjectivesInputs;
