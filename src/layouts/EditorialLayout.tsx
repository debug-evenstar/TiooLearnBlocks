import React from "react";
import Header from "../components/Header";
import RightSidebar from "../components/Editorial/ViewBox/RightSidebar/RightSidebar";
import LeftSidebar from "../components/Editorial/LeftSidebar";
import { SidebarFunctions } from "components/Editorial/interfaces";

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
  sidebarFunctions: SidebarFunctions;
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
  sidebarFunctions,
}) => {
  return (
    <div className="h-screen w-full top-0 overflow-hidden relative">
      <Header activeSlide={active} back={back} name={name} />
      <div className="w-full h-full flex">
        <LeftSidebar
          slides={slides}
          changeTo={changeTo}
          data={data}
          sidebarFunctions={sidebarFunctions}
        />
        <div className="w-full overflow-y-auto">{children}</div>
        <RightSidebar
          lessonlist={lessonlist}
          slides={slides}
          data={""}
          showComp={showComp}
          activeSlide={active}
        />
      </div>
    </div>
  );
};

export default EditorialLayout;
