import React from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
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
    manager: EditorialManagerInterface;
}
declare const EditorialLayout: React.FC<MainLayoutProps>;
export default EditorialLayout;
