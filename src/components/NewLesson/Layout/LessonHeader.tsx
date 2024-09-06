import { FaBars } from "react-icons/fa";
import clockImg from "../../../img/clock.svg";
import React, { forwardRef, useImperativeHandle, useState } from "react";

interface SlideListProps {
  activeIndex: number;
  slideCount: number;
  onItemClick: (number: number) => void;
  currentSlideIndex: number;
  onClose: () => void;
  isOpen: boolean;
}

const ProgressTip = ({ active = true }: any) => {
  return active && <div className="triangle"></div>;
};

const SlideList: React.FC<SlideListProps> = ({
  activeIndex,
  currentSlideIndex,
  onItemClick,
  slideCount,
  onClose,
  isOpen,
}) => {
  const handleClick = (index: number, passed: boolean) => {
    if (passed) onItemClick(index + 1);
  };

  return (
    <div
      className={`absolute top-[100%] mt-3 border w-full sm:w-60 rounded-lg -left-6 z-[1300] duration-300
      ${isOpen ? "opacity-100" : "scale-95 pointer-events-none opacity-0"}`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-3 relative">
        <button
          onClick={onClose}
          className="absolute text-2xl top-2 right-2 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <span>&times;</span>
        </button>
        <h2 className="font-bold mb-8 text-gray-600"></h2>
        <div className="grid grid-cols-5 sm:grid-cols-4 gap-4 max-h-[10rem] overflow-auto p-2">
          {Array(slideCount)
            .fill(null)
            .map((_, index) => {
              const passed = index <= currentSlideIndex+1;
              return (
                <button
                  key={index}
                  onClick={() => handleClick(index, passed)}
                  className={`${
                    passed
                      ? "bg-[#7E1593] text-white"
                      : "bg-neutral-100 text-gray-700"
                  } rounded-full h-5 transition-colors text-sm shadow-lg duration-200 ease-in-out transform hover:scale-105`}
                >
                  {index + 1}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const LessonHeader = forwardRef(
  (
    {
      currentLesson,
      activeSlide,
      setActiveSlide,
      sideBarOpen,
      manager,
      isChatOpen,
    }: any,
    ref
  ) => {
    const [lessonProgress, setLessonProgress] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      updateLessonProgress: (data: any) => setLessonProgress(data),
    }));

    const slide_count = currentLesson?.lesson_slides?.length || 0;
    const duration = currentLesson?.duration
      ?.toLowerCase()
      .replace("minute", "min");

    const handleIndicatorClick = () => {
      if (slide_count < 5) return;
      setIsMenuOpen(true);
    };

    //console.log("lesson progress", lessonProgress);

    const LessonProgress = () => {
      const indicators = 5;
      const position =
        slide_count < 5
          ? activeSlide
          : Math.floor((activeSlide / slide_count) * indicators);

      const handleSetSlide = (index: number) => {
        // console.log("going to slide number ", index);
        manager?.current.navigator(0, index - 1);
      };
      // console.log(currentSlideIndex);
      return (
        <div className="flex items-center space-x-5 relative">
          <div>
            <p className="text-gray-500 text-sm">Your progress</p>
            <p className="text-[#7E1593] font-[700]">
              {slide_count} Slide{slide_count !== 1 && "s"} in this lesson
            </p>
            <div className="flex items-center w-fit bg-gray-50 rounded-full">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  const active = position >= index;
                  const isCurrentColumn = position === index;
                  return (
                    <div
                      onClick={handleIndicatorClick}
                      key={index}
                      className={`w-10 h-[10px] cursor-pointer px-1 relative ${index==0? 'rounded-l-full':''} ${
                        active ? "bg-[#7E1593]" : ""
                      } ${
                        isCurrentColumn && "rounded-r-full"
                      } flex items-center justify-end`}
                    >
                      <div className="h-[5px] w-[5px] rounded-full bg-gray-300 relative">
                        {isCurrentColumn && isMenuOpen && lessonProgress && !isChatOpen && (
                          <div
                            className="absolute -bottom-full z-[1307] -left-[18px] top-[11px] popover"
                          >
                            <ProgressTip />
                          </div>
                        )}
                      </div>
                      {/* { isCurrentColumn && <div className="absolute right-0 w-8 h-8 rotate-90 border bg-white -bottom-[100%]"></div> } */}
                    </div>
                  );
                })}
            </div>
          </div>
          <p className="text-gray-500 hidden sm:flex items-center space-x-1 ">
            <img src={clockImg} className="w-3" alt="" />
            <span className="text-sm">{duration}</span>
          </p>
          {lessonProgress && !isChatOpen && (
            <SlideList
              isOpen={isMenuOpen}
              currentSlideIndex={lessonProgress?.slide_index}
              activeIndex={lessonProgress?.slide_index}
              slideCount={slide_count}
              onItemClick={handleSetSlide}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      );
    };

    return (
      <div className="relative">
        <div className="px-5 py-3 flex sm:hidden border-b items-center space-x-3">
          <button>
            <FaBars />
          </button>
          <p>show chapters</p>
        </div>
        <div className="w-full sm:border-b h-[90px] px-10 flex justify-between items-center">
          <p className="font-[500] text-[18px] hidden sm:block">
            {currentLesson?.topic ?? ""}
          </p>
          {currentLesson && <LessonProgress />}
        </div>
      </div>
    );
  }
);

export default LessonHeader;
