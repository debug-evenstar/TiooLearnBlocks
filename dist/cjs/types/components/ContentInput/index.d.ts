import React from "react";
interface ContentInputProps {
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange?: Function;
    content?: any;
    ref: any;
}
declare const ContentInput: React.FC<ContentInputProps>;
export default ContentInput;
