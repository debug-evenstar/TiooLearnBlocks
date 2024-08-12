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

  return (
    <div
      className={`border-l bg-white border-[#030036] border-opacity-10 shadow h-full w-full max-w-[20%] relative no-scrollbar mb-10`}
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
