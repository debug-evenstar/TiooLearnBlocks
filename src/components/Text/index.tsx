import React, { FC, useEffect, useRef, useState } from "react";
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
  const textContainerRef = useRef<any>(null);

  const hideText = () => {
    textContainerRef.current.style.display = "none";
  }



  useEffect(()=>{
    // setProcessed(
    //   processTextContent(data.content)
    // )
    let initial = processTextContent(data.content);

    // Handle tips
    if(data.tips){
      const tips = ToolTips( ToolTipTypes.TEXT, initial, data.tips );
      initial = tips.data;
    }

    // Handle TextFields
    if(processed.includes("<?>") ){
      var textFields : any = TextFields(initial);
      slide.addFields(textFields);
      slide.setFunction("selectAnswer", ( index : number, value : string )=>{
        const updateProcessed = textFields.fieldReplacementFill(index, value, initial);
        setProcessed(() => updateProcessed);
      });
    }

    setProcessed(() => initial);
    slide.setFunction("hideText", hideText)
  },[data, slide]);

  return <>
    <div className="text-center text-font" ref={textContainerRef}>
      {processed.map((item, index) => (
          <span className="text-font" key={index}>
            {(typeof item) == "string" ? ` ${item} ` : (item)}
          </span>
      ))}
    </div>
  </>;
};

export default TextComponent;
