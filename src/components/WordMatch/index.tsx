import React, { FC, useEffect, useState } from "react";
import {
    WordMatchComponentProps,
    anwserStyles,
    optionStyles,
    shuffleAnswers,
} from "./handler";

const WordMatchComponent: FC<WordMatchComponentProps> = ({ data, slide }) => {
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(-1);
    const [optionsList, setOptionsList] = useState<any[]>([]);
    const [answersList, setAnswersList] = useState<any[]>([]);
    const [answeredList, setAnsweredList] = useState<number[]>([])

    const selectOption = (index : number) => {
      if(!answeredList.includes(index)) {
        setActiveOptionIndex(() => index);
      }
    }

    const matchOption = (index : number) => {
      // const selectedOption = optionsList[activeOptionIndex];
      const correctAnswer = data.answers[activeOptionIndex];
      const selectedAnswer = answersList[index];
      if( selectedAnswer === correctAnswer ) {
        alert("Correct");
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
        alert("Wrong");
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
        setOptionsList(() => data.options);
        setAnswersList(() => shuffleAnswers(data.answers));
    }, [data]);

    useEffect(()=>{
      if((answeredList.length !== 0) && (answeredList.length === answersList.length)){
        slide.functions?.allowProceed();
      }
    },[answeredList, answersList, slide]);

    return (
        <>
            <div>
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
