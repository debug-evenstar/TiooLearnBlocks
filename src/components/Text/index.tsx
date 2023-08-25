import React, { FC, useEffect, useState } from "react";
import { TextComponentProps, processTextContent } from "./handler";
import { ToolTipTypes, ToolTips } from "../extensions/ToolTip";
import { TextFields } from "../extensions/TextFields";

const TextComponent: FC<TextComponentProps> = ({
  styles,
  data,
  slide
}) => {

  const [processed , setProcessed] = useState<any[]>(
    processTextContent(data.content)
  );

  // Handle tips
  if(data.tips){
    ToolTips( ToolTipTypes.TEXT, processed, data.tips );
  }

  // Handle TextFields
  if(processed.includes("<?>") ){
    var textFields : any = TextFields(processed);
    slide.addFields(textFields);
    slide.setFunction("selectAnswer", ( index : number, value : string )=>{
      const updateProcessed = textFields.fieldReplacementFill(index, value, processed);
      setProcessed(() => updateProcessed);
    });

  }



  useEffect(()=>{
    setProcessed(
      processTextContent(data.content)
    )
  },[data]);

  return <>
    <div className="text-center text-font">
      {processed.map((item, index) => (
          <span className="text-font" key={index}>
            {(typeof item) == "string" ? ` ${item} ` : (item)}
          </span>
      ))}
    </div>
  </>;
};

export default TextComponent;
