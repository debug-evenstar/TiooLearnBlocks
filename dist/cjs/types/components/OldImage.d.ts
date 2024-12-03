import { FC } from "react";
interface ImageComponentProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
    objectFit?: string;
    borderRadius?: string;
}
declare const ImageComponent: FC<ImageComponentProps>;
export default ImageComponent;
