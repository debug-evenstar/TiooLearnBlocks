import React, { FC } from "react";
import SlideManager from "components/SlideManager";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface Props {
  handlePrevious: () => void;
  showEdit: () => void;
  parsedSlides: any;
  slideManagerRef: any;
  setActiveSlide: (val: number) => void;
  handleContinue: () => void;
  setCanProceed: (val: boolean) => void;
}
const EditorialSlideView: FC<Props> = ({
  handlePrevious,
  showEdit,
  parsedSlides,
  slideManagerRef,
  setActiveSlide,
  handleContinue,
  setCanProceed,
}) => {
  return (
    <div className="w-full relative overflow-y-auto flex items-center gap-3">
      <div
        className="w-[54px] h-[54px] rounded-full border-[1.5px] shadow-lg cursor-pointer border-[#87909E] flex items-center justify-center"
        onClick={handlePrevious}
      >
        <FaAngleLeft className="text-[#87909E] text-[20px]" />
      </div>
      <div className=" w-10/12 relative mx-auto border-[0.92px] min-h-[440px] text-black rounded-[9px] shadow-md">
        <div className="absolute top-5 right-5">
          <FiEdit
            className="text-[#87909E] text-xl cursor-pointer"
            onClick={showEdit}
          />
        </div>
        <SlideManager
          lessonSlides={parsedSlides}
          ref={slideManagerRef}
          canProceed={(val: boolean) => setCanProceed(val)}
          handleFeedback={() => false}
          updateActiveSlide={(i: number) => setActiveSlide(i)}
        />
      </div>
      <div
        className="w-[54px] h-[54px] rounded-full border-[1.5px] shadow-lg cursor-pointer border-[#87909E] flex items-center justify-center"
        onClick={handleContinue}
      >
        <FaAngleRight className="text-[#87909E] text-[20px]" />
      </div>
    </div>
  );
};

export default EditorialSlideView;
