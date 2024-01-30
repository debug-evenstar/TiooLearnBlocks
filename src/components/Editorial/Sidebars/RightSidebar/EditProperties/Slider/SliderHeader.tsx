import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { handleSetActiveCompName } from "provider/sliderSlice";
import React, { useRef, useEffect, useState, FC } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

interface Props {
  manager: EditorialManagerInterface;
}

const SliderHeader: FC<Props> = ({ manager }) => {
  const selector: any = useSelector(handleSetActiveCompName);
  const activeCompName = selector.payload.slider.value.activeCompName;
  const scrollableRef = useRef<HTMLElement | null>(null);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);
  const [isScrolledToBeginning, setIsScrolledToBeginning] = useState(false);

  useEffect(() => {
    const header = scrollableRef.current;
    if (!header) return;

    const handleScroll = () => {
      const { scrollWidth, scrollLeft } = header;
      setIsScrolledToEnd(scrollLeft + header.clientWidth >= scrollWidth);
      setIsScrolledToBeginning(scrollLeft === 0);
    };

    header.addEventListener("scroll", handleScroll);

    return () => {
      header.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef]);

  const scroller = (direction: string) => {
    const header = scrollableRef.current;
    if (!header) return;
    if (direction === "backward" && isScrolledToBeginning) return;
    if (direction === "forward" && isScrolledToEnd) return;

    header.scrollBy({
      left: direction === "forward" ? 20 : -20,
      behavior: "smooth",
    });
  };

  const checkCompName = (name: string) => {
    console.log(activeCompName, name, "compname compare");
    return activeCompName === name;
  };

  useEffect(() => {
    console.log(manager.canvasManager.activeComponent.data);
  }, []);

  return (
    <header className="w-full relative flex items-center p-2 border-b border-b-gray-400">
      <FaAngleLeft
        className={`w-[10%] cursor-pointer text-[12px] ${
          isScrolledToBeginning && "opacity-0"
        }`}
        onClick={() => scroller("backward")}
      />
      <main
        ref={scrollableRef}
        className="w-[80%] flex items-center gap-5 overflow-x-auto no-scrollbar"
      >
        <div
          className={`text-[12px] ${
            checkCompName("Text") ? "text-[#4f46e5]" : "text-gray-500"
          } font-medium whitespace-nowrap`}
        >
          Text
        </div>
        <div
          className={`text-[12px] ${
            checkCompName("Image") ? "text-[#4f46e5]" : "text-gray-500"
          } font-medium whitespace-nowrap`}
        >
          Image
        </div>
        <div
          className={`text-[12px] ${
            checkCompName("Video") ? "text-[#4f46e5]" : "text-gray-500"
          } font-medium whitespace-nowrap`}
        >
          Video
        </div>
        <div
          className={`text-[12px] ${
            checkCompName("Flashcard") ? "text-[#4f46e5]" : "text-gray-500"
          } font-medium whitespace-nowrap`}
        >
          Flash Card
        </div>
        <div
          className={`text-[12px] ${
            checkCompName("Flashcard") ? "text-[#4f46e5]" : "text-gray-500"
          } font-medium whitespace-nowrap`}
        >
          Flash Card
        </div>
        <div
          className={`text-[12px] ${
            checkCompName("Flashcard") ? "text-[#4f46e5]" : "text-gray-500"
          } font-medium whitespace-nowrap`}
        >
          Flash Card
        </div>
        <div
          className={`text-[12px] ${
            checkCompName("Flashcard") ? "text-[#4f46e5]" : "text-gray-500"
          } font-medium whitespace-nowrap`}
        >
          Flash Card
        </div>
      </main>
      <FaAngleRight
        className={`w-[10%] cursor-pointer text-[12px] ${
          isScrolledToEnd && "opacity-0"
        }`}
        onClick={() => scroller("forward")}
      />
    </header>
  );
};

export default SliderHeader;
