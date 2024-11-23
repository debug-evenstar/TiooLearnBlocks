import { CanvasText } from "apps/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import {
    getRange,
    handleTextChange,
    resizeBox,
    removePx,
    initializeParentTag,
    configureTipManager,
    resizeTipBoxes,
    handleSelectionChange,
    setCursorPosition,
    appendInput,
} from "./handler";
import { CurrentStylesState } from "apps/Editorial/Base/StateInterface";
import { InputInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import {
    QuestionInterface,
    QuestionTypes,
} from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";

const Text: FC<CanvasText> = ({ id, manager, active, data }) => {
    const editableRef = useRef<HTMLDivElement>(null);

    const [textareaRowCount, setTextareaRowCount] = useState(1);
    const [textValue, setTextValue] = useState("");
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [lastCursorPosition, setLastCursorPosition] = useState<number>(0);

    const onChange = (event: any) => {
        handleTextChange(event, manager);
        // resizeBox(
        //     editableRef,
        //     viewBoxRef,
        //     textareaRowCount,
        //     setTextareaRowCount /*event*/
        // );

        // Wrap in parent paragraph if not present
        initializeParentTag(editableRef);
        // Handle tool tip resizing
        resizeTipBoxes(editableRef?.current);
    };

    const handleDragOver = (event: any, status: boolean) => {
        const element = event.target;
        const isDragAreaElement = () => element.getAttribute("id") == id;
        if (isDragAreaElement()) {
            status && element.classList.add("no-pointer");
            !status && element.classList.remove("no-pointer");
        }
        setIsDraggedOver(status);
    };

    const handleDrop = (e: any) => {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        if (data.type === "question.input") {
            manager.event.emit("linkQuestionInput", {
                questionHash: data.question.hash,
                hash: data.input.hash,
            });
            appendInput(
                { input: data.input, question: data.question },
                editableRef
            );
        }
        setIsDraggedOver(false);
    };

    useEffect(() => {
        const textComponentData =
            manager.canvasManager.canvas.getComponentData(id);
        textComponentData &&
            textComponentData.content &&
            setTextValue(textComponentData.content);
    }, [id]);

    useEffect(() => {
        if (isEditable) {
            // resizeBox(
            //     editableRef,
            //     viewBoxRef,
            //     textareaRowCount,
            //     setTextareaRowCount
            // );
        }
    }, [textareaRowCount, id, textValue, editableRef.current?.innerHTML]);

    useEffect(() => {
        // Receive math input data
        manager.event.listen("insertMath", (data: string) => {
            if (editableRef?.current) {
                editableRef.current.innerHTML = data;
            }
        });

        document.addEventListener("selectionchange", handleSelectionChange);

        return () => {
            document.removeEventListener(
                "selectionchange",
                handleSelectionChange
            );
        };
    }, []);

    useEffect(() => {
        if (textValue) {
            if (textValue && textValue.length < 1) {
                manager.setState("noTextInViewbox", true);
            } else {
                manager.setState("noTextInViewbox", false);
            }
        }
    }, [textValue]);

    useEffect(() => {
        manager.event.listen("unlinkInput", (data: any) => {
            try {
                const newEditableNode = editableRef?.current?.cloneNode(
                    true
                ) as HTMLElement;
                if (newEditableNode) {
                    const inputField = newEditableNode.querySelector(
                        `input[data-hash='${data.hash}']`
                    );
                    if (inputField) {
                        inputField?.parentElement?.removeChild(inputField);
                        if (editableRef?.current) {
                            editableRef.current.innerHTML =
                                newEditableNode.innerHTML;
                        }
                        onChange({ target: newEditableNode.innerHTML });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    }, []);

    useEffect(() => {
        configureTipManager(editableRef?.current);
    }, [id]);

    useEffect(() => {
        !active && setIsEditable(false);
    }, [active]);

    return (
        <>
            <div
                id={id}
                className={`flex flex-col justify-between p-1 h-full w-full relative border-2 border-[#F8F7F7] ${
                    (!isEditable || !active) && "handle cursor-move"
                }`}
                onDragEnter={(e) => handleDragOver(e, true)}
                onDragLeave={(e) => handleDragOver(e, false)}
                onDrop={handleDrop}
                onDoubleClick={() => setIsEditable(!isEditable)}
            >
                <div
                    ref={editableRef}
                    className={`editable-text w-full h-full outline-none resize-none no-scrollbar ${
                        (!isEditable || !active) && "cursor-move"
                    }`}
                    data-cursor-position={lastCursorPosition}
                    contentEditable={isEditable && active}
                    onInput={(e) => onChange(e)}
                    onChange={(e) => onChange(e)}
                    onClick={(e) =>
                        !!(isEditable && active) &&
                        setCursorPosition(e.target, setLastCursorPosition)
                    }
                    dangerouslySetInnerHTML={{ __html: textValue }}
                />
                {isDraggedOver && (
                    <div className="w-full h-full border-[1px] border-gray-400 absolute z-10 -top-[0.5px] -left-[0.5px] rounded-[5px] flex justify-center items-center pointer-events-none">
                        <div className="bg-gray-100 opacity-[95%] w-full h-full rounded-[5px] absolute"></div>
                        <div className="text-[13px] text-gray-500 bg-gray-300 relative p-[5px] border-[1px] border-gray-200">
                            Link to Text
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Text;
