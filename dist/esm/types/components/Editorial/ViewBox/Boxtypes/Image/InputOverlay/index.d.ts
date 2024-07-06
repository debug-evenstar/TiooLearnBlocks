import React, { FC } from "react";
import { ComponentLayoutInterface } from "../../../../../interface";
declare const OverlayInput: FC<{
    index: number;
    ref: React.RefObject<any>;
    data: any;
    parentLayout?: ComponentLayoutInterface;
    onResize: Function;
    onDrag: Function;
    onClick: Function;
}>;
export default OverlayInput;
