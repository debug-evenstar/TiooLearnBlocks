import { ManagerInterface } from "apps/Editorial/Base/Manager";
import { ComponentBaseDataInterface } from "components/interface";
import { RefObject } from "react";
interface TextComponentDataInterface extends ComponentBaseDataInterface {
    content: string;
    tips?: string[];
}
export declare enum TextFormatType {
    STYLE = 0,
    WRAP = 1
}
export declare const supportedStyles: any;
export declare const textComponentData: (content?: string, tips?: string[]) => TextComponentDataInterface;
export declare const wrapTextData: (content: string) => string;
export declare const getRange: () => Range | undefined;
export declare const handleTextChange: (event: any, manager: ManagerInterface) => void;
export declare const initializeParentTag: (editableRef: React.RefObject<HTMLDivElement>, force?: boolean) => void;
export declare const resizeBox: (editableRef: React.RefObject<HTMLDivElement>, viewBoxRef: React.MutableRefObject<any>, textareaRowCount: number, setTextareaRowCount: (value: React.SetStateAction<number>) => void, event?: any | null) => void;
export declare const formatText: (type: TextFormatType, tag: string | HTMLElement, styles?: {
    [key: string]: string;
} | undefined) => HTMLElement | undefined;
export declare const handleInsertMath: (mathHtml: string) => void;
export declare const toggleList: (listType: string) => void;
export declare const verifySelectionProperty: () => void;
export declare const handleSelectionChange: () => void;
export declare const handleAddTip: (tip: string) => void;
export declare const configureTipManager: (element: any) => () => void;
export declare const resizeTipBoxes: (editableElement: HTMLElement | null) => void;
export declare function removePx(value: string): string;
export declare function selectNode(node: any): void;
export declare function setState(key: string, data: any): void;
export declare function cleanEmptyNodes(parent: HTMLElement): void;
export {};
