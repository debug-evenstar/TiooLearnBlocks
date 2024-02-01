import React, { FC, useEffect } from "react";
import ActiveSidebar from "./ActiveSidebar";
import InactiveSidebar from "./InactiveSidebar";
import { useSelector } from "react-redux";
import { handleToggleSidebarState } from "provider/rightSidebarSlice";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";

interface Props {
  data: any;
  showComp: boolean;
  activeSlide: number;
  slides: any;
  lessonlist: any;
  manager: EditorialManagerInterface;
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
      className={`z-[500] border-l bg-white border-[#030036] border-opacity-10 shadow h-screen w-full max-w-[20%] relative no-scrollbar mb-10 ${
        optionStatus ? "" : "overflow-y-auto"
      }`}
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
