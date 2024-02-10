import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { OptionsDataState } from "components/Editorial/Base/StateInterface";
import { resizeInputWidth } from "components/Editorial/ViewBox/handler";
import { QuestionInterface } from "components/interface";
import { FC, createRef, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

interface Props {
  manager: EditorialManagerInterface;
}

const FlashcardObjectivesInputs: FC<Props> = ({ manager }) => {
  const { objectiveIndex } = manager.states.optionsData;
  const trigger = manager.states.trigger;

  const data: QuestionInterface =
    manager.canvasManager.activeComponent.data.cards[objectiveIndex].question;
  const [question, setQuestion] = useState<QuestionInterface>(data);
  const [maxWidth, setMaxWidth] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setQuestion(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, objectiveIndex]);

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
      "Flashcard"
    );
    manager.setState("optionsData", (prev: OptionsDataState) => ({
      ...prev,
      ...({
        wrongOption: index <= 0 ? value : prev.wrongOption,
        correctOption: index > 0 ? value : prev.correctOption,
      } as OptionsDataState),
    }));
  };

  const [widestInputWidth, setWidestInputWidth] = useState(0);

  return (
    <div className="w-full flex justify-around gap-2 my-5 z-[5000]s">
      {question?.options?.map((option: any, i: number) => {
        const nodeRef: any = createRef();

        return (
          <Draggable
            key={i}
            axis="both"
            nodeRef={nodeRef}
            handle=".objInputHandleImage"
          >
            <div ref={nodeRef} className="mx-1">
              <input
                ref={(el) => (inputRefs.current[i] = el)}
                className="border border-black p-2 rounded text-center z-[5000] relative objInputHandleImage"
                type="text"
                defaultValue={option.content}
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

export default FlashcardObjectivesInputs;
