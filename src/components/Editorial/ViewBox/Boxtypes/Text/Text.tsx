import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useEffect, useRef, useState } from "react";

const Text: FC<CanvasText> = ({ id, manager, viewBoxRef }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaRowCount, setTextareaRowCount] = useState(1);
  const [isEditable, setIsEditable] = useState(true);

  const handleTextAreaChange = () => {
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

  return (
    <div
      className={`flex flex-col justify-between p-3 h-full w-full ${
        !isEditable && "handle cursor-move"
      }`}
      onDoubleClick={() => setIsEditable(!isEditable)}
    >
      <textarea
        ref={textareaRef}
        className={`w-full h-auto outline-none resize-none overflow-y-hidden ${
          !isEditable && "cursor-move"
        }`}
        placeholder="Add text"
        onChange={handleTextAreaChange}
        disabled={!isEditable}
      />
    </div>
  );
};

export default Text;
