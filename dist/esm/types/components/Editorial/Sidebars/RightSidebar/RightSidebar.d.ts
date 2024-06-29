import { FC } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
interface Props {
    data: any;
    showComp: boolean;
    activeSlide: number;
    slides: any;
    lessonlist: any;
    manager: EditorialManagerInterface;
}
declare const RightSidebar: FC<Props>;
export default RightSidebar;
