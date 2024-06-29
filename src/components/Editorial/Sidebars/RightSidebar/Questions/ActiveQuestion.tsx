import React, { FC, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import DataListManager from "./DataListManager";
import { randomString } from "utilities/string";
import { FaAnchor, FaBriefcase, FaFill, FaStar, FaStickyNote } from "react-icons/fa";
import { ComponentLayoutInterface } from "components/interface";
import OptionSideModal from "./OptionSideModal";
import { _getManager, setComponentLayout } from "components/Editorial/Base/Manager";
import { QuestionInterface } from "../InactiveSidebar";

interface Props {
    question: QuestionInterface;
    setActiveQuestion: Function;
    setQuestions : Function;
}

export enum OptionTypes {
    Single="single",
    Multiple="multi",
    Button="button"
}

export enum InputTypes {
    Objective="objective",
    Subjective="subjective"
}
export interface OptionInterface {
    title : string;
    hash : string;
    value? : string;
    isAnswer? : boolean;
    feedback? : string;
    layout? : ComponentLayoutInterface
}

export interface InputInterface {
    hash : string;
    title : string;
    type : string;
    layout? : ComponentLayoutInterface
}

const ActiveQuestion: FC<Props> = ({ question, setActiveQuestion, setQuestions}) => {
    const [options, setOptions] = useState<any>(question.options);
    const [activeOption, setActiveOption] = useState<any>(null);
    const [activeInput, setActiveInput] = useState<any>(null);
    const [optionType, setOptionType] = useState<OptionTypes>(OptionTypes.Single);
    const [inputs, setInputs] = useState(question.inputs ?? []);
    const [questionQuery, setQuestionQuery] = useState<any>({previous : "", current : ""});
    const manager = _getManager();
    const optionBulletIcon = (item : any) => 
        item.isAnswer 
            ? (<FaStar className="text-[15px] text-blue-400 mr-1"/>)
            : (<FaStar className="text-[15px] text-[#c9c9c9] mr-1"/>)

    
    const generateOption = (title : string) => {
        const option : OptionInterface = {
            title,
            hash : randomString(8),
            value : title,
            layout :  setComponentLayout(
                manager.canvasManager.canvas.getCanvasSize(),
                { size : { width : 100, height : 50 }, }
            )
        }
        return option;
    }

    const generateInput = (title : string) => {
        const input : InputInterface = {
            hash : randomString(8),
            title,
            type : InputTypes.Objective,
            layout :  setComponentLayout(
                manager.canvasManager.canvas.getCanvasSize(),
                { size : { width : 80, height : 40 }, }
            )
        }
        return input;
    }

    const resetAnswers = () => {
        setOptions((prev : OptionInterface[]) => prev.map((option : OptionInterface) => {
            return {...option, isAnswer: false}
        }))
    }

    const setOptionAsAnswer = (item : OptionInterface) => {
        const updated = options.map((option : OptionInterface) => {
            return option.hash === item.hash
                ? {...option, isAnswer : question.optionType == OptionTypes.Single ? true : !option.isAnswer }
                : {...option, isAnswer : question.optionType == OptionTypes.Single ? false : option.isAnswer}
        });
        setOptions([...updated]);
    }

    const queryCanSave = () =>
        questionQuery.current !== "" && questionQuery.current !== questionQuery.previous;

    const saveQuestionQuery = () => {
        setQuestionQuery((prev:any) => ({...prev, previous : questionQuery.current}));
    }

    useEffect(()=>{
        setQuestions((prev:any) => {
            const questionIndex = prev.indexOf(question);
            question.options = [...options];
            question.optionType = optionType;
            prev[questionIndex] = question;
            return [...prev];
        });
        if (activeOption) {
            setActiveOption(options.filter((option: OptionInterface) => option.hash == activeOption.hash)[0]);
        }
    },[options, optionType]);

    useEffect(()=>{
        setQuestions((prev:any) => {
            const questionIndex = prev.indexOf(question);
            question.inputs = [...inputs];
            prev[questionIndex] = question;
            return [...prev];
        });
    },[inputs]);

    useEffect(() => {
        resetAnswers();
    },[optionType]);
    

    useEffect(() => {
        question.options && setOptions(question.options);
        question.optionType && setOptionType(question.optionType);
    },[question]); //Possible loop

    return (
        <div className="w-full h-full mb-12 relative flex flex-col">
            {activeOption && <OptionSideModal 
                option={activeOption}
                setOptions={setOptions}
            />}
            <div className="relative h-[50px]">
                <button
                    className="absolute flex items-center ml-1 mt-auto h-[20px] top-[calc(50%_-_10px)]"
                    onClick={() => setActiveQuestion(null)}
                >
                    <FiArrowLeft className="text-[15px] text-[#87909E] mr-[1px]" />
                    <p className="text-[#87909E] text-[14px]">Back</p>
                </button>
                <h3 className="shadow-lg text-[15px] my-2 py-2 text-center text-[#87909E] font-medium">
                    {question.title}
                </h3>
            </div>
            <div className="grow overflow-y-scroll pb-4">
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
                        onChange={(e) => setOptionType(e.target.value as OptionTypes)}
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
                            setActiveItem={(option : OptionInterface) => setActiveOption(option.hash == activeOption?.hash ? null : option)}
                            generateItem={generateOption}
                            bulletIcon={optionBulletIcon}
                            bulletAction={(item: OptionInterface) => setOptionAsAnswer(item)}
                        />
                    </div>
                </div>
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold mb-2">Manage inputs</p>
                    <div>
                        <DataListManager 
                            title="Inputs" 
                            data={inputs}
                            setData={setInputs}
                            setActiveItem={(input : InputInterface) => setActiveInput(input.hash == activeInput?.hash ? null : input)}
                            generateItem={generateInput}
                            bulletIcon={<FaStickyNote className="text-[15px] text-blue-400 mr-1"/>}
                        />
                    </div>
                </div>
                <div className="px-2 mt-[15px]">
                    <p className="text-[14px] font-bold">Query</p>
                    <p className="text-[12px] mb-1">(Specify query for prompt)</p>
                    <textarea 
                        className="w-full h-[90px] text-[14px] border-[2px] border-[#f2f2f2] rounded-[5px] p-1"
                        onChange={(e) => setQuestionQuery((prev:any) => ({...prev, current : e.target.value}))}
                    ></textarea>
                    <button 
                        className={"w-full text-white text-[14px] px-3 py-1 rounded-[5px] " + 
                            (!queryCanSave() ? 'bg-[#d5d5d5]' : 'bg-green-500')
                        }
                        disabled={!queryCanSave()}
                        onClick={() => saveQuestionQuery()}
                    > Save </button>
                </div>
            </div>

        </div>
    );
};

export default ActiveQuestion;
