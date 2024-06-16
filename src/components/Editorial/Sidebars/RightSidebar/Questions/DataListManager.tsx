import React, { FC, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaAngleDown, FaAngleUp, FaCheckCircle, FaPlusCircle, FaQuestionCircle, FaTimesCircle, FaTrash } from "react-icons/fa";

interface Props {
    title : string;
    data : any;
    setData : Function;
    setActiveItem : Function;
    generateItem : Function;
    bulletIcon? : Function;
}

const DataListManager: FC<Props> = ({
    title,
    data,
    setData,
    setActiveItem,
    generateItem,
    bulletIcon = () => {}
}) => {

  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const newItemRef = useRef<any>();

  const addNewItem = () => {
    const title = newItemRef.current.value;
    // Create question object :: work in progress
    const item = generateItem(title);
    setData((prev:any) => [...prev, item]);
    setIsAddingItem(false);
}

  const deleteData = (item : any) => {
    setData((prev : any) => [...prev.filter((d:any,i:number) => d.hash != item.hash)]);
  }

  return (
    <div className="border-b-[2px] border-[#f2f2f2]">
        <button 
            className="w-full h-[30px] flex items-center justify-between px-3 border-b-[1px] border-[#f2f2f2]"
            onClick={() => setIsListOpen(!isListOpen)}
        >
            <p className="text-[14px] text-[#060c2e] text-left">
                {title}
            </p>
            {isListOpen 
                ? <FaAngleUp className="text-lg text-gray-500 cursor-pointer"/>
                : <FaAngleDown className="text-lg text-gray-500 cursor-pointer"/>
            }
        </button>
        { isListOpen && <div className="w-full py-2">
            {
                data.map((item : any)=> (
                    <div 
                        className="w-full px-3 text-[14px] flex items-center justify-between mb-1 hover:bg-[#f1f1f1]" 
                        key={item.hash}
                    >
                        <button 
                            className="flex items-center grow py-1"
                            onClick={() => {
                                setActiveItem(item);
                            }}
                        >
                            {bulletIcon && bulletIcon()} 
                            {item.title}
                        </button>
                        <FaTrash className="text-[14px] text-red-500 justify-self-end ml-1 cursor-pointer" onClick={() => deleteData(item)}/>
                    </div>
                ))
            }
            {isAddingItem && 
                <div className="w-full h-[50px] px-3">
                    <input 
                        className="w-full h-[32px] border-[1px] border-[#f2f2f2] mr-1 text-[14px] outline-none px-1"
                        placeholder="Title"
                        ref={newItemRef}
                        maxLength={35}
                    />
                    <div className="w-full flex h-[20px] mt-1 justify-between">
                        <FaCheckCircle className="text-[16px] text-green-500 mr-1 cursor-pointer" onClick={() => addNewItem()}/>
                        <FaTimesCircle className="text-[16px] text-red-500 mr-1 cursor-pointer" onClick={() => setIsAddingItem(false)}/>
                    </div>

                </div>
            }
            {!isAddingItem && 
                <button 
                    className="px-3 cursor-pointer text-[14px] flex items-center"
                    onClick={() => setIsAddingItem(true)}
                >
                    <FaPlusCircle
                        className="text-[15px] text-green-500 mr-1"
                    /> Add New
                </button>
            }
        </div>}
    </div>
  );
};

export default DataListManager;
