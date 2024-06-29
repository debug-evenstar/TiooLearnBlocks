import { FC } from "react";
import { EditorialManagerInterface } from "./Base/EditorialManager";
interface Props {
    slides: any;
    changeTo: (index: number) => void;
    data: any;
    manager: EditorialManagerInterface;
}
declare const LeftSidebar: FC<Props>;
export default LeftSidebar;
