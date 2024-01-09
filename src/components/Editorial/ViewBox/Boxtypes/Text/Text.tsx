import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import { resizeBox } from "./handlers/wrapperHandler";
import { registerFunctions } from "./handlers/registerFuncsHandlers";
import { useDispatch, useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import {
  handleSetCorrectOption,
  handleSetWrongOption,
} from "provider/optionsDataSlice";
import { handleTextChange } from "./handlers/generalHandler";

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
  const { correctOption, wrongOption } = selector.payload.optionsData.value as {
    correctOption: string;
    wrongOption: string;
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
    registerFunctions(manager, getRange, editableRef, viewBoxRef);
  }, [manager, viewBoxRef]);

  useEffect(() => {
    const textComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    textComponentData && setTextValue(textComponentData.content);
  }, [id]);

  useEffect(() => {
    resizeBox(editableRef, viewBoxRef, textareaRowCount, setTextareaRowCount);
  }, [textareaRowCount, viewBoxRef, id, textValue]);

  return (
    <>
      <div
        id={id}
        className={`flex flex-col justify-between p-3 h-full w-full ${
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

      {showOptionsBox && activeId === id && (
        <div className="w-full flex justify-around gap-2">
          <input
            className="border border-black w-20 p-2"
            type="text"
            placeholder="Correct"
            value={correctOption}
            onChange={(e) => dispatch(handleSetCorrectOption(e.target.value))}
          />
          <input
            className="border border-black w-20 p-2"
            type="text"
            placeholder="Wrong"
            value={wrongOption}
            onChange={(e) => dispatch(handleSetWrongOption(e.target.value))}
          />
        </div>
      )}
    </>
  );
};

export default Text;
