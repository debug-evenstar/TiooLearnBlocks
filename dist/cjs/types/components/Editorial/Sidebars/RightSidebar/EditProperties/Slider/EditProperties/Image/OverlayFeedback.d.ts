import { ManagerInterface } from "components/Editorial/Base/Manager";
import { FC } from "react";
interface Props {
    manager: ManagerInterface;
    type: "OBJECTIVE" | "SUBJECTIVE";
    index: number;
}
declare const OverlayFeedback: FC<Props>;
export default OverlayFeedback;
