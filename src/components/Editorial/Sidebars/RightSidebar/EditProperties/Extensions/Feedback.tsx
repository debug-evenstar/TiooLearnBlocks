import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { OptionInterface } from "components/interface";
import { handleSetFeedbackStatus } from "provider/feedbackSlice";
import { handleSetCorrectOption } from "provider/optionsDataSlice";
import React, { FC, useEffect, useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ObjectiveItemProp } from "./interfaces";
import EmojiTextArea from "components/Editorial/ViewBox/Boxtypes/Text/EmojiTextArea";

interface Props {
  manager: EditorialManagerInterface;
  type: "OBJECTIVE" | "SUBJECTIVE";
}

const Feedback: FC<Props> = ({ manager, type }) => {
  const correctRadio = useRef<HTMLInputElement | null>(null);
  const incorrectRadio = useRef<HTMLInputElement | null>(null);
  const neutralRadio = useRef<HTMLInputElement | null>(null);

  const selector: any = useSelector(handleSetCorrectOption);
  const id = selector.payload.activeViewbox.value;
  const { objectiveIndex } = selector.payload.optionsData.value as {
    objectiveIndex: number;
  };

  const { optionIndex, status } = selector.payload.feedback.value as {
    optionIndex: number;
    status: number;
  };

  const [questions, setQuestions] = useState<any[]>([]);
  const [feedbackValue, setFeedbackValue] = useState("");

  const dispatch = useDispatch();
  const { identifier } = selector.payload.optionsData.value as {
    identifier: string;
  };
  const coreData = manager.canvasManager.activeComponent.data.coreData;
  const option: OptionInterface =
    coreData.questions[objectiveIndex]?.options[
      type === "OBJECTIVE" ? optionIndex : 0
    ];
  useEffect(() => {
    console.log(coreData, option);

    coreData?.questions?.forEach((question: any) => {
      if (question?.identifier === identifier) {
        setQuestions([...questions, question]);
        console.log(question);
      }
    });
  }, [coreData, identifier]);

  const handleChangeFeedbackContent = (value: string) => {
    setFeedbackValue(value);
  };

  const handleSaveFeedbackContent = () => {
    manager.canvasManager.canvas.functions.updateFeedbackContent(
      feedbackValue,
      objectiveIndex,
      optionIndex
    );
    dispatch(handleSetFeedbackStatus(false));
    console.log(coreData.questions[objectiveIndex], "changed");
  };

  const handleChangeType = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    console.log(e.target.value, "checked");
    if (e.target.value === "on") {
      e.target.value = "off";
      return;
    }
    manager.canvasManager.canvas.functions.updateFeedbackType(
      type,
      objectiveIndex,
      optionIndex
    );
    console.log(coreData.questions[objectiveIndex], "typing...");
  };

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    manager.canvasManager.canvas.functions.updateFeedbackAnswer(
      e.target.checked,
      objectiveIndex,
      optionIndex
    );

    console.log(coreData.questions[objectiveIndex], "typing...");
  };

  return (
    <div className="w-fit h-fit min-w-[20rem] min-h-[22rem] bg-white border border-black absolute right-[300px] bottom-[200px] pb-4">
      <header className="flex justify-between items-center border-b border-black text-[12px] p-2">
        <p>Set Feedback</p>
        <RiCloseLine
          size={15}
          onClick={() => dispatch(handleSetFeedbackStatus(false))}
        />
      </header>
      <main className="flex flex-col gap-6 p-4 px-6">
        {type === "OBJECTIVE" ? (
          <div className="text-[13px]">
            <b>Option {optionIndex + 1}</b>: {option.content}
          </div>
        ) : (
          <div className="text-[13px]">
            <b>Answer</b>: {option.content}
          </div>
        )}

        {type === "OBJECTIVE" && (
          <>
            <div className="flex gap-2 items-center">
              <input
                className="border-10 border-black"
                type="checkbox"
                onChange={handleChangeAnswer}
                defaultChecked={option.answer}
              />
              <p className="text-[13px]">Answer</p>
            </div>

            <div>
              <p className="text-[13px]">Types</p>

              <div className="my-1 flex justify-evenly gap-4 items-center">
                <div className="my-1 flex gap-2 items-center">
                  <input
                    ref={correctRadio}
                    type="radio"
                    onChange={(e) => handleChangeType(e, "correct")}
                    value={option.feedback.type === "correct" ? "on" : "off"}
                  />
                  <p className="text-[13px]">Correct</p>
                </div>

                <div className="my-1 flex gap-2 items-center">
                  <input
                    ref={incorrectRadio}
                    type="radio"
                    onChange={(e) => handleChangeType(e, "incorrect")}
                    value={option.feedback.type === "incorrect" ? "on" : "off"}
                  />
                  <p className="text-[13px]">Incorrect</p>
                </div>

                <div className="my-1 flex gap-2 items-center">
                  <input
                    ref={neutralRadio}
                    type="radio"
                    onChange={(e) => handleChangeType(e, "neutral")}
                    value={option.feedback.type === "neutral" ? "on" : "off"}
                  />
                  <p className="text-[13px]">Neutral</p>
                </div>
              </div>
            </div>
          </>
        )}

        <textarea
          className="w-full border border-black rounded p-2 text-[13px]"
          placeholder="Input Feedback"
          rows={5}
          onChange={(e) => handleChangeFeedbackContent(e.target.value)}
          defaultValue={option.feedback.content}
        />

        {false && (
          <EmojiTextArea
            value={feedbackValue}
            defaultValue={option.feedback.content}
            onChange={handleChangeFeedbackContent}
          />
        )}
      </main>

      <div className="w-full px-6">
        <button
          onClick={handleSaveFeedbackContent}
          className="w-full bg-[#4f46e5] text-white rounded p-2"
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Feedback;
