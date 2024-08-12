import { FC } from "react";
import { ObjectiveItemProp } from "./interfaces";
import { ManagerInterface } from "components/Editorial/Base/Manager";
interface Props {
    manager: ManagerInterface;
    component: string;
}
declare const Objective: FC<Props>;
export default Objective;
export declare const ObjectiveItem: FC<ObjectiveItemProp>;
