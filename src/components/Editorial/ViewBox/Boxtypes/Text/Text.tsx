import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import {  getRange, handleTextChange, resizeBox, removePx, setState, initializeParentTag } from "./handler";
import {
    CurrentStylesState,
    OptionsDataState,
} from "components/Editorial/Base/StateInterface";
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

    const onChange = (event: any) => {
        handleTextChange(event, manager );
        resizeBox(editableRef, viewBoxRef, textareaRowCount, setTextareaRowCount, /*event*/);
        // Wrap in parent paragraph if not present
        initializeParentTag(editableRef);
        
    }

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


    return (
        <div
            id={id}
            className={`flex flex-col justify-between p-1 h-full w-full relative ${
                !isEditable && "handle cursor-move"
            }`}
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
        </div>
    );
};

export default Text;
