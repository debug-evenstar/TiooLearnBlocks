/// <reference types="react" />
export interface TextFieldsInterface {
    data: (string | React.ReactElement)[];
    fieldIds: string[];
    fieldData: {
        [key: string]: string;
    };
    fieldReplacementFill: Function;
}
declare class TextFieldsHandler implements TextFieldsInterface {
    data: (string | React.ReactElement)[];
    fieldIds: string[];
    fieldData: {
        [key: string]: any;
    };
    constructor(data: any);
    getIdentifier(): string;
    generateToolTip(content: string): void;
    setFieldValue(id: string, value: string): void;
    fieldReplacementFill(index: number, value: string, data: any[]): any[];
    formatTextField(): {
        id: string;
        element: import("react/jsx-runtime").JSX.Element;
    };
    processTextFields(): (string | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>)[];
}
export declare const TextFields: (data: any) => TextFieldsHandler;
export {};
