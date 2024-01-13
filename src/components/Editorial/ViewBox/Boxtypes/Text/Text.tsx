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
import ContentEditableDiv from "components/ContentEditableDiv";
import {
  handleToggleShowOptionBox,
  refreshToggleShowOptionBox,
} from "provider/showOptionsBoxSlice";
import { associatedData } from "../../ObjAndSubInputs/handler";
import Feedback from "components/Editorial/Sidebars/RightSidebar/EditProperties/Extensions/Feedback";

const Text: FC<CanvasText> = ({
  id,
  viewBoxRef,
  manager,
  isEditable,
  setIsEditable,
}) => {
  const dispatch = useDispatch();

  const selector: any = useSelector(refreshToggleSidebarState);
  const activeId: string = selector.payload.activeViewbox.value;
  const showOptionsBox: boolean = selector.payload.showOptionsBox.value;
  const { identifier, objectiveIndex } = selector.payload.optionsData.value as {
    identifier: string;
    objectiveIndex: number;
  };

  const setIdentifier = (id: string) => {
    dispatch(handleSetIdentifier(id));
    console.log(id, "the id");
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
  }, [isEditable, viewBoxRef, textareaRef]);

  useEffect(() => {
    if (id === activeId) {
      registerFunctions(manager, getRange, viewBoxRef, setIdentifier, id);
    }
  }, [manager, viewBoxRef, activeId]);

  useEffect(() => {
    const textComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    textComponentData && setTextValue(textComponentData.content);
  }, [id]);

  useEffect(() => {
    resizeBox(editableRef, viewBoxRef, textareaRowCount, setTextareaRowCount);
  }, [textareaRowCount, viewBoxRef, id, textValue]);

  const coreData = manager.canvasManager.activeComponent.data.coreData;

  const handleClickedObjective = (options: string[], index: number) => {
    handleSetObjectiveIndex(index);
    console.log("clicked");
    dispatch(handleToggleShowOptionBox());
    dispatch(handleSetCorrectOption(options[0]));
    dispatch(handleSetWrongOption(options[1]));
  };

  const handleSubjectiveChange = (e: any) => {
    console.log("typing..");

    const value = e.target.innerText;
    manager.canvasManager.canvas.functions.updateObjectiveData(
      {
        answers: [value],
      },
      0
    );
    manager.canvasManager.canvas.functions.updateObjectiveOption(
      value,
      objectiveIndex,
      0
    );
    console.log(coreData);
  };

  useEffect(() => {
    if (!coreData) return;
    if (coreData?.questions && id === activeId) {
      const editable = editableRef.current;
      if (!editable) return;

      coreData?.questions?.forEach((question: any, i: number) => {
        if (question?.identifier.includes(id)) {
          const inputElement = document.getElementById(question.identifier);
          console.log(inputElement, "FOUND ELEMENT");

          if (inputElement) {
            if (question.type === "OBJECTIVE") {
              inputElement.addEventListener("click", () =>
                handleClickedObjective(question.options, i)
              );
              console.log("added click event to", inputElement);

              return () => {
                if (inputElement) {
                  inputElement.removeEventListener("click", () =>
                    handleClickedObjective(question.options, i)
                  );
                }
              };
            }

            if (question.type === "SUBJECTIVE") {
              inputElement.addEventListener("input", handleSubjectiveChange);
              console.log("added click event to objective", inputElement);

              return () => {
                if (inputElement) {
                  inputElement.removeEventListener(
                    "input",
                    handleSubjectiveChange
                  );
                }
              };
            }
          }
        }
      });
    }
  }, [coreData, activeId, identifier]);

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

      {showOptionsBox && activeId === id && (
        <ObjectivesInputs manager={manager} />
      )}
    </div>
  );
};

export default Text;
