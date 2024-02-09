import { FC } from "react";
import { EditorialManagerInterface } from "./EditorialManager";
interface Props {
    children: Function;
    manager: EditorialManagerInterface;
}
declare const EditorialStateManager: FC<Props>;
export default EditorialStateManager;
