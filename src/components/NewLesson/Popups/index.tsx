import React, { FC } from "react";
import "./style.css";
import catImg from "img/popup/cat.svg";
import penguinImg from "img/popup/penguin.gif";
import continueImg from "img/popup/continue-white.svg";
import continueActiveImg from "img/popup/continue-main.svg";
import successBg from "img/popup/success-popup-bg.svg";
import errorBg from "img/popup/error-popup-bg.svg";
import { FaCross } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface FeedbackPopupProps {
  type: "wrong" | "correct";
  title: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  content: string;
  onClose: Function;
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

const FeedbackPopup: FC<FeedbackPopupProps> = ({
  type,
  title,
  position = "top-right",
  content,
  onClose,
  onContinue,
}) => {
  const isWrong = type == "wrong";

  // turn this top-right to 'top-0 right-0'
  const positionStyle = position
    .split("-")
    .map((i: string) => `${i}-0`)
    .join(" ");

  return (
    <div className="bg-[#00000011] urbanist fixed h-screen w-full z-[19000] flex">
      <div
        className={`w-[430px] h-[250px] h-fit text-white  m-10 absolute ${positionStyle}`}
      >
        <div className="relative">
          <button
            className="absolute z-[10] m-5 font-[500] text-xl right-0"
            onClick={(e) => onClose(e)}
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
    </div>
  );
};

export default FeedbackPopup;
