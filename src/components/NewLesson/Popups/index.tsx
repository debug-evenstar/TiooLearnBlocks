import React, { FC, useState, forwardRef, useImperativeHandle, useRef } from "react";
import "./style.css";
import catImg from "img/popup/cat.gif";
import penguinImg from "img/popup/penguin.gif";
import continueImg from "img/popup/continue-white.svg";
import continueActiveImg from "img/popup/continue-main.svg";
import successBg from "img/popup/success-popup-bg.svg";
import errorBg from "img/popup/error-popup-bg.svg";
import { MdClose } from "react-icons/md";
import { audioManager } from "components/NewLesson/AudioManager/AudioManager";
import correctTipImg from "img/popup/correct-tip.svg"
import wrongTipImg from "img/popup/wrong-tip.svg"
// import { StringLiteralLike } from "typescript";

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

// now everyone has access


const ErrorLayout = ({ title, content }: any) => {
  return (
    <div className="pt-5 relative">
      <img src={wrongTipImg} alt="" className="absolute w-[2rem] -top-3 right-20"/>
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

  const handleContinueClick = (e: any) => {
    audioManager.playContinue();
    console.log("moving to next slide ")
    onContinue(e);
  }

  return (
    <div className="h-full flex justify-center flex-col relative">
      <img src={correctTipImg} alt="" className="absolute w-[2rem] -top-3 right-20"/>
      <div className="flex items-center space-x-2 relative">
        <img src={penguinImg} alt="" className="max-h-[90px]" />
        <div className="mr-auto">
          <p className="text-sm">{title}</p>
          <p className="font-[600]">{content}</p>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button onClick={handleContinueClick} className="w-[30%] hover:scale-[1.08]">
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
    const [canProceed, setCanProceed] = useState<boolean>(true);
    const [feedbackState, setFeedbackState] = useState<FeedbackType | null>(null);
    
    const isWrong = feedbackState === FeedbackType.WRONG;
    
    const onClose = () => setIsVisible(!isVisible);
    

    const setValues = (title: string, content: string, state: FeedbackType, visible = true) => {
      setTitle(title);
      setFeedbackState(state);
      setContent(content);
      setIsVisible(visible);
    };

    const handleContinue = () => {
      if ( canProceed ) {
        onContinue && onContinue();
      } else {
        setIsVisible(false);
      }
    }

    useImperativeHandle(ref, () => ({
      showFeedback(title: string, content: string, type: FeedbackType, shouldContinue? : boolean) {
        type === FeedbackType.WRONG ?
          audioManager.playWrong()
          :
          audioManager.playCorrect();
        setValues(title, content, type);
        setCanProceed(!!shouldContinue);
      },
      hideFeedback() {
        setIsVisible(false);
      },
    }));
    ;
    return (
      <div
        ref={divRef}
        style={{
          top: 0,
          right: isVisible ? 0 : "-50%"
        }}
        // className={`w-[430px] h-[250px] h-fit text-white ease-in z-[20000] duration-300 m-10 fixed`}
        className={`w-full sm:w-[430px] h-fit text-white ease-in z-[20000] duration-300 m-10 fixed`}
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
