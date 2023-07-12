import React, { FC } from "react";

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: string;
  borderRadius?: string;
}

const ImageComponent: FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height,
  objectFit,
  borderRadius,
}) => {
  const imageStyle = `
    ${width || "w-full"}
    ${height || "h-auto"}
    ${objectFit || "object-cover"}
    ${borderRadius || ""}
  `;

  return (
    <div className="mt-[24px]">
      <img
        src={src}
        alt={alt}
        className={`${imageStyle} rounded-[8px] overflow-hidden`}
      />
    </div>
  );
};

export default ImageComponent;
