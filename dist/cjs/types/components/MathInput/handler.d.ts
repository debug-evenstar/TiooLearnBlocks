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
export declare const processExpression: (expression: string, mathState: MathState, inputState: InputState) => void;
export declare const extractFinalMath: (latexData: any[], level?: number) => string;
export declare const registerInputHandlers: (inputState: InputState, mathState: MathState) => void;
