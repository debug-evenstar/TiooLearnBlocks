import React from "react";
import "./EmojiTextArea.css";
interface EmojiTextAreaProps {
    value: string;
    defaultValue?: string;
    onChange: (value: string) => void;
}
declare const EmojiTextArea: React.FC<EmojiTextAreaProps>;
export default EmojiTextArea;
