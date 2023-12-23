import React, { FC } from "react";
import ActiveSidebar from "./ActiveSidebar";
import InactiveSidebar from "./InactiveSidebar";
import { useSelector } from "react-redux";
import { handleToggleSidebarState } from "provider/rightSidebarSlice";

interface Props {
  data: any;
  showComp: boolean;
  activeSlide: number;
  slides: any;
  lessonlist: any;
}

const RightSidebar: FC<Props> = ({
  slides,
  data,
  showComp,
  activeSlide,
  lessonlist,
}) => {
  const selector: any = useSelector(handleToggleSidebarState);
  const isActive = selector.payload.rightSidebarState.value;

  return (
    <div className="border-l bg-white border-[#030036] border-opacity-10 shadow relative w-full h-screen max-w-[20%] overflow-auto pt-5 px-[29px] ">
      {isActive ? (
        <ActiveSidebar />
      ) : (
        <InactiveSidebar
          slides={slides}
          data={data}
          showComp={showComp}
          activeSlide={activeSlide}
          lessonlist={lessonlist}
        />
      )}
    </div>
  );
};

export default RightSidebar;
