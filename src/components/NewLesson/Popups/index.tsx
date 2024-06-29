import React, { FC, useState, forwardRef, useImperativeHandle, useRef } from "react";
import "./style.css";
import catImg from "img/popup/cat.svg";
import penguinImg from "img/popup/penguin.gif";
import continueImg from "img/popup/continue-white.svg";
import continueActiveImg from "img/popup/continue-main.svg";
import successBg from "img/popup/success-popup-bg.svg";
import errorBg from "img/popup/error-popup-bg.svg";
import { MdClose } from "react-icons/md";
import { StringLiteralLike } from "typescript";

export enum FeedbackType {
  CORRECT,
  WRONG,
}

interface FeedbackPopupProps {

  ref: any;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  onClose?: Function;
  onContinue?: Function;
}

const ErrorLayout = ({ title, content }: any) => {
  return (
    <div className="pt-5">
      <div className="px-16">
        <p className="text-sm font-[500]">{title}</p>
        <p className="text-lg font-[600]">{content}</p>
      </div>
      <img src={catImg} alt="" className="py-2 h-full mx-auto w-[26%]" />
    </div>
  );
};

const SuccessLayout = ({ title, content, onContinue }: any) => {
  const mouseEnter = (e: any) => {
    e.target.src = continueActiveImg;
  };

  const mouseLeave = (e: any) => {
    e.target.src = continueImg;
  };

  return (
    <div className="h-full flex justify-center flex-col">
      <div className="flex items-center space-x-2 relative">
        <img src={penguinImg} alt="" className="mx-auto max-h-[120px]" />
        <div>
          <p className="text-sm">{title}</p>
          <p className="font-[600]">{content}</p>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button onClick={onContinue} className="w-[30%] hover:scale-[1.08]">
          <img
            src={continueImg}
            alt=""
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          />
        </button>
      </div>
    </div>
  );
};

const FeedbackPopup: FC<FeedbackPopupProps> = forwardRef(
  ({ position = "top-right", onContinue }, ref) => {

    const divRef = useRef<any>(null);

    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [feedbackState, setFeedbackState] = useState<FeedbackType | null>(null);
    
    const isWrong = feedbackState == FeedbackType.WRONG;

    // turn this top-right to 'top-0 right-0'
    const onClose = () => setIsVisible(!isVisible);
    let positionStyle =
      position
        .split("-")
        .map((i: string) => `${i}-0`)
        .join(" ") + " ";

    const setValues = (title: string, content: string, state: FeedbackType) => {
      setTitle(title);
      setFeedbackState(state);
      setContent(content);
      setIsVisible(true);
    };

    useImperativeHandle(ref, () => ({
      wrongFeedback(title: string, content: string) {
        setValues(title, content, FeedbackType.WRONG);
      },

      correcFeedback(title: string, content: string) {
        setValues(title, content, FeedbackType.CORRECT);
      },
    }));

    return (
      <div
        ref={divRef}
        className={`w-[430px] h-[250px] h-fit text-white ease-in z-[20000] duration-300 m-10 fixed ${positionStyle} ${
          isVisible ? "-right-[40%]" : ""
        }`}
      >
        <div className="relative">
          <button
            className="absolute z-[10] m-5 font-[500] text-xl right-0"
            onClick={onClose}
          >
            <MdClose />
          </button>
          <div className="relative">
            <img src={isWrong ? errorBg : successBg} alt="" />
            <div className="absolute top-0 w-full px-3 h-full">
              {isWrong ? (
                <ErrorLayout {...{ title, content }} />
              ) : (
                <SuccessLayout {...{ title, content, onContinue }} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default FeedbackPopup;
