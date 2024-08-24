import { FC } from "react";
import { ManagerInterface } from "apps/Editorial/Base/Manager";
interface Props {
    data: any;
    showComp: boolean;
    activeSlide: number;
    slides: any;
    lessonlist: any;
    manager: ManagerInterface;
}
declare const RightSidebar: FC<Props>;
export default RightSidebar;
