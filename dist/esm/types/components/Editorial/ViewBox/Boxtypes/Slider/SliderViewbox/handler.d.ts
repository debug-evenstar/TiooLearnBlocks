/// <reference types="react" />
import { ManagerInterface } from "components/Editorial/Base/Manager";
export declare function getOriginalName(str: string): string;
export declare const ViewBoxContent: (id: string, manager: ManagerInterface, viewBoxRef: React.MutableRefObject<HTMLDivElement | null>, isEditable: boolean, setIsEditable: React.Dispatch<React.SetStateAction<boolean>>, data: any, currIndex: number, isFlashcardDraggable: boolean) => JSX.Element;
export declare const EditProperties: (id: string, manager: ManagerInterface) => JSX.Element;
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
