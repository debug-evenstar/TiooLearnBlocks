import leftArrow from "../../../img/left-arrow.svg";
import gotItImg from "../../../img/got-it.png";
import TransitionButton from "../../../components/NewLesson/Buttons/TransitionButton";
import { forwardRef, useImperativeHandle, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";

interface LessonFooterProps {
  previous: () => void;
  currentLesson: any;
  hasPrevious: boolean;
  isPreview: boolean;
  closePreview: Function | undefined;
  next: Function | undefined;
  chatVisible: boolean;
  feedbackRef: React.RefObject<any>;
  handleShowAI: () => void;
}

const AIButton = ({ handleShowAI }: any) => (
  <div className="w-full">
    <button
      className="px-4 w-full sm:w-fit flex gap-2 hover:bg-[#7E1593] duration-300 outline-none h-12 border rounded border-gray-300  items-center hover:text-white text-[#7E1593] justify-center"
      onClick={handleShowAI}
    >
      <FaRobot size={20} />
      <div className="text-start">
        <span className="block text-[12px]">AI TUTOR</span>
        <div className="block text-[18px] -mt-1 font-bold">Explain this screen</div>
      </div>
    </button>
  </div>
);

const LessonFooter = forwardRef(
  (
    {
      previous,
      currentLesson,
      hasPrevious,
      isPreview,
      closePreview,
      next,
      chatVisible,
      feedbackRef,
      handleShowAI,
    }: LessonFooterProps,
    ref
  ) => {
    const [canProceed, setCanProceed] = useState<boolean>(false);

    const handleExplainClick = () => {
      handleShowAI();
      feedbackRef.current?.hideFeedback();
    };

    const renderPreviousButton = () => {
      if (isPreview) return <p></p>;

      return hasPrevious ? (
        <button
          onClick={previous}
          className="px-2 outline-none h-12 border border-gray-300 rounded text-gray-700 items-center justify-center"
        >
            <BsChevronLeft size={17}/>
       </button>
      ) : null ;
    };

    const renderNextButton = () => {
      if (canProceed && !isPreview && !chatVisible) {
        return (
          <div className="w-full sm:w-fit my-2 sm:my-0">
            <button
              onClick={(e) =>
                isPreview ? closePreview && closePreview(e) : next && next(e)
              }
              className={`outline-none sm:bg-transparent flex justify-center rounded h-fit py-2 sm:py-0 w-full sm:w-fit bg-[#7E1593] relative`}
            >
              <img
                src={gotItImg}
                className="w-[140px] hidden sm:block pt-3 sm:pt-0 sm:w-[170px]"
                alt="Got It"
              />
              <span className="font-bold text-[20px] sm:hidden text-white">Continue</span>
            </button>
          </div>
        );
      }

      if (isPreview) {
        return (
          <>
            <button
              onClick={(e) =>
                isPreview ? closePreview && closePreview(e) : next && next(e)
              }
              className="outline-none relative"
            >
              <span className="lilita-one text-white absolute font-[500] text-lg right-[30%] px-4 top-2 bg-[#aa18b8]">
                Back
              </span>
              <img src={gotItImg} className="w-[170px]" alt="Got It" />
            </button>
          </>
        );
      }
    };

    useImperativeHandle(ref, () => ({
      toggleContinue: (value: boolean) => {
        setCanProceed(value);
      },
    }));

    return (
      <div className="relative w-full h-full px-2 sm:px-10 flex items-center sm:flex-row flex-col justify-between">
        <div className="flex items-center gap-2 w-full">
          {currentLesson && renderPreviousButton()}
          <AIButton handleShowAI={handleShowAI} />
        </div>
        {currentLesson && renderNextButton()}
      </div>
    );
  }
);

// #f9f7f3
export default LessonFooter;
