import React, { FC } from "react";
import { TextComponentProps, processTextContent } from "./handler";
import { ToolTipTypes, ToolTips } from "../extensions/ToolTip";

const TextComponent: FC<TextComponentProps> = ({
  styles,
  data
}) => {
  const processed = processTextContent(data.content);
  // Handle tips
  if(data.tips){
    const TipManager = ToolTips( ToolTipTypes.TEXT, processed, data.tips );
  }
  return <>
    <div>
    {processed.map((item, index) => (
          <span key={index}>
            {(typeof item) == "string" ? ` ${item} ` : (item)}
          </span>
        ))}
    </div>
  </>;
};

export default TextComponent;
