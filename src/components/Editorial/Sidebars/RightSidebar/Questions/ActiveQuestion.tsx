import React, { FC, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import DataListManager from "./DataListManager";
import { randomString } from "utilities/string";
import { FaStar } from "react-icons/fa";
import { ComponentLayoutInterface } from "components/interface";

interface Props {
    question: any;
    setActiveQuestion: Function;
    setQuestions : Function;
}

export enum OptionTypes {
    Single="single",
    Multiple="multi",
    Button="button"
}
export interface OptionInterface {
    title : string;
    hash : string;
    value? : string;
    layout? : ComponentLayoutInterface
}

const ActiveQuestion: FC<Props> = ({ question, setActiveQuestion, setQuestions}) => {
    const [options, setOptions] = useState<any>([]);
    const [activeOption, setActiveOption] = useState<any>(null);
    const [optionType, setOptionType] = useState<string>(OptionTypes.Single);
    const generateOption = (title : string) => {
        const option : OptionInterface = {
            title,
            hash : randomString(8),
            value : title
        }
        return option;
    }
    useEffect(()=>{
        setQuestions((prev:any) => {
            const questionIndex = prev.indexOf(question);
            question.options = [...options];
            question.optionType = optionType;
            prev[questionIndex] = question;
            return [...prev];
        });
    },[options, optionType]);

    useEffect(() => {
        question.options && setOptions(question.options);
        question.optionType && setOptionType(question.optionType);
    },[]);

    return (
        <div className="w-full mb-12 relative">
            <div className="relative">
                <button
                    className="absolute flex items-center bottom-2 ml-1"
                    onClick={() => setActiveQuestion(null)}
                >
                    <FiArrowLeft className="text-[15px] text-[#87909E] mr-[1px]" />
                    <p className="text-[#87909E] text-[14px]">Back</p>
                </button>
                <h3 className="shadow-lg text-[15px] my-2 py-2 text-center text-[#87909E] font-medium">
                    {question.title}
                </h3>
            </div>
            <div className="px-2 mt-[15px]">
                <p className="text-[14px]">Question Type</p>
                <select className="w-full border-[2px] border-[#f2f2f2] rounded-[5px] py-1 px-1 text-[14px] mt-[5px] outline-none">
                    <option value="multichoice">Multichoice</option>
                </select>
            </div>
            <div className="px-2 mt-[15px]">
                <p className="text-[14px] font-bold mb-2">Manage options</p>
                <p className="text-[14px]">Options Type</p>
                <select 
                    className="w-full border-[2px] border-[#f2f2f2] rounded-[5px] py-1 px-1 text-[14px] mt-[5px] outline-none"
                    onChange={(e) => setOptionType(e.target.value)}
                >
                    <option value="single">Single selection</option>
                    <option value="multi">Multi selection</option>
                    <option value="button">Button</option>
                </select>
                <div>
                    <DataListManager 
                        title="Options" 
                        data={options}
                        setData={setOptions}
                        setActiveItem={setActiveOption}
                        generateItem={generateOption}
                        bulletIcon={() => (<FaStar className="text-[15px] text-blue-400 mr-1"/>)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActiveQuestion;
