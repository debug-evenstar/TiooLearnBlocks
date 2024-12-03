import { FC } from "react";
import { ManagerInterface } from "../Base/Manager";
interface Props {
    slides: any;
    changeTo: (index: number) => void;
    data: any;
    manager: ManagerInterface;
}
declare const LeftSidebar: FC<Props>;
export default LeftSidebar;
