export declare const toggleWrapper: (range: Range, elementType: string, style: string, styleType: string, link: string) => void;
export declare const unLink: (range: Range) => void;
export declare const toggleList: (range: Range, elementType: string) => void;
export declare function calculateCharacterWidth(element: HTMLInputElement): number;
export declare const createInput: (id: string) => HTMLDivElement;
export declare const replaceContent: (range: Range, id: string) => void;
export declare const addTooltip: (range: Range, tip: string) => void;
export declare const resizeBox: (editableRef: React.RefObject<HTMLDivElement>, viewBoxRef: React.MutableRefObject<any>, textareaRowCount: number, setTextareaRowCount: (value: React.SetStateAction<number>) => void) => void;
