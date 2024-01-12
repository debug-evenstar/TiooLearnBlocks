// Color Validation Functions

export const toggleWrapperStyle = (
  element: HTMLDivElement,
  style: string,
  styleType: string
) => {
  switch (styleType) {
    case "bgColor":
      element.style.backgroundColor = style;
      break;
    case "position":
      element.style.textAlign = style;
      break;
    case "font":
      element.style.fontFamily = style;
      break;
    case "font-size":
      element.style.fontSize = style + "px";
      break;
    case "spacing":
      element.style.letterSpacing = style + "px";
      break;
    default :
      element.style.color = style;
      break;
  }
};
