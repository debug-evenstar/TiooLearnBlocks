import React, { FC } from "react";
interface Props {
    title: string;
    data: any;
    setData: Function;
    setActiveItem: Function;
    generateItem: Function;
    onClickItem?: Function;
    bulletIcon?: Function | React.ReactElement;
    bulletAction?: Function;
}
declare const DataListManager: FC<Props>;
export default DataListManager;
