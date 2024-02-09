import { FC } from "react";
import { ObjectiveItemProp } from "./interfaces";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
interface Props {
    manager: EditorialManagerInterface;
    component: string;
}
declare const Objective: FC<Props>;
export default Objective;
export declare const ObjectiveItem: FC<ObjectiveItemProp>;
