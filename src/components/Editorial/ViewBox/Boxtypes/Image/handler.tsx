// Color Validation Functions

export const toggleWrapperSize = (
  element: HTMLDivElement,
  style: string,
  styleType: string
) => {
  if (styleType === "height") {
    element.style.height = style + "px";
  } else element.style.width = style + "px";
};
