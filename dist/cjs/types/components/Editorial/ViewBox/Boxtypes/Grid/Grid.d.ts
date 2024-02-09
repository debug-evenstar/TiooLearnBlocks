import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { FC } from "react";
interface GridProps {
    id: string;
    manager: EditorialManagerInterface;
    viewBoxSize: {
        height: number;
        width: number;
    };
}
declare const Grid: FC<GridProps>;
export default Grid;
