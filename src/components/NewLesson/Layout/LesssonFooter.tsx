// import leftArrow from "../../../img/left-arrow.svg";
// import gotItImg from "../../../img/got-it.png";
// import TransitionButton from "../../../components/NewLesson/Buttons/TransitionButton";

// export default function LessonFooter({ previous, currentLesson, hasPrevious, isPreview, closePreview, next, chatVisible, feedbackRef, handleShowAI }: any) {

//   const handleExplainClick = () => {
//     handleShowAI();
//     feedbackRef.current.hideFeedback();
//   }

//   const renderPreviousBtn = isPreview ?
//     <p></p>
//     :
//     (hasPrevious ?
//       <button onClick={previous} className="text-[#7E1593] outline-none text-[20px] font-[500] flex items-center space-x-3">
//         <img src={leftArrow} className="w-[18px]" alt="" />
//         <span>Previous</span>
//       </button>
//       : <p></p>)

//   const renderNextBtn = !chatVisible && isPreview ?
//     <button onClick={(e) => isPreview ? closePreview(e) : next(e)} className="outline-none relative">
//       {isPreview &&
//         <span className="lilita-one text-white absolute font-[500] text-lg right-[30%] px-4 top-2 bg-[#aa18b8]">Back</span>
//       }
//       <img src={gotItImg} className="w-[170px]" alt="" />
//     </button>
//     :
//     <TransitionButton
//       strings={["AI TUTOR", "Explain this screen"]}
//       handleShowAI={handleExplainClick} />

//   return (
//     <div className="w-full border-t px-10 flex h-[80px] items-center justify-between">
//       {currentLesson && renderPreviousBtn}
//       {currentLesson && renderNextBtn}
//     </div>
//   );
// }
// // {!chatVisible && !isPreview ? <button onClick={(e) => isPreview ? closePreview(e) : next(e)} className="outline-none relative">
// // {isPreview &&
// //   <span className="lilita-one text-white absolute font-[500] text-lg right-[30%] px-4 top-2 bg-[#aa18b8]">Back</span>
// // }
// // <img src={gotItImg} className="w-[170px]" alt="" />
// // </button>

import leftArrow from "../../../img/left-arrow.svg";
import gotItImg from "../../../img/got-it.png";
import TransitionButton from "../../../components/NewLesson/Buttons/TransitionButton";
import { forwardRef, useImperativeHandle, useState } from "react";

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
                    className="text-[#7E1593] outline-none text-[20px] font-[500] flex items-center space-x-3"
                >
                    <img src={leftArrow} className="w-[18px]" alt="Previous" />
                    <span>Previous</span>
                </button>
            ) : (
                <p></p>
            );
        };

        const renderNextButton = () => {
            if (canProceed && !isPreview && !chatVisible) {
                return (
                    <div>
                        <button
                            onClick={(e) =>
                                isPreview
                                    ? closePreview && closePreview(e)
                                    : next && next(e)
                            }
                            className="outline-none relative"
                        >
                            <img
                                src={gotItImg}
                                className="w-[170px]"
                                alt="Got It"
                            />
                        </button>
                    </div>
                );
            }

            if (isPreview) {
                return (
                    <>
                        <button
                            onClick={(e) =>
                                isPreview
                                    ? closePreview && closePreview(e)
                                    : next && next(e)
                            }
                            className="outline-none relative"
                        >
                            <span className="lilita-one text-white absolute font-[500] text-lg right-[30%] px-4 top-2 bg-[#aa18b8]">
                                Back
                            </span>
                            <img
                                src={gotItImg}
                                className="w-[170px]"
                                alt="Got It"
                            />
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
            <div className="w-full border-t px-10 flex h-[80px] items-center justify-between">
                {currentLesson && renderPreviousButton()}
                {currentLesson && renderNextButton()}
            </div>
        );
    }
);

export default LessonFooter;
