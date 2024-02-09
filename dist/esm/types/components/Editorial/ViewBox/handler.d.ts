/// <reference types="react" />
import { EditorialManagerInterface } from "../Base/EditorialManager";
export declare const calculateMaxResizableArea: (viewBoxPosition: DOMRect, canvasSize: DOMRect, hasHandles?: boolean) => {
    maxWidth: number;
    maxHeight: number;
};
export declare function getOriginalName(str: string): string;
export declare const ViewBoxContent: (id: string, manager: EditorialManagerInterface, viewBoxRef: React.MutableRefObject<HTMLDivElement | null>, isEditable: boolean, setIsEditable: React.Dispatch<React.SetStateAction<boolean>>, viewBoxSize: {
    width: number;
    height: number;
}) => JSX.Element;
export declare const EditProperties: (id: string, manager: EditorialManagerInterface) => JSX.Element;
interface ViewBoxHandlerInterface {
    manager: EditorialManagerInterface;
    setViewBoxStyle: Function;
}
export declare class ViewBoxHandler implements ViewBoxHandlerInterface {
    manager: EditorialManagerInterface;
    constructor(manager: EditorialManagerInterface);
    setViewBoxStyle(style: string, styleType: string): void;
}
export declare const resizeInputWidth: (input: HTMLInputElement) => void;
export {};
