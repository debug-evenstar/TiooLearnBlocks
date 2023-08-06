import React, { FC } from "react";
import { TextComponentProps, processTextContent } from "./handler";
import { ToolTipTypes, ToolTips } from "../extensions/ToolTip";
import { TextFields } from "../extensions/TextFields";

const TextComponent: FC<TextComponentProps> = ({
  styles,
  data,
  slide
}) => {
  
  const processed = processTextContent(data.content);

  // Handle TextFields
  if(data.answers || data.options) {
    TextFields(processed);
  }

  // Handle tips
  if(data.tips){
    ToolTips( ToolTipTypes.TEXT, processed, data.tips );
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
