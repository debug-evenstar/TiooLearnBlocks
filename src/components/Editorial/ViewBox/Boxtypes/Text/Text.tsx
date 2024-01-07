import { CanvasText } from "components/Editorial/interfaces";
import React, {
  FC,
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { resizeBox } from "./handlers/wrapperHandler";
import { registerFunctions } from "./handlers/registerFuncsHandlers";

const Text: FC<CanvasText> = ({ id, viewBoxRef, manager }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  const [textareaRowCount, setTextareaRowCount] = useState(1);
  const [isEditable, setIsEditable] = useState(true);
  const [textValue, setTextValue] = useState("");
  const [content, setContent] = useState("");

  const handleTextChange = (e: FormEvent<HTMLDivElement>) => {
    if (!e.currentTarget.nodeValue) return;
    setTextValue(e.currentTarget.nodeValue);

    resizeBox(editableRef, viewBoxRef, textareaRowCount, setTextareaRowCount);
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

    registerFunctions(
      manager,
      getRange,
      handleSetContent,
      editableRef,
      viewBoxRef
    );
  }, [manager, content, viewBoxRef]);

  useEffect(() => {
    const textComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    textComponentData && setTextValue(textComponentData.content);
  }, [id]);

  useEffect(() => {
    resizeBox(editableRef, viewBoxRef, textareaRowCount, setTextareaRowCount);
  }, [textareaRowCount, viewBoxRef, id, textValue]);

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
        dangerouslySetInnerHTML={{ __html: textValue }}
      />
    </div>
  );
};

export default Text;
