import React, { FC } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
interface Props {
    manager: EditorialManagerInterface;
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
