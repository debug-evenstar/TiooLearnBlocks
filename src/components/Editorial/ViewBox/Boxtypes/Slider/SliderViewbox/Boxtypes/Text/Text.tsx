import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
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
import { registerFunctions } from "components/Editorial/ViewBox/Boxtypes/Text/handlers/registerFuncsHandlers";
import { resizeBox } from "components/Editorial/ViewBox/Boxtypes/Text/handlers/wrapperHandler";
import {
  CurrentStylesState,
  OptionsDataState,
} from "components/Editorial/Base/StateInterface";
import { removePx } from "components/Editorial/ViewBox/Boxtypes/Text/handlers/generalHandler";

const Text: FC<CanvasText> = ({
  id,
  viewBoxRef,
  manager,
  isEditable,
  setIsEditable,
  data,
}) => {
  const activeId = manager.states.activeViewBox;
  const showOptionsBox = manager.states.showOptionsBox;
  const trigger = manager.states.trigger;
  const { identifier, objectiveIndex } = manager.states.optionsData;

  const setIdentifier = (id: string) => {
    manager.setState("optionsData", (prev: any) => {
      return { ...prev, ...{ identifier: id } };
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
    registerFunctions(
      manager,
      getRange,
      editableRef,
      viewBoxRef,
      setIdentifier,
      id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manager, viewBoxRef, activeId]);

  useEffect(() => {
    setTextValue(data[0].content);
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

  const activeCompIndex = manager.states.slider.activeCompIndex;

  const sliderIndex = manager.canvasManager.activeComponent.data.index;
  const coreData =
    manager.canvasManager.activeComponent.data.components[sliderIndex]?.slides[
      activeCompIndex
    ][0];

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
    if (!coreData || !coreData.questions || !activeId.includes("Slider"))
      return;

    coreData?.questions
      //?.filter((question: any) => question?.identifier?.includes(id))
      .forEach((question: any, i: number) => {
        const inputElement = document.getElementById(question.identifier);

        if (inputElement) {
          if (question.type === "OBJECTIVE") {
            inputElement.addEventListener("click", (e) =>
              handleClickedObjective(e, question.options, i)
            );

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
  }, [coreData, identifier]);

  useEffect(() => {
    const handleSelectionChange = () => {
      const range = getRange();
      if (range) {
        const element = range.commonAncestorContainer.parentElement;

        if (element) {
          const styles = getComputedStyle(element);

          manager.setState("currentStyles", (prev: CurrentStylesState) => {
            return {
              ...prev,
              ...({
                textColor: styles.color,
                textSize: removePx(styles.fontSize),
                textSpacing: removePx(styles.lineHeight),
                font: styles.fontFamily,
              } as CurrentStylesState),
            };
          });
        }
        //setSelectedText(selectedText);
      } else {
        return;
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
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
    console.log(manager.states.noTextInViewbox, "text or not");
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
