import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import {
  handleSetCorrectOption,
  handleSetWrongOption,
} from "provider/optionsDataSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  manager: EditorialManagerInterface;
}

const ObjectivesInputs: FC<Props> = ({ manager }) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(refreshToggleSidebarState);
  const { objectiveIndex, correctOption, wrongOption } = selector.payload
    .optionsData.value as {
    objectiveIndex: number;
    correctOption: string;
    wrongOption: string;
  };
  const coreData = manager.canvasManager.activeComponent.data.coreData;
  const question = coreData.questions[objectiveIndex];

  const handleSetOptionData = (e: any, index: number) => {
    const value = e.target.value;
    if (!value) return;

    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      index
    );
    if (index > 0) dispatch(handleSetCorrectOption(value));
    else dispatch(handleSetWrongOption(value));
  };

  useEffect(
    () => console.log(coreData, objectiveIndex, "objective"),
    [question]
  );

  return (
    <div className="w-full flex justify-around gap-2 my-5 relative top-[2rem] z-[5000]s">
      {question?.options?.map((option: any, i: number) => (
        <input
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
