import React, { FC } from "react";
import { ManagerInterface } from "apps/Editorial/Base/Manager";
interface Props {
    manager: ManagerInterface;
    rowIndex: number;
    colIndex: number;
    activeCell: {
        rowIndex: number;
        colIndex: number;
    };
    cellRef: React.RefObject<HTMLDivElement>;
}
declare const CellContent: FC<Props>;
export default CellContent;
