import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import {
  handleSetCorrectOption,
  handleSetWrongOption,
} from "provider/optionsDataSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { FC, createRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resizeInputWidth } from "../handler";
import Draggable from "react-draggable";

interface Props {
  manager: EditorialManagerInterface;
}

const ObjectivesInputs: FC<Props> = ({ manager }) => {
  

  const { objectiveIndex } = manager.states.optionsData;
  const trigger = manager.states.trigger;
  const [question, setQuestion] = useState<any>();
  const [maxWidth, setMaxWidth] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const activeCompIndex = manager.states.slider.activeCompIndex;

  const sliderIndex = manager.canvasManager.activeComponent.data.index;
  const coreData =
    manager.canvasManager.activeComponent.data.components[sliderIndex].slides[
      activeCompIndex
    ][0];

  useEffect(() => {
    setQuestion(coreData.questions[objectiveIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const handleSetOptionData = (e: any, index: number) => {
    const value = e.target.value;
    if (!value) return;

    let max = 0;
    inputRefs.current.forEach((input) => {
      if (input) {
        const width = input.scrollWidth;
        if (width > max) {
          max = width;
        }
      }
    });
    setMaxWidth(max);

    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      index,
      "Slider",
      activeCompIndex
    );
    const optionsData = manager.canvasManager.canvas.states.optionsData;

    if (index > 0) {
      manager.setState({
        optionsData: {
          ...optionsData,
          correctOption: value,
        },
      });
    } else {
      manager.setState({
        optionsData: {
          ...optionsData,
          wrongOption: value,
        },
      });
    }
  };

  return (
    <div className="w-full flex justify-around my-5 z-[5000]s">
      {question?.options?.map((option: any, i: number) => {
        const nodeRef: any = createRef();

        return (
          <Draggable
            key={i}
            axis="both"
            nodeRef={nodeRef}
            handle=".objInputHandleText"
          >
            <div ref={nodeRef} className="mx-1">
              <input
                ref={(el) => (inputRefs.current[i] = el)}
                className="border border-black p-2 rounded text-center z-[5000] relative objInputHandleImage"
                type="text"
                value={option.content}
                onChange={(e) => handleSetOptionData(e, i)}
                style={{ width: maxWidth === 0 ? 100 : maxWidth }}
                onLoad={(e: any) => resizeInputWidth(e.target)}
              />
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default ObjectivesInputs;
