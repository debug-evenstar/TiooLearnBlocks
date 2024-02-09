import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { FC } from "react";
interface Props {
    manager: EditorialManagerInterface;
    type: "OBJECTIVE" | "SUBJECTIVE";
    index: number;
}
declare const FlashcardFeedback: FC<Props>;
export default FlashcardFeedback;
