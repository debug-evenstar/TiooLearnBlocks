import { ManagerInterface } from "components/Editorial/Base/Manager";
import { FC } from "react";
interface Props {
    manager: ManagerInterface;
    type: "OBJECTIVE" | "SUBJECTIVE";
}
declare const Feedback: FC<Props>;
export default Feedback;
