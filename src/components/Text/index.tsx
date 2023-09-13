import React, { FC, useEffect, useRef, useState } from "react";
import { TextComponentProps, formatTextContent } from "./handler";
import { ToolTipTypes, ToolTips } from "../extensions/ToolTip";
import { TextFields } from "../extensions/TextFields";

const TextComponent: FC<TextComponentProps> = ({
  styles,
  data,
  slide
}) => {

  const [processed , setProcessed] = useState<any[]>([]);

  const [formatted, setFormatted] = useState<any[]>([]);

  const textContainerRef = useRef<any>(null);

  const hideText = () => {
    textContainerRef.current.style.display = "none";
  }

  // Needs to be refactored later // No time right now // 
  const answerBelongsToPrevious = (answer : string) => {
    if( data.answers ){ 
      for (let i = 0; i < data.answers.length; i++) {
        const ans = data.answers[i];
        if ( typeof ans == "string" ){
          if(answer === ans){
            return false;
          }
        }else{
          // If answer is list of answers
          for (let j = 0; j < ans.length; j++) {
            const item = ans[j];
            if(item === answer){
              return false;
            }
          }
        }
      }
    }else{
      // Yet to be handled for option based
      return false;
    }
    return true;
  }

  useEffect(()=>{
    // Handle initial text formatting
    setFormatted(
      formatTextContent(data.content)
    )
    slide.setFunction("hideText", hideText)
    // Handle subjective based answers
    if( data.answers ){
      // Spread into previous answers
      slide.setAnswers([
        ...slide.answers ?? [],
        ...data.answers.filter((a:any) => !slide.answers?.includes(a))
      ]);
    }
  },[data]);

  useEffect(()=>{
    let processText : any[] = [];
    // Handle tips
    if(data.tips){
      processText = ToolTips( ToolTipTypes.TEXT, formatted, data.tips ).data;
    }

    // Handle TextFields
    if(formatted.includes("<?>") ){
      var textFields : any = TextFields(processText, slide, (data.answers ?? []));
      processText = textFields.data;
      const selectAnswer : any = slide.functions?.selectAnswer;
      // Function to select answer and fill field
      slide.setFunction("selectAnswer", ( index : number, value : string )=>{
        if( selectAnswer && answerBelongsToPrevious( value ) ){
          selectAnswer(index, value);
          return;
        }
        const updateProcessed = textFields.fieldReplacementFill(index, value, processText);
        setProcessed(() => updateProcessed);
      });
    }
    setProcessed(() => processText);
    if( data.answers ) {
      slide.attributes["hasSubjective"] = true;
      if (slide.functions && slide.functions.setHint){
        slide.functions?.setHint(true);
      }
    }
  },[formatted]);

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
