import React, { FC, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import PromptBox from "../../promptBox";

interface Props {
  data: any;
  showComp: boolean;
  activeSlide: number;
  slides: any;
  lessonlist: any;
}
const InactiveSidebar: FC<Props> = ({
  slides,
  data,
  showComp,
  activeSlide,
  lessonlist,
}) => {
  const compTypes = [
    "Text",
    "Image",
    "Video",
    "Multi Choice",
    "Flash Card",
    "Dual Choice",
    "Slider",
    "FlashCards",
    "Sequence",
  ];
  const activeSlid = slides && slides[activeSlide];
  const [comps, setComps] = useState<any[]>();
  const scrRef = useRef<any>(null);
  const getActiveComps = () => {
    const comps = activeSlid.map((item: any) => item.component);
    setComps(comps);
  };
  useEffect(() => {
    getActiveComps();
  }, [activeSlid]);
  const scroll = (scrollOffset: any) => {
    scrRef.current.scrollTop += scrollOffset;
  };
  const formatTerm = (val: any) => {
    if (val === 1) {
      return "First Term";
    } else if (val === 2) {
      return "Second Term";
    } else return "Third Term";
  };

  const handleDragStart = (e: any, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const Item = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isActive, setIsActive] = useState(1);
    return (
      <div className="w-full my-5 p-4">
        <h3 className="text-[12px] text-[#87909E] font-medium">
          {formatTerm(lessonlist.term)}
        </h3>
        <div className="w-full flex items-center justify-between">
          <h3
            className="text-[#030036] text-[13px] font-medium w-[137px] opacity-70 cursor-pointer py-[8px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {lessonlist.topic}
          </h3>
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaAngleUp className="text-[15px] text-[#030036]" />
            ) : (
              <FaAngleDown className="text-[15px] text-[#030036]" />
            )}
          </div>
        </div>
        {isOpen && (
          <div>
            {lessonlist &&
              lessonlist.lessons?.map((data: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => setIsActive(data.id)}
                    className={` ${
                      isActive === data.id
                        ? `w-full p-[9px] text-[#4F46E5] text-[11px] font-medium border-l-[3.3px] border-[#4F46E5] bg-[#E3E2FF] rounded-[4px] overflow-hidden cursor-pointer`
                        : `w-full p-[9px] text-[#87909E] text-[11px] font-normal cursor-pointer`
                    }`}
                  >
                    Lesson {index + 1}: {data.topic}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="w-full h-full border border-gray-400">
      {!showComp && <Item />}
      {showComp && (
        <div className="w-full mb-12">
          <h3 className="shadow-lg text-[15px] my-2 py-2 text-center text-[#87909E] font-medium">
            Components
          </h3>
          <div className="mt-4 text-[14px]">
            <FaAngleUp
              className="text-lg text-gray-500 mb-2 mx-auto cursor-pointer"
              onClick={() => scroll(-30)}
            />
            <div
              className="grid gap-4  p-3 h-[300px] overflow-y-scroll hide-scroll"
              ref={scrRef}
            >
              {compTypes.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      comps &&
                      {
                        /* comps.includes(item) */
                      }
                        ? "compactive"
                        : "compinactive"
                    } cursor-pointer mx-1 hover:scale-y-105 duration-100`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <FaAngleDown
              className="text-xl text-gray-500 mx-auto mt-2 cursor-pointer"
              onClick={() => scroll(30)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InactiveSidebar;
