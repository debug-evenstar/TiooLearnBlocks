import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";

const Text: FC<CanvasText> = ({ id, viewBoxRef, manager }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaRowCount, setTextareaRowCount] = useState(2);
  const [isEditable, setIsEditable] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [content, setContent] = useState("");

  const handleTextAreaChange = (value: string) => {
    setTextValue(value);

    const viewBox = viewBoxRef.current;
    const textArea = textareaRef.current;

    if (viewBox && textArea) {
      const height = textArea.scrollHeight;
      const lineHeight = parseFloat(
        window.getComputedStyle(textArea).lineHeight
      );
      const numberOfRows = Math.floor(height / lineHeight);

      textArea.style.height = "auto";
      textArea.style.height = textArea.scrollHeight + "px";

      if (numberOfRows > textareaRowCount) {
        setTextareaRowCount(numberOfRows);
        const heightDifference = lineHeight * (numberOfRows - textareaRowCount);
        const newHeight = viewBox.offsetHeight + heightDifference;
        viewBox.style.height = newHeight + "px";
      }
    }
  };

  useEffect(()=>{
    // Call the handler to register the functions
    manager.canvasManager.activeComponent.functions["boldenText"] = () => {
      console.log("Someething");
    }
  },[]);

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

  const handleTextChange = (e: any) => {
    const textValue = e.target.value;
    setTextValue(textValue);

    const editableDiv = e.target as HTMLElement; // Get a reference to the editable div

    // Adjust the div's height based on its content:
    editableDiv.style.height = "auto";
    editableDiv.style.height = editableDiv.scrollHeight + "px";

    // Recalculate the viewBox height if needed:
    const viewBox = viewBoxRef.current;
    if (viewBox) {
      const heightDifference = editableDiv.scrollHeight - viewBox.offsetHeight;
      if (heightDifference > 0) {
        viewBox.style.height = viewBox.offsetHeight + heightDifference + "px";
      }
    }
  };

  const editableRef = useRef<HTMLDivElement>(null);

  const handleSetContent = () => {
    const editable = editableRef.current;

    if (!editable) return;
    setContent(editable.innerHTML);
    console.log(content);
  };

  const toggleBold = () => {
    const selection = window.getSelection();
    if (!selection) return;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      console.log(range, "the range");
      const boldElement = document.createElement("b");
      range.surroundContents(boldElement);
    }
    handleSetContent();
  };

  const toggleBolden = (range: Range) => {
    const boldElement = document.createElement("b");
    range.surroundContents(boldElement);

    handleSetContent();
  };

  const boldRange = () => {
    const selection = window.getSelection();
    if (!selection) return;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range;
    }
  };

  const toggleItalic = () => {
    const selection = window.getSelection();
    if (!selection) return;
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const italicElement = document.createElement("i");
      range.surroundContents(italicElement);
    }
    handleSetContent();
    console.log("text was bolded");
  };

  useEffect(() => {
    manager.canvasManager.activeComponent.functions["toggleBold"] = (
      range: Range
    ) => {
      toggleBolden(range);
    };
    manager.canvasManager.activeComponent.data["boldRange"] = boldRange();
  }, [manager, boldRange]);

  return (
    <div
      id={id}
      className={`flex flex-col justify-between p-3 h-full w-full ${
        !isEditable && "handle cursor-move"
      }`}
      onDoubleClick={() => setIsEditable(!isEditable)}
    >
      <button onClick={toggleBold}>toggleBold</button>
      <button onClick={() => manager.sidebarManager.functions?.toggleBold()}>
        toggleItalic
      </button>
      <div
        ref={editableRef}
        className={`w-full h-auto outline-none resize-none overflow-y-hidden no-scrollbar ${
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
