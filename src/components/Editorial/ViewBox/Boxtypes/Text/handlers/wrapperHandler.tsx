import ToolTipComponent from "components/extensions/ToolTip/render";
import ReactDOM from "react-dom";

const positions = ["left", "right", "center", "justify"];

const checkersForToggleWrapper = (
  elementType: string,
  element: HTMLElement,
  style: string,
  styleType: string,
  link: string
) => {
  if (elementType === "span") {
    if (styleType === "line") {
      element.style.textDecoration = style;
    }

    if (styleType === "font") {
      element.style.fontFamily = style;
    }

    if (styleType === "font-size") {
      element.style.fontSize = style + "px";
    }

    element.style.color = style;
  }

  if (styleType === "position") {
    element.className = "w-full";
    element.style.textAlign = style;
  }

  if (elementType === "a") {
    //@ts-ignore
    element.href = link;
    element.style.color = style;
    element.style.textDecoration = "line-through";
    element.style.cursor = "cursor-move";
  }
};

export const toggleWrapper = (
  range: Range,
  elementType: string,
  style: string,
  styleType: string,
  link: string
) => {
  const element = document.createElement(elementType);

  checkersForToggleWrapper(elementType, element, style, styleType, link);

  if (
    styleType === "font-size" ||
    (styleType === "spacing" &&
      range.commonAncestorContainer.nodeName === "DIV")
  ) {
    return;
  }

  range.surroundContents(element);
};

export function calculateCharacterWidth(element: HTMLInputElement): number {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const testString = "m";
  if (!context) return 20;
  context.font = element.style.font;
  const textWidth = context.measureText(testString).width;
  return textWidth;
}

export const createInput = (id: string) => {
  const element = document.createElement("div");

  element.contentEditable = "true";
  element.id = id;
  element.className =
    "h-5 w-20 px-2 border-b border-black inline-block outline-none";

  return element;
};

export const replaceContent = (range: Range, id: string) => {
  const element = createInput(id);
  range.deleteContents();
  range.insertNode(element);

  const parentElement = element.parentElement; // Assuming input is the input element

  if (parentElement) {
    // console.log(parentElement.offsetHeight, "start");

    const newHeight = parseInt(getComputedStyle(parentElement).height) + 20;
    parentElement.style.height = newHeight + "px";
    // console.log(getComputedStyle(parentElement).height);
  }
};

function wrapInTooltip(text: string, tip: string): Node {
  let div = document.createElement("div");
  div.className = "relative group inline-block";

  let tooltip = document.createElement("span");
  tooltip.className =
    "absolute hidden group-hover:flex -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700 left: 50%; transform: translateX(-50%);";

  tooltip.innerText = tip;

  let paragraph = document.createElement("p");
  paragraph.className =
    "group relative inline-block text-blue-500 underline hover:text-red-500 duration-300";
  paragraph.innerText = text;

  paragraph.appendChild(tooltip);
  div.appendChild(paragraph);

  return div;
}

export const addTooltip = (range: Range, tip: string) => {
  const value = range.toString();
  range.deleteContents();
  const tipComponent = (
    <ToolTipComponent label={value} content={tip}></ToolTipComponent>
  );
  var div = document.createElement("div");
  ReactDOM.render(tipComponent, div);
  range.insertNode(div.children[0]);
};

export const resizeBox = (
  editableRef: React.RefObject<HTMLDivElement>,
  viewBoxRef: React.MutableRefObject<any>,
  textareaRowCount: number,
  setTextareaRowCount: (value: React.SetStateAction<number>) => void
) => {
  const editableDiv = editableRef.current;

  if (!editableDiv) return;

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
