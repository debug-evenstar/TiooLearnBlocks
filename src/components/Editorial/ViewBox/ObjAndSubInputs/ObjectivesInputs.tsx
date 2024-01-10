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
  const { correctOption, wrongOption } = selector.payload.optionsData.value as {
    correctOption: string;
    wrongOption: string;
  };

  const handleSetRightOptionData = (e: any) => {
    const value = e.target.value;
    if (!value) return;
    dispatch(handleSetCorrectOption(value));
    {
      /* manager.canvasManager.canvas.functions.updateActiveComponentData(
      setObjandSubComponentData("OBJECTIVE", "", [correctOption], [""], [""])
    ); */
    }
  };

  const handleSetWrongOptionData = (e: any) => {
    const value = e.target.value;
    if (!value) return;
    dispatch(handleSetWrongOption(value));
    {
      /* manager.canvasManager.canvas.functions.updateActiveComponentData(
      setObjandSubComponentData("OBJECTIVE", "", [wrongOption], [""], [""])
    ); */
    }
  };

  return (
    <a href="javascript:void(0)">
      <div className="w-full flex justify-around gap-2 my-5 z-1000 cursor-auto">
        <input
          className="border border-black w-20 p-2"
          type="text"
          placeholder="Correct"
          value={correctOption}
          onChange={handleSetRightOptionData}
        />

        <input
          className="border border-black w-20 p-2"
          type="text"
          placeholder="Wrong"
          value={wrongOption}
          onChange={handleSetWrongOptionData}
        />
      </div>
    </a>
  );
};

export default ObjectivesInputs;
