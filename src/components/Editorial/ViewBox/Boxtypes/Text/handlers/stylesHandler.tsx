// Color Validation Functions

export const toggleWrapperStyle = (
  element: HTMLDivElement,
  style: string,
  styleType: string
) => {
  if (styleType === "bgColor") {
    element.style.backgroundColor = style;
  }
  if (styleType === "position") {
    element.style.textAlign = style;
  } else element.style.color = style;
};
