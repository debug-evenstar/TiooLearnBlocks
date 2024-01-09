// Color Validation Functions

export const toggleWrapperStyle = (
  element: HTMLDivElement,
  style: string,
  styleType: string
) => {
  console.log(styleType);
  if (styleType === "bgColor") element.style.backgroundColor = style;

  if (styleType === "position") element.style.textAlign = style;

  if (styleType === "font-size") element.style.fontSize = style + "px";

  if (styleType === "spacing") element.style.letterSpacing = style + "px";
  else element.style.color = style;
};
