import { ManagerInterface } from "apps/Editorial/Base/Manager";
import { CanvasMedia } from "apps/Editorial/interfaces";
import { FC } from "react";
import "react-resizable/css/styles.css";
declare const Image: FC<CanvasMedia>;
export default Image;
export interface UploadIconProps {
    handleChange: (e: any) => void;
    handleDrop: (e: any) => void;
    isLinking?: boolean;
    manager: ManagerInterface;
}
export declare const UploadIcon: FC<UploadIconProps>;
