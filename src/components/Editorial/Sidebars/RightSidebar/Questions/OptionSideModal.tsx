import React, { FC, createRef, useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import DataListManager from "./DataListManager";
import { randomString } from "utilities/string";
import { FaCheckCircle, FaEdit, FaPencilAlt, FaStar } from "react-icons/fa";
import { ComponentLayoutInterface } from "components/interface";
import { OptionInterface } from "./ActiveQuestion";
import { _getManager, setComponentLayout } from "components/Editorial/Base/Manager";

interface Props {
    option: OptionInterface;
    setOptions: Function;
}

const OptionSideModal: FC<Props> = ({ option, setOptions }) => {
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const nameInputRef: React.RefObject<any> = createRef();
    const [optionTitle , setOptionTitle] = useState<string>(option.title);
    const [optionFeedback, setOptionFeedback] = useState<{ current : string, previous : string}>({
        previous : "", current : ""
    });
    const [optionSizes, setOptionSizes] = useState<any>({
        width : option.layout?.size?.width ?? 100,
        height : option.layout?.size?.height ?? 50
    })
    const manager = _getManager();
    const saveOptionName = () => {
        setOptions((prev : OptionInterface[]) => prev.map((item:OptionInterface) => {
            return item.hash == option.hash 
                ? { ...option, title : nameInputRef.current.value ?? option.title}
                : item;
        }));
    };

    const saveOptionFeedback = () => {
        setOptions((prev : OptionInterface[]) => prev.map((item:OptionInterface) => {
            return item.hash == option.hash 
                ? { ...option, feedback : optionFeedback.current ?? option.feedback}
                : item;
        }));
    };

    const saveOptionSize = (data : {width? : number, height? : number}) => {
        const layout =  setComponentLayout(
            manager.canvasManager.canvas.getCanvasSize(),
            { size : { 
                width : data.width ?? optionSizes?.width, 
                height : data.height ?? optionSizes?.height 
            }, }
        );
        setOptions((prev : OptionInterface[]) => [...prev.map((item:OptionInterface) => {
            return item.hash == option.hash 
                ? { ...option, layout }
                : item;
        })])
    }

    const feedbackCanSave = () =>
        optionFeedback.current !== "" && optionFeedback.current !== optionFeedback.previous;


    useEffect(()=>{
        setOptionTitle(option.title);
        setOptionSizes({
            width : option.layout?.size?.width ?? 100,
            height : option.layout?.size?.height ?? 50
        })
        setOptionFeedback({
            current : option.feedback ?? "", 
            previous : option.feedback ?? ""
        })
    },[option]);

    return (
        <div className="absolute w-[110%] min-h-[300px] bg-white right-[101%] top-[20%] shadow-md border-[#e5e5e5] border-[2px] rounded-[6px] pb-2">
            <p className="text-[13px] text-center font-medium border-[#e5e5e5] border-b-[2px] py-[4px]">
                {" "}
                Manage Option
            </p>
            <div className="mt-[8px] px-[5px]">
                <p className="text-[13px]">Title</p>
                <div className="flex border-[#e5e5e5] border-[2px] rounded-[5px]">
                    <input
                        ref={nameInputRef}
                        name="optionName"
                        className="text-[14px] px-[5px] py-[2px]"
                        value={optionTitle}
                        onChange={(e) => setOptionTitle(e.target.value)}
                        disabled={!isEditingName}
                    />
                    <button
                        className="w-full cursor-pointer flex justify-center items-center border-[#e5e5e5] border-l-[2px]"
                        onClick={() => {
                            isEditingName && saveOptionName();
                            setIsEditingName(!isEditingName);
                        }}
                    >
                        {!isEditingName && (
                            <FaEdit className="text-blue-500 text-[16px]" />
                        )}
                        {isEditingName && (
                            <FaCheckCircle className="text-green-500 text-[16px]" />
                        )}
                    </button>
                </div>
            </div>
            <div className="mt-[8px] px-[5px]">
                <p className="text-[13px]">Width</p>
                <div className="flex border-[#e5e5e5] border-[2px] rounded-[5px]">
                    <input
                        name="optionWidth"
                        className="text-[14px] px-[5px] py-[2px]"
                        value={optionSizes.width}
                        onChange={(e) => {saveOptionSize({ width : parseFloat(e.target.value) })}}
                    />
                </div>
            </div>
            <div className="mt-[8px] px-[5px]">
                <p className="text-[13px]">Height</p>
                <div className="flex border-[#e5e5e5] border-[2px] rounded-[5px]">
                    <input
                        name="optionHeight"
                        className="text-[14px] px-[5px] py-[2px]"
                        value={optionSizes?.height}
                        onChange={(e) => {saveOptionSize({ height : parseFloat(e.target.value) })}}
                    />
                </div>
            </div>
            <div className="mt-[8px] px-[5px]">
                <p className="text-[13px]">
                    Feedback <span className="text-[12px]">({option.isAnswer ? "Correct" : "Wrong"})</span>
                </p>
                <div className="flex flex-col border-[#e5e5e5] border-[2px] rounded-[5px]">
                    <textarea 
                        className="w-full h-[90px] text-[14px] border-[2px] border-[#f2f2f2] rounded-[5px] p-1"
                        onChange={(e) => setOptionFeedback((prev:any) => ({...prev, current : e.target.value}))}
                    ></textarea>
                    <button 
                        className={"w-full text-white text-[14px] px-3 py-1 rounded-[5px] " + 
                            (!feedbackCanSave() ? 'bg-[#d5d5d5]' : 'bg-green-500')
                        }
                        disabled={!feedbackCanSave()}
                        onClick={() => saveOptionFeedback()}
                    > Save feedback</button>
                </div>
            </div>
        </div>
    );
};

export default OptionSideModal;
