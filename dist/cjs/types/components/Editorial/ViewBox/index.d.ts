import { FC } from "react";
import "react-resizable/css/styles.css";
import { EditorialManagerInterface } from "../Base/EditorialManager";
interface Props {
    id: string;
    manager: EditorialManagerInterface;
    handleDelete: Function;
}
declare const ViewBox: FC<Props>;
export default ViewBox;
