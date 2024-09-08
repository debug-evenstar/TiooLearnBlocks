import { FC } from "react";
declare const LayoutBox: FC<{
    id: string;
    isInitialized: boolean;
    initialItemSize: {
        width: number;
        height: number;
    };
    initialLayoutBox?: any;
    items: any[];
    updateLayout: Function;
    saveLayoutBox: Function;
    children?: any;
}>;
export default LayoutBox;
