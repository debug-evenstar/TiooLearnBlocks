import { CanvasText } from "components/Editorial/interfaces";
import React, { FC, useRef, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const Text: FC<CanvasText> = ({ id, viewBoxRef }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaRowCount, setTextareaRowCount] = useState(1);

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

  return (
    <div className="handle flex flex-col justify-between p-3 h-full w-full cursor-move">
      <textarea
        ref={textareaRef}
        className="w-full h-auto mb-5 outline-none resize-none overflow-y-hidden"
        placeholder="Add text"
        onChange={handleTextAreaChange}
      />
    </div>
  );
};

export default Text;
