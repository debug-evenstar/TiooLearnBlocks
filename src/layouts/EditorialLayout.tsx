import React, { useEffect } from "react";
import Header from "../components/Header";
import RightSidebar from "../components/Editorial/Sidebars/RightSidebar/RightSidebar";
import LeftSidebar from "../components/Editorial/LeftSidebar";
import { ManagerInterface } from "components/Editorial/Base/Manager";

interface MainLayoutProps {
  children: React.ReactElement;
  slides: any;
  changeTo: (index: number) => void;
  active: number;
  showComp: boolean;
  back: () => void;
  lessonlist: any;
  name: string;
  data: any;
  manager: ManagerInterface;
}
const EditorialLayout: React.FC<MainLayoutProps> = ({
  children,
  slides,
  changeTo,
  active,
  showComp,
  back,
  lessonlist,
  name,
  data,
  manager,
}) => {
  return (
    <div className="h-screen w-full relative top-0 overflow-hidden">
      <Header activeSlide={active} back={back} name={name} />
      <div className="w-full h-[calc(100%_-_80px)] flex">
        <LeftSidebar
          slides={slides}
          changeTo={changeTo}
          data={data}
          manager={manager}
        />
        <div className="relative w-full h-full overflow-y-hidden overflow-x-hidden no-scrollbar">
          {children}
        </div>
        <RightSidebar
          lessonlist={lessonlist}
          slides={slides}
          data={""}
          showComp={showComp}
          activeSlide={active}
          manager={manager}
        />
      </div>
    </div>
  );
};

export default EditorialLayout;
