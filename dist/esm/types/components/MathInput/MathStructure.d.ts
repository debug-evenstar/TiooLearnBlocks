import { InputState } from "./handler";
interface MathStructureInterface {
    id: string;
    level: number;
    latexCode: string;
    toHtml: Function;
    hasInput: boolean;
    inputs: any;
    extractDeepHtml: Function;
    appendToInputData: Function;
    fillInputSlots: Function;
}
declare class MathStructure implements MathStructureInterface {
    id: string;
    latexCode: string;
    inputs: any;
    level: number;
    hasInput: boolean;
    constructor(latex: string, inputState: InputState, level?: number);
    toHtml(inline?: boolean): string;
    convertPlaceholdersToInput(html: string): string;
    generateInputIds(expression: string, count?: number): string;
    fillInputSlots(count?: number): string;
    createInput(id: string): string;
    appendToInputData(math: MathStructure | any, id: string): void;
    extractDeepHtml(): string | undefined;
}
export default MathStructure;
