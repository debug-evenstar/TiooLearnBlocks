import { FC } from "react";
import { ManagerInterface } from "./Base/Manager";
interface Props {
    active: number;
    slides: any;
    data: any;
    isBusy: boolean;
    manager: ManagerInterface;
    previewSlide: Function;
}
declare const ActiveEditSlide: FC<Props>;
export default ActiveEditSlide;
