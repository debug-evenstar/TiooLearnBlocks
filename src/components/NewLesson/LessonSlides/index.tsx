import { CreateManager } from "apps/Editorial/Base/Manager";
import SlideManager from "components/SlideManager";
import { createRef, useEffect, useRef, useState } from "react";
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
  setFeedbackCanProceed,
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

  const [calculatedArea, setCalculatedArea] = useState<{width : number, height : number}>({width : 0 , height : 0})
  const contRef : React.RefObject<any> = createRef();

  const getResponsiveWidth = () => {
    const availableWidth = contRef?.current.clientWidth;
    const screenWidth = document.documentElement.clientWidth;
    const mobileWidth = availableWidth;
    const desktopWidth = contRef?.current.clientHeight * (
      screenWidth < 1250 ? 1.1 :  1.4
    );
    return screenWidth < 1024 ? mobileWidth : desktopWidth;
  }

  useEffect(()=>{
    setCalculatedArea({
      width : contRef?.current ? getResponsiveWidth() : 0,
      height : contRef?.current?.clientHeight ?? 0
    })
    contRef?.current && contRef.current.addEventListener("selectstart", (e:any) => {
      e.preventDefault();
      return false;
    });
  }, [contRef?.current])


  return (
    <div className="w-full relative flex items-center gap-3" onContextMenu={(e) => e.preventDefault()}>
      <div ref={contRef} className="w-[85%] md:w-[90%] h-full relative mx-auto min-h-[calc(100vh_-_170px)] text-black">
        <div className="absolute z-10 top-5 right-5"></div>
        {/* <RenderComponent slides={parsedSlides} back={() => false}/> */}
        <div
          style={{
            width : calculatedArea.width,
          }}
          className="h-full relative mx-auto"
        >
          <SlideManager
            lessonSlides={slides.map((slide : any) => slide.slide_data)}
            ref={slideManagerRef}
            canProceed={setCanProceed}
            canFeedbackProceed={(val: boolean) => setFeedbackCanProceed(val)}
            handleFeedback={() => false}
            updateActiveSlide={(i: number) => setActiveSlide(i)}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonSlides;
