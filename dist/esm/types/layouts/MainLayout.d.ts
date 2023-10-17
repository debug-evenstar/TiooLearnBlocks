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
    data: any;
    showOverlay: () => void;
}
declare const MainLayout: React.FC<MainLayoutProps>;
export default MainLayout;
