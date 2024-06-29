import { FC } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
interface Props {
    manager: EditorialManagerInterface;
    index: number;
    data: any;
}
declare const FlashcardSubjective: FC<Props>;
export default FlashcardSubjective;
