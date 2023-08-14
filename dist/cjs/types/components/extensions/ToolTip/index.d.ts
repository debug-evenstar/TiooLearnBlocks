/// <reference types="react" />
export declare class ToolTipTypes {
    static TEXT: string;
}
declare class ToolTipsHandler {
    type: string;
    data: (string | React.ReactElement)[];
    tips: string[];
    ids: string[];
    constructor(type: string, data: any, tips: string[]);
    getIdentifiers(): string[];
    generateToolTip(content: string): void;
    formatToolTip(text: string, tipContent: string): {
        id: string;
        element: import("react/jsx-runtime").JSX.Element;
    };
    processDataTips(): (string | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>)[];
}
export declare const ToolTips: (type: string, data: any, tips: string[]) => ToolTipsHandler;
export {};
