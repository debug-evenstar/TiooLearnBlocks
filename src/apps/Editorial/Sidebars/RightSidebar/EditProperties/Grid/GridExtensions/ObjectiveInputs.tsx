import { ManagerInterface } from "apps/Editorial/Base/Manager";
import { resizeInputWidth } from "apps/Editorial/ViewBox/handler";
import { QuestionInterface } from "components/interface";
import { FC, createRef, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

interface Props {
  manager: ManagerInterface;
}

const GridObjectivesInputs: FC<Props> = ({ manager }) => {
  const trigger = manager.states.trigger;
  const data = manager.canvasManager.activeComponent.data.buttons;
  const [buttons, setButtons] = useState<any>(data);
  const [maxWidth, setMaxWidth] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setButtons(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const handleSetOptionData = (e: any, index: number) => {
    const value = e.target.value ?? "";

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

    data.options[index].content = value;

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

  const [widestInputWidth, setWidestInputWidth] = useState(0);

  return (
    <div className="w-full flex justify-around gap-2 my-5 z-[5000]s">
      <Draggable nodeRef={nodeRef} axis="both" handle=".objInputHandleImage">
        <div ref={nodeRef} className="flex">
          {buttons?.options?.map((option: any, i: number) => {
            return (
              <div
                key={i}
                className="flex justify-center w-full border border-black p-2 rounded mx-1 objInputHandleImage"
              >
                <input
                  ref={(el) => (inputRefs.current[i] = el)}
                  className="outline-none text-center z-[5000] relative"
                  type="text"
                  defaultValue={option.content}
                  onChange={(e) => handleSetOptionData(e, i)}
                  style={{ width: maxWidth === 0 ? 100 : maxWidth }}
                  onLoad={(e: any) => resizeInputWidth(e.target)}
                />

                {option.url && (
                  <img src={option.url} alt="" className="h-full w-[20%]" />
                )}
              </div>
            );
          })}
        </div>
      </Draggable>
    </div>
  );
};

export default GridObjectivesInputs;
