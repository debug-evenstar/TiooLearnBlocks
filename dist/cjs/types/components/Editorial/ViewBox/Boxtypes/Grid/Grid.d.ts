import { ManagerInterface } from "components/Editorial/Base/Manager";
import { FC } from "react";
interface GridProps {
    id: string;
    manager: ManagerInterface;
    viewBoxSize: {
        height: number;
        width: number;
    };
}
declare const Grid: FC<GridProps>;
export default Grid;
