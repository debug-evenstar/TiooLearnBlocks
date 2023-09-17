import React from "react";
import Header from "../components/Header";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";

interface MainLayoutProps {
  children: React.ReactElement;
  slides: any
  changeTo: (index:number) => void
  active: number
  showComp: boolean
}
const MainLayout: React.FC<MainLayoutProps> = ({ children, slides, changeTo, active, showComp }) => {
  return (
    <div className="h-screen w-full top-0 overflow-hidden relative">
      <Header activeSlide={active}/>
      <div className="w-full h-full flex">
        <LeftSidebar slides={slides} changeTo={changeTo}/>
        <div className="w-full overflow-y-auto">{children}</div>
        <RightSidebar slides={slides} data={''} showComp={showComp} activeSlide={active}/>
      </div>
    </div>
  );
};

export default MainLayout;
