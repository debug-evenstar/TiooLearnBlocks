import { ComponentBaseDataInterface, OptionInterface, QuestionInterface } from "components/interface";
export declare const setObjandSubComponentData: (type: "OBJECTIVE" | "SUBJECTIVE", identifier?: string, options?: OptionInterface[], answers?: string[]) => ComponentBaseDataInterface;
export declare const addObjandSubComponentData: (type: "OBJECTIVE" | "SUBJECTIVE", identifier?: string, options?: OptionInterface[], answers?: string[]) => QuestionInterface;
interface DataItem {
    type: string;
    identifier: string;
    options: string[];
    answers: string[];
    feedbacks: string[];
}
export declare function associatedData(data: DataItem[], htmlString: string): DataItem[] | undefined;
export {};
