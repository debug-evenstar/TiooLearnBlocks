import { CreateManager } from "components/Editorial/Base/Manager";
import SlideManager from "components/SlideManager";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

const OptionButton = ({ children, value }: any) => {
  return (
    <button
      className="w-[12rem] rounded-lg border py-2.5 font-[700] border-b-[4px] border-gray-200 mx-auto"
      onClick={() => value}
    >
      {children}
    </button>
  );
};

const OptionButtonSelection = () => {
  const options = [
    { name: "Mouth", value: 1 },
    { name: "Ear", value: 2 },
    { name: "Hat", value: 3 },
    { name: "Glass", value: 4 },
  ];
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-y-10 grid-rows-2">
        {options.map(({ name, value }: { name: string; value: number }) => (
          <OptionButton value={value}>{name}</OptionButton>
        ))}
      </div>
    </div>
  );
};

const LessonSlides = ({
  handlePrevious,
  handleContinue,
  slideManagerRef,
  setCanProceed,
  setActiveSlide,
  slides,
}: any) => {
  const [manager, setManager] = useState(CreateManager(slides));

  const changeSlide = (index: number) => {
    setTimeout(() => {
      slideManagerRef?.current?.navigator(1, index);
    }, 400);
  };

  return (
    <div className="w-full relative  flex items-center gap-3">
      <div className=" w-10/12 relative mx-auto min-h-[calc(100vh_-_170px)] text-black">
        <div className="absolute z-10 top-5 right-5"></div>
        {/* <RenderComponent slides={parsedSlides} back={() => false}/> */}
        <SlideManager
          lessonSlides={slides}
          ref={slideManagerRef}
          canProceed={(val: boolean) => setCanProceed(val)}
          handleFeedback={() => false}
          updateActiveSlide={(i: number) => setActiveSlide(i)}
        />
      </div>
    </div>
  );
};

export default LessonSlides;
