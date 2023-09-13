import { FC } from "react";
import { TextFieldsInterface } from ".";
interface TextFieldProps {
    id?: string;
    manager?: TextFieldsInterface;
    allowInput?: boolean;
    answer?: any;
}
declare const TextFieldComponent: FC<TextFieldProps>;
export default TextFieldComponent;
