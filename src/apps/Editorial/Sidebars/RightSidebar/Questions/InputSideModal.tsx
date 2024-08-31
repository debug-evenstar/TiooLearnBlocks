import React, { FC, createRef, useEffect, useState } from "react";
import { FaCheckCircle, FaEdit, FaPencilAlt, FaStar } from "react-icons/fa";
import { ComponentLayoutInterface } from "components/interface";
import { InputInterface, InputLinkedStates } from "./ActiveQuestion";
import { _getManager, setComponentLayout } from "apps/Editorial/Base/Manager";

interface Props {
    input: InputInterface;
    setInputs: Function;
    closeModal : Function;
}

const InputSideModal: FC<Props> = ({ input, setInputs, closeModal}) => {
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const nameInputRef: React.RefObject<any> = createRef();
    const [inputTitle , setInputTitle] = useState<string>(input.title);
    // const [inputSizes, setInputSizes] = useState<any>({
    //     width : input.layout?.size?.width ?? 100,
    //     height : input.layout?.size?.height ?? 50
    // })
    const manager = _getManager();

    const updateInputData = (data : any) => {
        setInputs((prev : InputInterface[]) => prev.map((item:InputInterface) => {
            return item.hash == input.hash 
                ? { ...input, ...data}
                : item;
        }));
    }
    const saveInputName = () => {
        updateInputData({title : nameInputRef.current.value ?? input.title})
    };

    const inputState = () => ({
        isLinked :  input.linkState == InputLinkedStates.Linked,
        pendingLink : input.linkState == InputLinkedStates.PendingLink,
        isUnlinked : !input.linkState || input.linkState == InputLinkedStates.Unlinked
    });

    const linkButtonStyle = () => {
        return inputState().isUnlinked 
            ? `bg-green-500 text-white` :
            inputState().pendingLink ? `bg-[#d5d5d5] text-gray-500` 
                : `bg-red-400 text-white`;
    }

    const handleLinkInput = (event : any) => {
        const newState = inputState().isUnlinked ? InputLinkedStates.PendingLink 
        : inputState().isLinked ? InputLinkedStates.Unlinked : input.linkState;
        updateInputData({ linkState : newState});
        if (newState == InputLinkedStates.Unlinked) {
            manager.event.emit("unlinkInput", { hash : input.hash });
        }
        setTimeout(() => {
            closeModal();
        },300);
    }

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
    },[input]);

    return (
        <div className="absolute w-[110%] min-h-[300px] bg-white right-[101%] top-[20%] shadow-md border-[#e5e5e5] border-[2px] rounded-[6px]">
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
                        className="w-[80%] text-[14px] px-[5px] py-[2px]"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                        disabled={!isEditingName}
                    />
                    <button
                        className="w-[20%] cursor-pointer flex justify-center items-center border-[#e5e5e5] border-l-[2px]"
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
            <div className="mt-[8px] px-[5px]">
                <button className={"w-full p-2 rounded-[10px] text-[14px] " + linkButtonStyle()} onClick={handleLinkInput}>
                    {(inputState().isUnlinked) && "Link Input"}
                    {(inputState().pendingLink) && "Awaiting Input Link"}
                    {(inputState().isLinked) && "Unlink Input"}
                </button>
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
