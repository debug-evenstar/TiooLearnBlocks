import { ManagerInterface } from "../Base/Manager";
export declare const calculateMaxResizableArea: (viewBoxPosition: DOMRect, canvasSize: DOMRect, hasHandles?: boolean) => {
    maxWidth: number;
    maxHeight: number;
};
interface ViewBoxHandlerInterface {
    manager: ManagerInterface;
    setViewBoxStyle: Function;
}
export declare class ViewBoxHandler implements ViewBoxHandlerInterface {
    manager: ManagerInterface;
    constructor(manager: ManagerInterface);
    setViewBoxStyle(style: string, styleType: string): void;
}
export declare const resizeInputWidth: (input: HTMLInputElement) => void;
export {};
