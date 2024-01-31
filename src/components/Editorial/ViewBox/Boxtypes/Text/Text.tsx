import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import { resizeBox } from "./handlers/wrapperHandler";
import { registerFunctions } from "./handlers/registerFuncsHandlers";
import { useDispatch, useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import {
  handleSetCorrectOption,
  handleSetIdentifier,
  handleSetObjectiveIndex,
  handleSetWrongOption,
} from "provider/optionsDataSlice";
import { handleTextChange } from "./handlers/generalHandler";
import ObjectivesInputs from "../../ObjAndSubInputs/ObjectivesInputs";
import { handleToggleShowOptionBox } from "provider/showOptionsBoxSlice";

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

  const setIdentifier = (identifier : string) => {
    manager.setState("optionsData", (prev: any) => {
      return { ...prev, ...{ identifier } };
    });
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const [textareaRowCount, setTextareaRowCount] = useState(1);
  const [textValue, setTextValue] = useState("");

  const getRange = () => {
    const selection = window.getSelection();
    if (!selection) return;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const viewBox = viewBoxRef.current;
      const textArea = textareaRef.current;
      if (viewBox && !viewBox.contains(event.target as Node) && textArea) {
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
    if (id === activeId) {
      registerFunctions(manager, getRange, viewBoxRef, setIdentifier, id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manager, viewBoxRef, activeId]);

  useEffect(() => {
    const textComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    textComponentData && setTextValue(textComponentData.content);
  }, [id]);

  useEffect(() => {
    resizeBox(editableRef, viewBoxRef, textareaRowCount, setTextareaRowCount);
  }, [
    textareaRowCount,
    viewBoxRef,
    id,
    textValue,
    editableRef.current?.innerHTML,
  ]);

  useEffect(() => {
    if (id === activeId) setIsEditable(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const coreData = manager.canvasManager.activeComponent.data;

  const handleClickedObjective = (
    e: MouseEvent,
    options: string[],
    index: number
  ) => {
    e.stopPropagation();
    handleSetObjectiveIndex(index);
    console.log(index, "clicked, option box");
    manager.setState("showOptionsBox" , (prev : any) => !prev);
    manager.setCorrectOptionState(options[0]);
    manager.setWrongOptionState(options[1]);
  };

  useEffect(() => {
    if (!coreData || !coreData.questions || id !== activeId) return;

    coreData?.questions
      ?.filter((question: any) => question?.identifier?.includes(id))
      .forEach((question: any, i: number) => {
        const inputElement = document.getElementById(question.identifier);
        console.log(inputElement, "FOUND ELEMENT", i);

        if (inputElement) {
          if (question.type === "OBJECTIVE") {
            inputElement.addEventListener("click", (e) =>
              handleClickedObjective(e, question.options, i)
            );
            console.log("added click event to", inputElement);

            return () => {
              if (inputElement) {
                inputElement.removeEventListener("click", (e) =>
                  handleClickedObjective(e, question.options, i)
                );
              }
            };
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coreData, identifier, trigger]);

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
        onInput={(e) =>
          handleTextChange(
            e,
            manager,
            textValue,
            setTextValue,
            viewBoxRef,
            textareaRowCount,
            setTextareaRowCount
          )
        }
        dangerouslySetInnerHTML={{ __html: textValue }}
      />
    </div>
  );
};

export default Text;
