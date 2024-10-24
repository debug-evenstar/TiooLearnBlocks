import { ComponentLayoutInterface } from "components/interface";
import { ReactNode } from "react";
export interface LayoutComponentProps {
    layout: ComponentLayoutInterface;
    responsiveOptions?: any;
    children: ReactNode;
}
export declare const responsiveTopOffset: (offsetValue: number | undefined) => number;
export declare const responsiveLeftOffset: (offsetValue: number | undefined) => number;
export declare const responsiveStyles: (options: any) => any;
