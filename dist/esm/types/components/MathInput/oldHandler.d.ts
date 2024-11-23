export type InputState = {
    activeInput: any;
    setActiveInput: Function;
    inputData?: any;
    setInputData?: Function;
};
export type MathState = {
    currentValue: any;
    setCurrentValue: Function;
    latexData: any;
    setLatexData: Function;
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
export declare const processExpression: (expression: string, mathState: MathState, inputState: InputState) => void;
export declare const updateMathValue: (latexData: any[], inputData: any, noRender?: boolean) => string;
export declare const addInputEvents: (inputState: InputState) => void;
