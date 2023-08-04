import React, { FC } from "react";

interface TextComponentProps {
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  fontStyle?: string;
  opacity?: string;
  lineHeight?: string;
  width?: string;
  textAlign?: string;
  children: React.ReactElement;
}

const TextComponent: FC<TextComponentProps> = ({
  children,
  fontSize,
  color,
  fontWeight,
  fontStyle,
  opacity,
  lineHeight,
  width,
  textAlign,
}) => {
  const textStyle = `
    ${fontSize || "text-base"}
    ${color || "text-black"}
    ${opacity || "opacity-100"}
    ${fontWeight || "font-normal"}
    ${fontStyle || "font-normal"}
    ${lineHeight || "leading-[23px]"}
    ${width || "w-full"}
    ${textAlign || "text-start"}
  `;

  return <div className={`${textStyle}`}>{children}</div>;
};

export default TextComponent;
