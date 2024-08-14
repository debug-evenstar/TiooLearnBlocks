import React, { FC, useEffect } from "react";
import ActiveSidebar from "./ActiveSidebar";
import InactiveSidebar from "./InactiveSidebar";
import { useSelector } from "react-redux";
import { handleToggleSidebarState } from "provider/rightSidebarSlice";
import { ManagerInterface } from "components/Editorial/Base/Manager";

interface Props {
  data: any;
  showComp: boolean;
  activeSlide: number;
  slides: any;
  lessonlist: any;
  manager: ManagerInterface;
}

const RightSidebar: FC<Props> = ({
  slides,
  data,
  showComp,
  activeSlide,
  lessonlist,
  manager,
}) => {
  const isActive = manager.states.rightSidebarState;
  const { status: optionStatus } = manager.states.feedback;

  return (
    <div
      className={` bg-white ${showComp ? "border-[#030036] shadow border-l":""} border-opacity-10 h-full w-full max-w-[20%] relative no-scrollbar mb-10 
        ${ optionStatus ? "" : ""}
      `}
    >
      {isActive ? (
        <ActiveSidebar manager={manager} />
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
