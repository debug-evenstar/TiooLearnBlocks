import React from "react";
import { ManagerInterface } from "apps/Editorial/Base/Manager";
interface MainLayoutProps {
    children: React.ReactElement;
    slides: any;
    changeTo: (index: number) => void;
    active: number;
    showComp: boolean;
    back: () => void;
    lessonlist: any;
    closeEdit: any;
    name: string;
    data: any;
    manager: ManagerInterface;
}
declare const EditorialLayout: React.FC<MainLayoutProps>;
export default EditorialLayout;
