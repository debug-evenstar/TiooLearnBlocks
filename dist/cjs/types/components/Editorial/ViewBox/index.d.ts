import { FC } from "react";
import "react-resizable/css/styles.css";
import { ManagerInterface } from "../Base/Manager";
interface Props {
    id: string;
    manager: ManagerInterface;
    handleDelete: Function;
}
declare const ViewBox: FC<Props>;
export default ViewBox;
