import { FC } from "react";
declare const LayoutBox: FC<{
    id: string;
    initialItemSize: {
        width: number;
        height: number;
    };
    items: any[];
    updateLayout: Function;
    children?: any;
}>;
export default LayoutBox;
