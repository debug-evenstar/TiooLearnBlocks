import { FC } from "react";
import { ManagerInterface } from "components/Editorial/Base/Manager";
import { ObjectiveItemProp } from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions/interfaces";
interface Props {
    manager: ManagerInterface;
    index: number;
    data: any;
}
declare const FlashcardObjective: FC<Props>;
export default FlashcardObjective;
export declare const ObjectiveItem: FC<ObjectiveItemProp>;
