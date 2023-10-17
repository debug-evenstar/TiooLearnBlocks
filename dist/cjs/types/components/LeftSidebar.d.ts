import { FC } from "react";
interface Props {
    slides: any;
    changeTo: (index: number) => void;
    data: any;
    showOverlay: () => void;
}
declare const LeftSidebar: FC<Props>;
export default LeftSidebar;
