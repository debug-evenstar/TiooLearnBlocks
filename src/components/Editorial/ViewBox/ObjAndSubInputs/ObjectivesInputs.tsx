import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import {
  handleSetCorrectOption,
  handleSetWrongOption,
} from "provider/optionsDataSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setObjandSubComponentData } from "./handler";
import ContentEditableDiv from "components/ContentEditableDiv";

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

  const handleSetRightOptionData = (e: any) => {
    const value = e.target.value;
    if (!value) return;
    manager.canvasManager.canvas.functions.updateObjectiveData(
      {
        answers: [value],
      },
      0
    );
    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      0
    );
    dispatch(handleSetCorrectOption(value));
  };

  const handleSetWrongOptionData = (e: any) => {
    const value = e.target.value;
    if (!value) return;
    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      1
    );

    dispatch(handleSetWrongOption(value));
  };

  return (
    <div className="w-full flex justify-around gap-2 my-5 z-1000 cursor-auto absolute top-[8rem]">
      <input
        className="border border-black w-20 p-2 rounded"
        type="text"
        placeholder="Correct"
        value={correctOption}
        onChange={handleSetRightOptionData}
      />

      <input
        className="border border-black w-20 p-2 rounded"
        type="text"
        placeholder="Wrong"
        value={wrongOption}
        onChange={handleSetWrongOptionData}
      />
    </div>
  );
};

export default ObjectivesInputs;
