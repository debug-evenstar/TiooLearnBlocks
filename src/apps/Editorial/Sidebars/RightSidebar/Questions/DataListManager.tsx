import { _getManager } from "apps/Editorial/Base/Manager";
import ContentInput from "components/ContentInput";
import React, { FC, useEffect, useRef, useState } from "react";
import {
    FaAngleDown,
    FaAngleUp,
    FaCheckCircle,
    FaEye,
    FaEyeSlash,
    FaPercentage,
    FaPlusCircle,
    FaSquareRootAlt,
    FaTimesCircle,
    FaTrash,
} from "react-icons/fa";
import GlobalResource from "services/api/resources/GlobalResource";
import { onKeyCombination } from "utilities/event";

interface Props {
    title: string;
    data: any;
    setData: Function;
    setActiveItem: Function;
    generateItem: Function;
    onClickItem?: Function;
    bulletIcon?: Function | React.ReactElement;
    bulletAction?: Function;
    richText?: boolean;
    canToggle?: boolean;
    onToggle?: Function;
    toggleStates?: boolean[];
    max?: number;
}

enum DataType {
    TEXT = "text",
    IMAGE = "image",
}

const DataListManager: FC<Props> = ({
    title,
    data,
    setData,
    setActiveItem,
    generateItem,
    onClickItem,
    bulletIcon = () => {},
    bulletAction = () => {},
    richText = false,
    canToggle = false,
    onToggle = () => {},
    toggleStates = [],
    max,
}) => {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
    const [itemType, setItemType] = useState<string>(DataType.TEXT);
    const [isHidden, setIsHidden] = useState<boolean[]>(data.map(() => false));
    const DataTypes: string[] = [...Object.values(DataType)];
    const newItemRef = useRef<any>();
    const manager = _getManager();

    const addNewItem = async () => {
        let title;
        if (itemType === DataType.TEXT) {
            title = newItemRef.current.value;
        } else {
            const formData = new FormData();
            formData.append("image", newItemRef.current.files[0]);
            const uploaded = await GlobalResource.uploadImageMedia(formData);
            title = uploaded.data[0];
        }

        // Create question object :: work in progress
        const item = generateItem(title);
        setIsHidden([...isHidden, false]);
        setData([...data, item]);
        setIsAddingItem(false);
    };

    const deleteData = (item: any) => {
        setIsHidden(isHidden.slice(0, -1));
        setData([...data.filter((d: any, i: number) => d.hash != item.hash)]);
    };

    const titleIsUrl = (title: string) => title.includes("https://");

    const handleMathInput = () => {
        manager.event.emit("togglePlugin", {
            name: "MathInput",
            callback: (mathHtml: string) => {
                newItemRef?.current?.updateValue &&
                    newItemRef?.current?.updateValue(mathHtml, true);
            },
        });
    };

    useEffect(() => {
        if (canToggle) {
            setIsHidden(toggleStates.map((t: boolean) => !t));
        }
        // if (newItemRef.current) {
        //     const element = newItemRef?.current?.current ?? newItemRef?.current; // Handle nested ref
        //     onKeyCombination(element, ['meta','k'], () => {
        //         manager.event.emit("togglePlugin", {
        //             name: "MathInput",
        //             callback: (mathHtml: string) => {
        //                 newItemRef?.current?.updateValue && newItemRef?.current?.updateValue(mathHtml)
        //             },
        //         });
        //     })
        // }
    }, [toggleStates]);

    return (
        <div className="border-b-[2px] border-[#f2f2f2] pb-2">
            <button
                className="w-full h-[30px] flex items-center justify-between px-3 border-b-[1px] border-[#f2f2f2]"
                onClick={() => setIsListOpen(!isListOpen)}
            >
                <p className="text-[14px] text-[#060c2e] text-left">{title}</p>
                {isListOpen ? (
                    <FaAngleUp className="text-lg text-gray-500 cursor-pointer" />
                ) : (
                    <FaAngleDown className="text-lg text-gray-500 cursor-pointer" />
                )}
            </button>
            {isListOpen && (
                <div className="w-full py-2">
                    {data.map((item: any, index: number) => (
                        <div
                            className="w-full px-3 text-[14px] flex items-center justify-between mb-1 hover:bg-[#f1f1f1]"
                            key={item.hash}
                        >
                            <button
                                className="data-item flex items-center grow py-1"
                                onClick={(e) => {
                                    if (
                                        Array.from(
                                            (e.target as HTMLElement).classList
                                        ).includes("data-item")
                                    ) {
                                        onClickItem?.(item);
                                        setActiveItem(item);
                                    }
                                }}
                            >
                                <a onClick={() => bulletAction(item)}>
                                    {typeof bulletIcon === "object" &&
                                        bulletIcon}
                                    {typeof bulletIcon === "function" &&
                                        bulletIcon(item)}
                                </a>
                                {!titleIsUrl(item.title) &&
                                    (richText ? (
                                        <button
                                            dangerouslySetInnerHTML={{
                                                __html: item.title,
                                            }}
                                            onClick={() => setActiveItem(item)}
                                        ></button>
                                    ) : (
                                        item.title
                                    ))}
                                {titleIsUrl(item.title) && (
                                    <button onClick={() => setActiveItem(item)}>
                                        <img
                                            className="max-h-[35px]"
                                            src={item.title}
                                            alt="Item"
                                        />
                                    </button>
                                )}
                            </button>
                            {canToggle && (
                                <>
                                    {isHidden[index] && (
                                        <FaEye
                                            className="text-[14px] text-gray-500 justify-self-end mr-1 cursor-pointer"
                                            onClick={() => {
                                                onToggle(item, true);
                                                setIsHidden((prev: any) => {
                                                    prev[index] = false;
                                                    return [...prev];
                                                });
                                            }}
                                        />
                                    )}
                                    {!isHidden[index] && (
                                        <FaEyeSlash
                                            className="text-[14px] text-gray-500 justify-self-end mr-1 cursor-pointer"
                                            onClick={() => {
                                                onToggle(item, false);
                                                setIsHidden((prev: any) => {
                                                    prev[index] = true;
                                                    return [...prev];
                                                });
                                            }}
                                        />
                                    )}
                                </>
                            )}
                            <FaTrash
                                className="text-[14px] text-red-500 justify-self-end ml-1 cursor-pointer"
                                onClick={() => deleteData(item)}
                            />
                        </div>
                    ))}
                    {isAddingItem && (
                        <div className="w-full h-[75px] px-3">
                            <div className="w-full flex rounded-t-[5px] border-[1px] mb-1">
                                {DataTypes.map(
                                    (type: string, index: number) => (
                                        <button
                                            key={type + index}
                                            className={
                                                "w-1/2 border-[1px] border-[#f2f2f2] capitalize text-[14px] text-[#3c3e42] " +
                                                (itemType === type
                                                    ? "bg-[#f2f2f2]"
                                                    : "")
                                            }
                                            onClick={() => setItemType(type)}
                                        >
                                            {type}
                                        </button>
                                    )
                                )}
                            </div>
                            {itemType === DataType.TEXT &&
                                (!richText ? (
                                    <input
                                        className="w-full h-[32px] border-[1px] border-[#f2f2f2] mr-1 text-[14px] outline-none px-1"
                                        placeholder="Title"
                                        ref={newItemRef}
                                        maxLength={35}
                                    />
                                ) : (
                                    <ContentInput
                                        className="w-full h-[32px] border-[1px] border-[#f2f2f2] mr-1 text-[14px] outline-none px-1"
                                        placeholder="Title"
                                        ref={newItemRef}
                                    />
                                ))}
                            {itemType === DataType.IMAGE && (
                                <input
                                    className="w-full h-[32px] border-[1px] border-[#f2f2f2] mr-1 text-[14px] outline-none px-1"
                                    ref={newItemRef}
                                    type="file"
                                />
                            )}
                            <div className="w-full flex h-[20px] mt-1 justify-between">
                                <FaCheckCircle
                                    className="text-[16px] text-green-500 mr-1 cursor-pointer"
                                    onClick={() => addNewItem()}
                                />
                                <FaSquareRootAlt
                                    className="text-[16px] text-blue-500 mr-1 cursor-pointer"
                                    onClick={() => handleMathInput()}
                                />
                                <FaTimesCircle
                                    className="text-[16px] text-red-500 mr-1 cursor-pointer"
                                    onClick={() => setIsAddingItem(false)}
                                />
                            </div>
                        </div>
                    )}
                    {!isAddingItem && data.length < (max ?? 100) && (
                        <button
                            className="px-3 cursor-pointer text-[14px] flex items-center"
                            onClick={() => setIsAddingItem(true)}
                        >
                            <FaPlusCircle className="text-[15px] text-green-500 mr-1" />{" "}
                            Add New
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default DataListManager;
