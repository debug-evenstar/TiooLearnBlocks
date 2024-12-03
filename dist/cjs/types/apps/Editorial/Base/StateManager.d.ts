import { FC } from "react";
import { ManagerInterface } from "./Manager";
interface Props {
    children: Function;
    manager: ManagerInterface;
}
declare const StateManager: FC<Props>;
export default StateManager;
