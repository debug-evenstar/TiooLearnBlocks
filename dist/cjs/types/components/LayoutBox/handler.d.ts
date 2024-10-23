import { ComponentLayoutInterface } from "components/interface";
import { ReactNode } from "react";
export interface LayoutComponentProps {
    layout: ComponentLayoutInterface;
    responsiveOptions?: any;
    children: ReactNode;
}
export declare const responsiveTopOffset: (offsetValue: number | undefined) => number | undefined;
export declare const responsiveWidth: (value: number | undefined, options: any) => number | undefined;
