import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import { toggleWrapper } from "./handlers/wrapperHandler";

const Text: FC<CanvasText> = ({ id, viewBoxRef, manager }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const [textareaRowCount, setTextareaRowCount] = useState(1);
  const [isEditable, setIsEditable] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [content, setContent] = useState("");

  const handleTextChange = (e: any) => {
    const textValue = e.target.value;
    setTextValue(textValue);

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

  const handleSetContent = () => {
    const editable = editableRef.current;

    if (!editable) return;
    setContent(editable.innerHTML);
    console.log(content);
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
    manager.canvasManager.activeComponent.functions["toggleWrapper"] = (
      elementType: string,
      style: string = "",
      link: string = ""
    ) => {
      const range = getRange();
      range &&
        range.toString() &&
        toggleWrapper(range, elementType, style, link);
      handleSetContent();
    };

    manager.canvasManager.activeComponent.functions["toggleWrapperStyle"] = (
      style: string = ""
    ) => {
      handleSetContent();
    };
  }, [manager]);

  return (
    <div
      id={id}
      className={`flex flex-col justify-between p-3 h-full w-full ${
        !isEditable && "handle cursor-move"
      }`}
      onDoubleClick={() => setIsEditable(!isEditable)}
    >
      <div
        ref={editableRef}
        className={`w-full outline-none resize-none overflow-y-hidden no-scrollbar ${
          !isEditable && "cursor-move"
        }`}
        contentEditable={isEditable}
        onInput={handleTextChange}
      >
        {textValue}
      </div>
    </div>
  );
};

export default Text;
