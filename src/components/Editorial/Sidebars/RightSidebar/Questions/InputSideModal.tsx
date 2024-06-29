import React, { FC, createRef, useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaPencilAlt, FaStar } from "react-icons/fa";
import { ComponentLayoutInterface } from "components/interface";
import { InputInterface } from "./ActiveQuestion";
import { _getManager, setComponentLayout } from "components/Editorial/Base/Manager";

interface Props {
    input: InputInterface;
    setInputs: Function;
}

const InputSideModal: FC<Props> = ({ input, setInputs }) => {
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const nameInputRef: React.RefObject<any> = createRef();
    const [inputTitle , setInputTitle] = useState<string>(input.title);
    // const [inputSizes, setInputSizes] = useState<any>({
    //     width : input.layout?.size?.width ?? 100,
    //     height : input.layout?.size?.height ?? 50
    // })
    const manager = _getManager();
    const saveInputName = () => {
        setInputs((prev : InputInterface[]) => prev.map((item:InputInterface) => {
            return item.hash == input.hash 
                ? { ...input, title : nameInputRef.current.value ?? input.title}
                : item;
        }));
    };

    // const saveInputSize = (data : {width? : number, height? : number}) => {
    //     const layout =  setComponentLayout(
    //         manager.canvasManager.canvas.getCanvasSize(),
    //         { size : { 
    //             width : data.width ?? inputSizes?.width, 
    //             height : data.height ?? inputSizes?.height 
    //         }, }
    //     );
    //     setInputs((prev : InputInterface[]) => [...prev.map((item:InputInterface) => {
    //         return item.hash == input.hash 
    //             ? { ...input, layout }
    //             : item;
    //     })])
    // }

    useEffect(()=>{
        setInputTitle(input.title);
        // setInputSizes({
        //     width : input.layout?.size?.width ?? 100,
        //     height : input.layout?.size?.height ?? 50
        // })
    },[input]);

    return (
        <div className="absolute w-[110%] min-h-full bg-white right-[101%] top-[20%] shadow-md border-[#e5e5e5] border-[2px] rounded-[6px]">
            <p className="text-[13px] text-center font-medium border-[#e5e5e5] border-b-[2px] py-[4px]">
                {" "}
                Manage Input
            </p>
            <div className="mt-[8px] px-[5px]">
                <p className="text-[13px]">Title</p>
                <div className="flex border-[#e5e5e5] border-[2px] rounded-[5px]">
                    <input
                        ref={nameInputRef}
                        name="inputName"
                        className="text-[14px] px-[5px] py-[2px]"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        disabled={!isEditingName}
                    />
                    <button
                        className="w-full cursor-pointer flex justify-center items-center border-[#e5e5e5] border-l-[2px]"
                        onClick={() => {
                            isEditingName && saveInputName();
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
            {/* <div className="mt-[8px] px-[5px]">
                <p className="text-[13px]">Fill </p>
                <div className="flex border-[#e5e5e5] border-[2px] rounded-[5px]">
                    <input
                        name="inputWidth"
                        className="text-[14px] px-[5px] py-[2px]"
                        value={inputSizes.width}
                        onChange={(e) => {saveInputSize({ width : parseFloat(e.target.value) })}}
                    />
                </div>
            </div> */}
        </div>
    );
};

export default InputSideModal;
