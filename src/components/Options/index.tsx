import React, { useEffect, useState } from "react";
import {
    OptionsComponentProps,
    optionAlphabets,
    optionStyles,
} from "./handler";

const OptionsComponent: React.FC<OptionsComponentProps> = ({ data, slide }) => {
    const [options, setOptions] = useState<string[]>([]);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<number>(-1);
    const [answeredList, setAnsweredList] = useState<number[]>([]);

    const selectOption = (index: number) => {
        if(answers.length !== answeredList.length) {
            setSelectedOption(() => index);
            if (answers.includes(options[index])) {
                slide.triggerFeedback("success");
                setAnsweredList((previous) => [...previous, index]);
                setTimeout(()=>{
                    setSelectedOption(-1);
                },1000);
            } else {
                slide.triggerFeedback("failure");
            }
        }
    };

    const loadOptionStyle = (index: number) => {
        return  selectedOption === index 
                ? (answers.includes(options[index]) ? optionStyles.correct : optionStyles.wrong)
                : answeredList.includes(index) 
                    ? optionStyles.answered
                    : optionStyles.inactive
    };

    useEffect(() => {
        setOptions(() => data.options);
        setAnswers(() => data.answers);
    }, [data.answers, data.options]);

    useEffect(() => {
        if (answeredList.length && answeredList.length === answers.length) {
            slide.functions?.allowProceed();
        }
    });

    return (
        <>
            <div>
                <p className="text-center text-[14px]">
                    SELECT MULTIPLE ANSWERS
                </p>
                {options.map((option, index) => {
                    return (
                        <div
                            key={index}
                            className={loadOptionStyle(index)}
                            onClick={() => selectOption(index)}
                        >
                            <span className="text-[#87909E]">
                                {optionAlphabets[index]}.
                            </span>
                            <span
                                className={
                                    selectedOption === index
                                        ? "text-white ml-[10px]"
                                        : "text-[#030036] ml-[10px]"
                                }
                            >
                                {option}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default OptionsComponent;
