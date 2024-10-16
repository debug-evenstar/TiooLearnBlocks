import { CanvasText } from "apps/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import {
    getRange,
    handleTextChange,
    resizeBox,
    removePx,
    initializeParentTag,
    configureTipManager,
} from "./handler";
import { CurrentStylesState } from "apps/Editorial/Base/StateInterface";
import { InputInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import {
    QuestionInterface,
    QuestionTypes,
} from "apps/Editorial/Sidebars/RightSidebar/InactiveSidebar";
import MathInput from "components/MathInput";

const Text: FC<CanvasText> = ({ id, manager, active, data }) => {
    const editableRef = useRef<HTMLDivElement>(null);

    const [textareaRowCount, setTextareaRowCount] = useState(1);
    const [textValue, setTextValue] = useState("");
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
    const [isEditable, setIsEditable] = useState<boolean>(false);

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
        resizeTipBoxes();
    };

    const appendInput = (data: {
        input: InputInterface;
        question: QuestionInterface;
    }) => {
        // Initialize editable if not initialized
        initializeParentTag(editableRef, true);
        const editableChildren = editableRef.current?.children;
        const mainElement = editableChildren?.length
            ? editableChildren[editableChildren.length - 1]
            : null;
        if (mainElement) {
            const input = document.createElement("input");
            input.setAttribute("data-link", "Questions");
            input.setAttribute("data-hash", data.input.hash);
            input.setAttribute("data-question-hash", data.question.hash);
            if (data.question.type === QuestionTypes.Multichoice) {
                input.setAttribute("disabled", "");
            }
            input.className = `w-[90px] relative left-[5px] mr-[10px]
                 bg-white text-[16px] border-[0.5px] border-[#E5E5E5] 
                 rounded-[8px] p-[5px] shadow-md shadow-[inset_0_0_6px_2px_rgba(155,41,178,0.6)]`;
            mainElement.appendChild(input);
            handleTextChange({ target: editableRef.current }, manager);
        }
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
            appendInput({ input: data.input, question: data.question });
            manager.event.emit("linkQuestionInput", {
                questionHash: data.question.hash,
                hash: data.input.hash,
            });
        }
        setIsDraggedOver(false);
    };

    const resizeTipBoxes = () => {
        if (editableRef?.current){
            editableRef.current.querySelectorAll(".tip-text").forEach((node : any) => {
                const text = node.innerText;
                const width = (text.length < 10 ? 100 : (text.length * 7) + 15);
                node.style.width = `${Math.min(width, 300)}px`;
                node.nextSibling.style.width = `${Math.min(width, 300)}px`;
            });
        }
    }

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
        const handleSelectionChange = () => {
            const range = getRange();
            if (range) {
                const element = range.commonAncestorContainer.parentElement;

                if (element) {
                    const styles = getComputedStyle(element);

                    manager.setState(
                        "currentStyles",
                        (prev: CurrentStylesState) => {
                            return {
                                ...prev,
                                ...({
                                    textColor: styles.color,
                                    textSize: removePx(styles.fontSize),
                                    textSpacing: removePx(styles.lineHeight),
                                    font: styles.fontFamily,
                                } as CurrentStylesState),
                            };
                        }
                    );
                }
                //setSelectedText(selectedText);
            } else {
                return;
            }
        };

        document.addEventListener("selectionchange", handleSelectionChange);

        // Receive math input data
        manager.event.listen("insertMath", (data: string) => {
            if (editableRef?.current) {
                editableRef.current.innerHTML = data;
            }
        });

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
                    contentEditable={isEditable && active}
                    onInput={(e) => onChange(e)}
                    onChange={(e) => onChange(e)}
                    dangerouslySetInnerHTML={{ __html: textValue }}
                />
                {isDraggedOver && (
                    <div
                        className="w-full h-full border-[1px] border-gray-400 absolute z-10 -top-[0.5px] -left-[0.5px] rounded-[5px] flex justify-center items-center"
                    >
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
