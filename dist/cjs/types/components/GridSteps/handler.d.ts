import { LessonSlideInterface } from "components/SlideManager/handler";
import { ReactElement } from "react";
export interface GridStepsData {
    size: string;
    start: string;
    end: string;
    steps: number;
    example?: boolean;
    theme?: string;
    answers?: any[];
}
export interface GridStepsComponentProps {
    data: GridStepsData;
    slide: LessonSlideInterface;
}
export declare const gridOptions: {
    label: string;
    action: string;
    data: number[];
}[];
export declare const axis: (position: string) => number[];
export declare const generateCells: (x: number, targetPositionX: number | null, endPositionX: number | null) => ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
export declare const generateRows: (x: number, y: number, targetPosition: number[], endPosition: number[]) => ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
export declare const stepButton: (step: any, click?: Function) => import("react/jsx-runtime").JSX.Element;
export declare const stepsView: (selected: any[], steps: number, example?: boolean) => ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
export declare const stepsOptions: (save: Function) => ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
export declare const handleSubmit: (steps: any[], moveTarget: Function, gridSize: any[], callback: Function) => void;
