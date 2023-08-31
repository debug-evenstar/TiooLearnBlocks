import React, { useRef, useState } from "react";
import MultipleOptions from "../../components/library/MultipleOptions";
import TextImage from "../../components/library/TextImage";
import MainLayout from "../../layouts/MainLayout";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { SlideManager } from "components";
import { dummyData } from "utilities/data";

function Editorial() {
  const parseSlides = dummyData.LessonSlides.map(
    (slide: any) => slide.slide_data
  );
  const slideManagerRef = useRef<any>(null);
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const handleContinue = () => {
    const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
    if (currentSlideIndex === parseSlides.length - 1) {
      // back();
    } else {
      slideManagerRef?.current?.navigator(1);
      setCanProceed(false);
    }
  };

  const handlePrevious = () => {
    slideManagerRef?.current?.navigator(-1);
    setCanProceed(false);
  };

  const changeSlide = (index: number) => {
    slideManagerRef?.current?.navigator(1, index);
  };
  return (
    <MainLayout slides={parseSlides} changeTo={changeSlide}>
      <div className="w-full bg-white px-[30px] py-[28px]">
        <div className="w-full mt-6 overflow-y-auto flex items-center gap-3">
          <div className="w-[54px] h-[54px] rounded-full border-[1.5px] shadow-lg cursor-pointer border-[#87909E] flex items-center justify-center">
            <FaAngleLeft
              className="text-[#87909E] text-[20px]"
              onClick={() => handlePrevious()}
            />
          </div>
          <div className=" w-10/12 mx-auto border-[0.92px] min-h-[440px] text-black rounded-[9px] shadow-md">
            {/* <MultipleOptions /> */}
            {/* <TextImage /> */}
            <SlideManager
              lessonSlides={parseSlides}
              ref={slideManagerRef}
              canProceed={(val: boolean) => setCanProceed(val)}
              handleFeedback={() => false}
              updateActiveSlide={(i: number) => setActiveSlide(i)}
            />
          </div>
          <div className="w-[54px] h-[54px] rounded-full border-[1.5px] shadow-lg cursor-pointer border-[#87909E] flex items-center justify-center">
            <FaAngleRight
              className="text-[#87909E] text-[20px]"
              onClick={() => handleContinue()}
            />
          </div>
        </div>
        <div className="w-full mb-[40px] mt-[44px] bottom-0 z-50 relative px-[30px]">
          <div className="w-full h-[50px] flex items-center justify-between">
            <div className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-3 cursor-pointer text-semibold">
              Save
            </div>
            <div className="w-[140px] rounded-[8px] border bg-[#4F46E5] text-white flex items-center justify-center py-3 cursor-pointer text-semibold">
              Preview
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Editorial;
