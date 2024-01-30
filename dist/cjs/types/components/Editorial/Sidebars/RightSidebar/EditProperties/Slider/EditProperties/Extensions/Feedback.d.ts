import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { FC } from "react";
interface Props {
    manager: EditorialManagerInterface;
    type: "OBJECTIVE" | "SUBJECTIVE";
}
declare const Feedback: FC<Props>;
export default Feedback;
