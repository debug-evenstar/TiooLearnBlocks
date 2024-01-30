import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { CanvasMedia } from "components/Editorial/interfaces";
import { FC } from "react";
import "react-resizable/css/styles.css";
declare const Image: FC<CanvasMedia>;
export default Image;
export interface UploadIconProps {
    handleChange: (e: any) => void;
    handleDrop: (e: any) => void;
    manager: EditorialManagerInterface;
}
