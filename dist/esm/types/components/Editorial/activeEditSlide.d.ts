import { FC } from "react";
import { EditorialManagerInterface } from "./Base/EditorialManager";
interface Props {
    active: number;
    slides: any;
    data: any;
    isBusy: boolean;
    manager: EditorialManagerInterface;
}
declare const ActiveEditSlide: FC<Props>;
export default ActiveEditSlide;
