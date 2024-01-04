// Color Validation Functions

export const toggleWrapperSize = (
  element: HTMLDivElement,
  style: string,
  styleType: string
) => {
  if (styleType === "height" && +style >= 280) {
    element.style.height = style + "px";
  } else element.style.width = style + "px";
};
