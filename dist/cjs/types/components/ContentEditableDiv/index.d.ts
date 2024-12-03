import React from "react";
interface ContentEditableDivProps {
    divRef: React.RefObject<HTMLDivElement>;
    className?: string;
    html: string;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLDivElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
}
declare const ContentEditableDiv: React.FC<ContentEditableDivProps>;
export default ContentEditableDiv;
