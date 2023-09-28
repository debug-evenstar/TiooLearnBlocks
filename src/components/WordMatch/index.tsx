import React, { FC, useEffect, useState } from "react";
import {
    WordMatchComponentProps,
    anwserStyles,
    optionStyles,
    shuffleAnswers,
} from "./handler";

const WordMatchComponent: FC<WordMatchComponentProps> = ({ data, slide }) => {
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
    const [optionsList, setOptionsList] = useState<any[]>([]);
    const [answersList, setAnswersList] = useState<any[]>([]);
    const [answeredList, setAnsweredList] = useState<number[]>([]);
    const [failedIndex, setFailedIndex] = useState<number>(-1);

    const selectOption = (index : number) => {
      if(!answeredList.includes(index)) {
        setActiveOptionIndex(() => index);
        setFailedIndex(-1);
      }
    }

    const matchOption = (index : number) => {
      const selectedOption = optionsList[activeOptionIndex];
      const selectedOptionIndex = data.options.indexOf(selectedOption);
      const correctAnswer = data.answers[selectedOptionIndex];
      const selectedAnswer = answersList[index];
      if(activeOptionIndex !== -1) {
        if( selectedAnswer === correctAnswer ) {
          slide.triggerFeedback("success",activeOptionIndex);
          slide.updateProgress();
          const nextIndex = answeredList.length + 1;
          setTimeout(()=>{
            setActiveOptionIndex(nextIndex);
          },600);
          setAnsweredList((previous) => [
            ...previous,
            answeredList.length
          ]);
          // Move the answered question option to top
          const sorted = optionsList;
          const tempTop = optionsList[answeredList.length];
          sorted[answeredList.length] = optionsList[activeOptionIndex];
          sorted[activeOptionIndex] = tempTop;
          setOptionsList(() => [...sorted]);
          //Move answer also
          const newAnswers = answersList;
          newAnswers[index] = answersList[answeredList.length]
          newAnswers[answeredList.length] = correctAnswer;
          setAnswersList(() => [...newAnswers]);
        }
        else{
          slide.triggerFeedback("failure",activeOptionIndex);
          setActiveOptionIndex(answeredList.length);
          setFailedIndex(index);
          setTimeout(()=>{
            setFailedIndex(-1);
          },600);
        }
      }

    }

    const loadStyles = (index : number) => {
      return answeredList.includes(index) 
        ? optionStyles["answered"]
        : (activeOptionIndex === index
            ? optionStyles["active"]
            : optionStyles["inactive"])
    }

    useEffect(() => {
        setOptionsList(() => [...data.options]);
        setAnswersList(() => shuffleAnswers(data.answers));
        setAnsweredList(() => []);
    }, [data, slide]);

    useEffect(()=>{
      if((answeredList.length !== 0) && (answeredList.length === answersList.length)){
        slide.functions?.allowProceed && slide.functions?.allowProceed();
      }
    },[answeredList, answersList, slide]);


    return (
        <>
            <div className="whitespace-normal">
                {optionsList.length &&
                    optionsList.map((option, index) => {
                        return (
                            <div key={index} className="w-[90%] my-[20px] mx-auto flex justify-center">
                                <div 
                                className="w-[40%] py-[2px] px-[3px] mr-[20px] h-auto bg-[#86A94B] polygon-clip flex justify-center items-center cursor-pointer"
                                onClick={() => selectOption(index)}
                                >
                                    <div
                                        className={loadStyles(index)}
                                    >
                                        {optionsList[index]}
                                    </div>
                                </div>
                                <div 
                                  className={
                                    answeredList.includes(index) 
                                      ? anwserStyles.answered
                                      : failedIndex === index 
                                        ? anwserStyles.failed
                                        : anwserStyles.inactive
                                    }
                                  onClick={() => matchOption(index)}
                                >
                                        {answersList[index]}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default WordMatchComponent;
