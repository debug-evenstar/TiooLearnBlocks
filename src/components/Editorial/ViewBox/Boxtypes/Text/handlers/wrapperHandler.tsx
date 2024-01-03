const checkersForToggleWrapper = (
  elementType: string,
  element: HTMLElement,
  style: string,
  link: string
) => {
  if (elementType === "span") {
    element.style.textDecoration = style;
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
