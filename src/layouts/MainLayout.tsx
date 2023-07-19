import React from "react";
import Header from "../components/Header";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar";

interface MainLayoutProps {
  children: React.ReactElement;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-full top-0 overflow-hidden relative">
      <Header />
      <div className="w-full h-full flex">
        <LeftSidebar />
        <div className="w-full">{children}</div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
