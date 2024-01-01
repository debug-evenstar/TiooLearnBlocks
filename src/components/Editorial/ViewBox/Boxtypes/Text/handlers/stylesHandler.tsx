// Color Validation Functions
export function isHex(colorString: string) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(colorString);
}

export function isRgb(colorString: string) {
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  return rgbRegex.test(colorString);
}

export function isHsv(colorString: string) {
  const hsvRegex = /^hsv\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  return hsvRegex.test(colorString);
}

// Color Formatting Functions
export function formatHex(hexColor: string) {
  if (hexColor.length === 4) {
    let extendedColor = "#";
    for (let i = 1; i < hexColor.length; i++) {
      extendedColor += hexColor[i] + hexColor[i];
    }
    return extendedColor;
  } else {
    return hexColor;
  }
}

export function formatRgb(rgbColor: string) {
  const rgbValues = rgbColor.match(/\d+/g);
  if (rgbValues)
    return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
  else return "rgb(0, 0, 0)";
}

export function formatHsv(hsvColor: string) {
  const hsvValues = hsvColor.match(/\d+/g);
  if (hsvValues)
    return `hsv(${hsvValues[0]}, ${hsvValues[1]}, ${hsvValues[2]})`;
  else return "hsv(0, 0, 0)";
}

// Length Validation Function
export function isValidColorLength(colorString: string) {
  const length = colorString.length;
  return length === 4 || length === 7 || length === 11 || length === 16;
}

export const toggleWrapperStyle = (element: HTMLDivElement, style: string) => {
  element.style.color = style;
};
