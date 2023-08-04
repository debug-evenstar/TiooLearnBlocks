import React, { FC } from "react";
import { TextComponentProps, processTextContent } from "./handler";

const TextComponent: FC<TextComponentProps> = ({
  styles,
  data
}) => {
  const processed = processTextContent(data.content);
  return <>
    <div>
    {processed.map((item, index) => (
          <span key={index}>
            {(typeof item) == "string" ? ` ${item} ` : (item)}
          </span>
        ))}
    </div>
  </>;
};

export default TextComponent;
