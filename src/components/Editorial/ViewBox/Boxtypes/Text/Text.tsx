import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  addTooltip,
  replaceContent,
  toggleWrapper,
} from "./handlers/wrapperHandler";
import { toggleWrapperStyle } from "./handlers/stylesHandler";
import { setTextComponentData } from "./handlers/dataHandler";

const Text: FC<CanvasText> = ({ id, viewBoxRef, manager }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const [textareaRowCount, setTextareaRowCount] = useState(1);
  const [isEditable, setIsEditable] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [content, setContent] = useState("");

  const handleTextChange = (e: any) => {
    let textContentValue = e.target.value;


    // Fix problem of undefined content value
    if(e.target.value === undefined && textValue){
      textContentValue = textValue;
    }

    setTextValue(textContentValue);

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
    const handleSetContent = () => {
      const editable = editableRef.current;

      if (!editable) return;
      setContent(editable.innerHTML);
    };

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
      style: string = "",
      styleType: string
    ) => {
      const element = editableRef.current;
      if (!element) return;
      toggleWrapperStyle(element, style, styleType);
      handleSetContent();
    };

    manager.canvasManager.activeComponent.functions["toggleTextStyle"] = (
      style: string = "",
      styleType: string
    ) => {
      const range = getRange();

      if (range && range.toString() && range.startOffset !== range.endOffset) {
        toggleWrapper(range, "span", style, "");
        return;
      }

      const element = viewBoxRef.current;
      if (!element) return;
      toggleWrapperStyle(element, style, styleType);
    };

    manager.canvasManager.activeComponent.functions["replaceContent"] = () => {
      const range = getRange();
      range && range.toString() && replaceContent(range);
      console.log("replace called!");
      handleSetContent();
    };

    manager.canvasManager.activeComponent.functions["addTooltip"] = (
      tip: string
    ) => {
      const range = getRange();
      range && range.toString() && addTooltip(range, tip);

      handleSetContent();
    };
  }, [manager, content, viewBoxRef]);

  useEffect(()=>{
    const textComponentData = manager.canvasManager.canvas.functions.getComponentData(id);
    textComponentData && setTextValue(textComponentData.content);
  },[id])

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
        className={`w-full h-full outline-none resize-none no-scrollbar ${
          !isEditable && "cursor-move"
        }`}
        contentEditable={isEditable}
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{__html : textValue}}
      />
    </div>
  );
};

export default Text;
