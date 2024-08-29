import { CanvasText } from "apps/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import {
    getRange,
    handleTextChange,
    resizeBox,
    removePx,
    setState,
    initializeParentTag,
} from "./handler";
import {
    CurrentStylesState,
    OptionsDataState,
} from "apps/Editorial/Base/StateInterface";
import { text } from "stream/consumers";

const Text: FC<CanvasText> = ({
    id,
    viewBoxRef,
    manager,
    isEditable,
    setIsEditable,
}) => {
    const activeId = manager.states.activeViewBox;

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const editableRef = useRef<HTMLDivElement>(null);

    const [textareaRowCount, setTextareaRowCount] = useState(1);
    const [textValue, setTextValue] = useState("");
    const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

    const onChange = (event: any) => {
        handleTextChange(event, manager);
        resizeBox(
            editableRef,
            viewBoxRef,
            textareaRowCount,
            setTextareaRowCount /*event*/
        );
        // Wrap in parent paragraph if not present
        initializeParentTag(editableRef);
    };

    const appendInput = (data: any) => {
        // Initialize editable if not initialized
        initializeParentTag(editableRef, true);
        const editableChildren = editableRef.current?.children;
        const mainElement = editableChildren?.length
            ? editableChildren[editableChildren.length-1]
            : null;
        if (mainElement) {
            const input = document.createElement("input");
            input.setAttribute("data-link", "Questions");
            input.setAttribute("data-hash", data.hash);
            input.setAttribute("data-question-hash", data.questionHash);
            input.className =
                `w-[90px] relative left-[5px] mr-[10px]
                 bg-white text-[14px] border-[2px] border-[#E5E5E5] 
                 rounded-[10px] p-[5px] shadow-md`;
            mainElement.appendChild(input);
            handleTextChange({ target : editableRef.current }, manager);
        }
    };

    const handleDrop = (e: any) => {
        const data = e.dataTransfer.getData("text/plain");
        const parseData = data.split(".");
        if (parseData[0] == "Questions" && parseData[2] == "input") {
            appendInput({ hash: parseData[3], questionHash: parseData[1] });
            manager.event.emit("linkQuestionInput", {
                questionHash :  parseData[1],
                hash : parseData[3]
            });
        }
        setIsDraggedOver(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const viewBox = viewBoxRef.current;
            const textArea = textareaRef.current;
            if (
                viewBox &&
                !viewBox.contains(event.target as Node) &&
                textArea
            ) {
                setIsEditable(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditable, viewBoxRef, textareaRef]);

    useEffect(() => {
        const textComponentData =
            manager.canvasManager.canvas.getComponentData(id);
        textComponentData &&
            textComponentData.content &&
            setTextValue(textComponentData.content);
    }, [id]);

    useEffect(() => {
        resizeBox(
            editableRef,
            viewBoxRef,
            textareaRowCount,
            setTextareaRowCount
        );
    }, [
        textareaRowCount,
        viewBoxRef,
        id,
        textValue,
        editableRef.current?.innerHTML,
    ]);

    useEffect(() => {
        if (id === activeId) {
            setIsEditable(true);
            setState("editableTextRef", editableRef);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId]);

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
        manager.event.listen("unlinkInput", (data : any) => {
            try{
                const inputField = document.querySelector(`input[data-hash=${data.hash}]`);
                inputField && inputField?.parentElement?.removeChild(inputField);
            } catch(error) {console.log(error)}

        })
    },[manager]);

    return (
        <div
            id={id}
            className={`flex flex-col justify-between p-1 h-full w-full relative ${
                !isEditable && "handle cursor-move"
            }`}
            onDragEnter={(e) => setIsDraggedOver(true)}
            onDragOver={(e) => setIsDraggedOver(true)}
            onDragLeave={(e) => setIsDraggedOver(false)}
            onDrop={handleDrop}
            onDoubleClick={() => setIsEditable(!isEditable)}
        >
            <div
                ref={editableRef}
                className={`w-full h-full outline-none resize-none no-scrollbar ${
                    !isEditable && "cursor-move"
                }`}
                contentEditable={isEditable}
                onInput={(e) => onChange(e)}
                onChange={(e) => onChange(e)}
                dangerouslySetInnerHTML={{ __html: textValue }}
            />
            {isDraggedOver && (
                <div className="w-full h-full border-[1px] border-gray-400 absolute z-10 -top-[0.5px] -left-[0.5px] rounded-[5px] flex justify-center items-center">
                    <div className="bg-gray-100 opacity-[95%] w-full h-full rounded-[5px] absolute"></div>
                    <div className="text-[13px] text-gray-500 bg-gray-300 relative p-[5px] border-[1px] border-gray-200">
                        Link to Text
                    </div>
                </div>
            )}
        </div>
    );
};

export default Text;
