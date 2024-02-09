import { FC } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { ObjectiveItemProp } from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions/interfaces";
interface Props {
    manager: EditorialManagerInterface;
    index: number;
    data: any;
}
declare const FlashcardObjective: FC<Props>;
export default FlashcardObjective;
export declare const ObjectiveItem: FC<ObjectiveItemProp>;
