import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
export declare const handleTextChange: (e: any, manager: EditorialManagerInterface, textValue: string, setTextValue: React.Dispatch<React.SetStateAction<string>>, viewBoxRef: React.MutableRefObject<any>, textareaRowCount: number, setTextareaRowCount: React.Dispatch<React.SetStateAction<number>>) => void;
export declare const checkAndReturnOptions: (type: "OBJECTIVE" | "SUBJECTIVE") => {
    answer: boolean;
    content: string;
    feedback: {
        type: string;
        content: string;
    };
}[];
