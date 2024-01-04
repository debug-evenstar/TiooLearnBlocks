const checkersForToggleWrapper = (
  elementType: string,
  element: HTMLElement,
  style: string,
  link: string
) => {
  if (elementType === "span") {
    if (style === "line-through" || style === "underline") {
      element.style.textDecoration = style;
    }

    element.style.color = style;
  }

  if (elementType === "a") {
    //@ts-ignore
    element.href = link;
    element.style.color = style;
    element.style.cursor = "cursor-move";
  }
};

export const toggleWrapper = (
  range: Range,
  elementType: string,
  style: string,
  link: string
) => {
  const element = document.createElement(elementType);

  checkersForToggleWrapper(elementType, element, style, link);

  range.surroundContents(element);
};

export const replaceContent = (range: Range) => {
  const element = document.createElement("input");
  range.deleteContents();
  range.insertNode(element);
};
