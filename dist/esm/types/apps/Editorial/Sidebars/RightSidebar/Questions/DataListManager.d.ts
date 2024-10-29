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
    richText?: boolean;
    canToggle?: boolean;
    onToggle?: Function;
    toggleStates?: boolean[];
    max?: number;
}
declare const DataListManager: FC<Props>;
export default DataListManager;
