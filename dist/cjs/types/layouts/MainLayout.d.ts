import React from "react";
interface MainLayoutProps {
    children: React.ReactElement;
    slides: any;
    changeTo: (index: number) => void;
    active: number;
    showComp: boolean;
    back: () => void;
    lessonlist: any;
    name: string;
}
declare const MainLayout: React.FC<MainLayoutProps>;
export default MainLayout;
