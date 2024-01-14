import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { setTextComponentData } from "./dataHandler";

export const handleTextChange = (
  e: any,
  manager: EditorialManagerInterface,
  textValue: string,
  setTextValue: React.Dispatch<React.SetStateAction<string>>,
  viewBoxRef: React.MutableRefObject<any>,
  textareaRowCount: number,
  setTextareaRowCount: React.Dispatch<React.SetStateAction<number>>
) => {
  let textContentValue = e.target.value;

  // Fix problem of undefined content value
  if (e.target.value === undefined && textValue) {
    textContentValue = textValue;
  }

  setTextValue(textContentValue);

  // Using innerHTML to avoid conflict with Text value on content update...
  manager.canvasManager.canvas.functions.updateActiveComponentData(
    setTextComponentData(e.target.innerHTML)
  );

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

export const checkAndReturnOptions = (type: "OBJECTIVE" | "SUBJECTIVE") => {
  if (type === "OBJECTIVE") {
    return [
      {
        answer: false,
        content: "",
        feedback: {
          type: "",
          content: "",
        },
      },
      {
        answer: false,
        content: "",
        feedback: {
          type: "",
          content: "",
        },
      },
    ];
  } else {
    return [
      {
        answer: false,
        content: "",
        feedback: {
          type: "correct",
          content: "",
        },
      },
    ];
  }
};
