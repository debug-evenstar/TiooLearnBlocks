import React, { FC } from "react";
import { TextFieldsInterface } from ".";
interface TextFieldProps {
    id?: string;
    manager?: TextFieldsInterface;
    allowInput?: boolean;
    answer?: any;
    styles?: React.CSSProperties;
}
declare const TextFieldComponent: FC<TextFieldProps>;
export default TextFieldComponent;
