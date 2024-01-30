import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { FC } from "react";
interface Props {
    manager: EditorialManagerInterface;
    type: "OBJECTIVE" | "SUBJECTIVE";
    index: number;
}
declare const OverlayFeedback: FC<Props>;
export default OverlayFeedback;
