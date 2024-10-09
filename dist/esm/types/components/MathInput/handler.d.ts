type InputState = {
    activeInput: any;
    setActiveInput: Function;
};
export declare const processInputCharacter: (expression: any, index: number, setList: Function, inputState: InputState) => void;
export declare const convertLatex: (math: string, dataIndex: number, inputs?: any) => string;
export declare const processMathValue: (latexDataObject: {
    base: string;
    converted: string;
    inputs: any[];
    html: string;
}, index: number) => {
    base: string;
    converted: string;
    inputs: any[];
    html: string;
};
export declare const addInputEventHandlers: (setList: Function, inputState: InputState) => void;
export {};
