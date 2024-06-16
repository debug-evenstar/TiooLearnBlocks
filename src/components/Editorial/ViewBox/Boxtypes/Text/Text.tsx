import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import { registerFunctions } from "./handlers/registerFuncsHandlers";
import { handleSetObjectiveIndex } from "provider/optionsDataSlice";
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
    const showOptionsBox = manager.states.showOptionsBox;
    const trigger = manager.states.trigger;
    const { identifier, objectiveIndex } = manager.states.optionsData;

    const setIdentifier = (identifier: string) => {
        manager.setState("optionsData", (prev: any) => {
            return { ...prev, ...{ identifier } };
        });
    };

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

    const coreData = manager.canvasManager.activeComponent.data;

    const handleClickedObjective = (
        e: MouseEvent,
        options: string[],
        index: number
    ) => {
        e.stopPropagation();
        handleSetObjectiveIndex(index);
        manager.setState("showOptionsBox", (prev: any) => !prev);
        manager.setState("optionsData", (prev: OptionsDataState) => ({
            ...prev,
            ...({
                wrongOption: options[0],
                correctOption: options[1],
            } as OptionsDataState),
        }));
    };

    useEffect(() => {
        if (!coreData || !coreData.questions || id !== activeId) return;

        coreData?.questions
            ?.filter((question: any) => question?.identifier?.includes(id))
            .forEach((question: any, i: number) => {
                const inputElement = document.getElementById(
                    question.identifier
                );

                if (inputElement) {
                    if (question.type === "OBJECTIVE") {
                        inputElement.addEventListener("click", (e) =>
                            handleClickedObjective(e, question.options, i)
                        );

                        return () => {
                            if (inputElement) {
                                inputElement.removeEventListener("click", (e) =>
                                    handleClickedObjective(
                                        e,
                                        question.options,
                                        i
                                    )
                                );
                            }
                        };
                    }
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coreData, identifier, trigger]);

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
