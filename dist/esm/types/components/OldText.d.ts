import React, { FC } from "react";
interface TextComponentProps {
    fontSize?: string;
    color?: string;
    fontWeight?: string;
    fontStyle?: string;
    opacity?: string;
    lineHeight?: string;
    width?: string;
    textAlign?: string;
    children: React.ReactElement;
}
declare const TextComponent: FC<TextComponentProps>;
export default TextComponent;
