import { CanvasText } from "components/Editorial/interfaces";
import React, {
  FC,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { replaceContent, resizeBox } from "./handlers/wrapperHandler";
import { registerFunctions } from "./handlers/registerFuncsHandlers";
import { useDispatch, useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import {
  handleSetCorrectOption,
  handleSetWrongOption,
} from "provider/optionsDataSlice";

const Text: FC<CanvasText> = ({ id, viewBoxRef, manager }) => {
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
  const [isEditable, setIsEditable] = useState(true);
  const [textValue, setTextValue] = useState("");

  // Move into a handler later
  const handleTextChange = (e: any) => {
    let textContentValue = e.target.value;

    // Fix problem of undefined content value
    if (e.target.value === undefined && textValue) {
      textContentValue = textValue;
    }

    setTextValue(textContentValue);

    // Using innerHTML to avoid conflict with Text value on content update...
    manager.canvasManager.canvas.functions.updateActiveComponentData({
      content : e.target.innerHTML
    });

    const editableDiv = e.target as HTMLElement;

    const lineHeight = parseFloat(
      window.getComputedStyle(editableDiv).lineHeight
    );
    const numberOfRows = Math.floor(editableDiv.scrollHeight / lineHeight);

    editableDiv.style.height = "auto";
    editableDiv.style.height = editableDiv.scrollHeight + "px";

    const viewBox = viewBoxRef.current;
    if (viewBox) {
      if (numberOfRows > textareaRowCount) {
        setTextareaRowCount(numberOfRows);
        const heightDifference = lineHeight * (numberOfRows - textareaRowCount);
        const newHeight = viewBox.offsetHeight + heightDifference;
        viewBox.style.height = newHeight + "px";
      }
    }
  };

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
    registerFunctions(
      manager,
      getRange,
      editableRef,
      viewBoxRef
    );
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
          onInput={handleTextChange}
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
