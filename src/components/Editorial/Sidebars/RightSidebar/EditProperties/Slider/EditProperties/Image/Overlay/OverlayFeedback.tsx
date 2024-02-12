import { ManagerInterface } from "components/Editorial/Base/Manager";
import { OptionInterface } from "components/interface";
import { handleSetFeedbackStatus } from "provider/feedbackSlice";
import { handleSetCorrectOption } from "provider/optionsDataSlice";
import React, { FC, useEffect, useRef, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import EmojiTextArea from "../../Extensions/EmojiTextarea/EmojiTextArea";
import { FeedbackState } from "components/Editorial/Base/StateInterface";

interface Props {
  manager: ManagerInterface;
  type: "OBJECTIVE" | "SUBJECTIVE";
  index: number;
}

const OverlayFeedback: FC<Props> = ({ manager, type, index }) => {
  const correctRadio = useRef<HTMLInputElement | null>(null);
  const incorrectRadio = useRef<HTMLInputElement | null>(null);
  const neutralRadio = useRef<HTMLInputElement | null>(null);

  const { objectiveIndex } = manager.states.optionsData;

  const { optionIndex } = manager.states.feedback;

  const [feedbackValue, setFeedbackValue] = useState("");

  const coreData = manager.canvasManager.activeComponent.data;
  const option: OptionInterface =
    coreData.extensions[index]?.question[0].options[
      type === "OBJECTIVE" ? optionIndex : 0
    ];

  const [disabled, setDisabled] = useState(option.answer);

  const handleChangeFeedbackContent = (value: string) => {
    setFeedbackValue(value);
  };

  const handleSaveFeedbackContent = () => {
    manager.canvasManager.canvas.functions.updateFeedbackContent(
      feedbackValue,
      index,
      optionIndex,
      "Overlay"
    );
    manager.setState("feedback", (prev: FeedbackState) => {
      return { ...prev, ...({ status: false } as FeedbackState) };
    });
  };

  const handleChangeType = (type: string) => {
    manager.canvasManager.canvas.functions.updateFeedbackType(
      type,
      index,
      optionIndex,
      "Overlay"
    );
  };

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(e.target.checked);
    manager.canvasManager.canvas.functions.updateFeedbackAnswer(
      e.target.checked,
      index,
      optionIndex,
      "Overlay"
    );
  };

  return (
    <div className="w-fit h-fit min-w-[20rem] min-h-[22rem] bg-white border border-black absolute right-[200px] bottom-[50px] pb-4">
      <header className="flex justify-between items-center border-b border-black text-[12px] p-2">
        <p>Set Feedback</p>
        <RiCloseLine
          size={15}
          onClick={() =>
            manager.setState("feedback", (prev: FeedbackState) => {
              return { ...prev, ...({ status: false } as FeedbackState) };
            })
          }
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
                  <RadioButton
                    type="correct"
                    onChange={handleChangeType}
                    defaultValue={option.answer}
                  />

                  <p className="text-[13px]">Correct</p>
                </div>

                <div className="my-1 flex gap-2 items-center">
                  {false && (
                    <input
                      ref={incorrectRadio}
                      type="radio"
                      //onChange={(e) => handleChangeType(e, "incorrect")}
                      value={
                        option.feedback.type === "incorrect" ? "on" : "off"
                      }
                    />
                  )}
                  <RadioButton
                    type="incorrect"
                    onChange={handleChangeType}
                    defaultValue={
                      option.feedback.type === "incorrect" ? true : false
                    }
                    disabled={disabled}
                  />
                  <p className="text-[13px]">Incorrect</p>
                </div>

                <div className="my-1 flex gap-2 items-center">
                  <RadioButton
                    type="neutral"
                    onChange={handleChangeType}
                    defaultValue={
                      option.feedback.type === "neutral" ? true : false
                    }
                    disabled={disabled}
                  />

                  <p className="text-[13px]">Neutral</p>
                </div>
              </div>
            </div>
          </>
        )}

        {false && (
          <textarea
            className="w-full border border-black rounded p-2 text-[13px]"
            placeholder="Input Feedback"
            rows={5}
            onChange={(e) => handleChangeFeedbackContent(e.target.value)}
            defaultValue={option.feedback.content}
          />
        )}

        <EmojiTextArea
          value={feedbackValue}
          defaultValue={option.feedback.content}
          onChange={handleChangeFeedbackContent}
        />
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

export default OverlayFeedback;

interface RadioButtonProps {
  type: string;
  onChange: (type: string) => void;
  defaultValue: boolean;
  disabled?: boolean;
}

export const RadioButton: FC<RadioButtonProps> = ({
  type,
  onChange,
  defaultValue,
  disabled = false,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleClicked = () => {
    setValue(!value);
    onChange(type);
  };

  return (
    <div
      className={`flex items-center ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={disabled ? () => null : handleClicked}
      style={{
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {value ? (
        <span className="h-3.5 w-3.5 rounded-full border border-[#4f46e5] shadow-sm p-0.5">
          <div className="h-full w-full bg-[#4f46e5] rounded-full" />
        </span>
      ) : (
        <span className="h-3.5 w-3.5 rounded-full border border-gray-500 shadow-sm" />
      )}
    </div>
  );
};
