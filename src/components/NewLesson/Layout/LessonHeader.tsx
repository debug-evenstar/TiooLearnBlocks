import { FaBars } from "react-icons/fa";
import clockImg from "../../../img/clock.svg";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { IndexKind } from "typescript";
import { BsChevronLeft } from "react-icons/bs";

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

  const canViewSlide = (index: number) => {
    if (index) if (currentSlideIndex == 0 && index == 0) return true;
    return index <= currentSlideIndex + 1;
  };

  return (
    <div
      className={`absolute top-[100%] mt-3 lg:min-h-auto border w-full sm:w-64 rounded-lg sm:-left-6 z-[1300] duration-300
      ${isOpen ? "opacity-100" : "scale-95 pointer-events-none opacity-0"}`}
    >
      <div className="bg-white rounded-lg h-[10rem] lg:h-auto shadow-lg w-full p-3 relative">
        <button
          onClick={onClose}
          className="absolute text-2xl top-3 right-3 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <span>&times;</span>
        </button>
        <h2 className="font-bold mb-8 text-gray-600"></h2>
        <div className="grid grid-cols-5 sm:grid-cols-4 gap-4 max-h-[15rem] sm:max-h-[10rem] overflow-auto p-2">
          {Array(slideCount)
            .fill(null)
            .map((_, index) => {
              const passed = canViewSlide(index);

              return (
                <button
                  key={index}
                  onClick={() => handleClick(index, passed)}
                  className={`${
                    passed
                      ? activeIndex == index
                        ? "bg-[#be43d7] text-white"
                        : "bg-[#7E1593] text-white"
                      : "bg-neutral-100 text-gray-700 py-1 sm:py-0"
                  } rounded-full h-8 lg:h-5 font-bold lg:font-normal transition-colors text-sm shadow-lg duration-200 ease-in-out transform hover:scale-105`}
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
      toggleSidebar,
      back,
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

    const slide_count: number = currentLesson?.lesson_slides?.length || 0;
    const duration = currentLesson?.duration
      ?.toLowerCase()
      .replace("minute", "min");

    const handleIndicatorClick = () => {
      // if (slide_count < 5) return;
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
        <div className="flex items-center gap-x-5 relative w-full sm:w-fit">
          <div className="relative">
            <p className="text-gray-500 text-sm">Your progress</p>
            <p className="text-[#7E1593] font-[700]">
              {slide_count} Slide{slide_count != 1 && "s"} in this lesson
            </p>
            <div className="flex items-center w-52 bg-gray-50 rounded-full">
              {Array(slide_count <= 5 ? slide_count : 5)
                .fill(null)
                .map((_, index) => {
                  // const active = position >= index;
                  // const passed = lessonProgress?.slide_index >= index
                  // const isCurrentColumn = position === index;
                  // return (
                  //   <div
                  //     onClick={handleIndicatorClick}
                  //     key={index}
                  //     className={`w-full h-[10px] cursor-pointer px-1 relative ${
                  //       index == 0 ? "rounded-l-full" : ""
                  //     } ${active || passed ? "bg-[#7E1593]" : ""} ${
                  //       active                                                                                 && "rounded-r-full"
                  //     } flex items-center justify-end`}
                  //   >
                  const active = position >= index;
                  const isCurrentColumn = position === index;
                  return (
                    <div
                      onClick={handleIndicatorClick}
                      key={index}
                      className={`w-full h-[10px]  cursor-pointer px-1 relative ${
                        index == 0 ? "rounded-l-full" : ""
                      } ${active ? "bg-[#7E1593]" : ""} ${
                        isCurrentColumn && "rounded-r-full"
                      } flex items-center justify-end`}
                    >
                      <div className="relative">
                        <div
                          className={`h-[5px] w-[5px] rotate-45 ${
                            isCurrentColumn
                              ? "bg-white "
                              : "bg-gray-300 rounded-full"
                          } relative`}
                        ></div>
                        {isCurrentColumn &&
                          isMenuOpen &&
                          lessonProgress &&
                          !isChatOpen && (
                            <div className="absolute hidden sm:block -bottom-full z-[1307] -left-[18px] top-[11px] popover">
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
              activeIndex={activeSlide}
              slideCount={slide_count}
              onItemClick={handleSetSlide}
              onClose={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      );
    };

    return (
      <div className="relative w-full">
        <div className="w-full sm:border-b h-[90px] px-5 sm:px-10 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            <button
              onClick={back}
              className="px-2 mr-3 sm:mr-0 outline-none active:scale-[0.98] h-12 border border-gray-300 rounded text-gray-700 items-center justify-center"
            >
              <BsChevronLeft size={17} />
            </button>
            <p className="font-[500] text-[18px] hidden sm:block">
              {currentLesson?.topic ?? ""}
            </p>
          </div>
          {currentLesson && <LessonProgress />}
        </div>
      </div>
    );
  }
);

export default LessonHeader;
