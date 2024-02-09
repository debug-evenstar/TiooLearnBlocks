import { CanvasMedia } from "components/Editorial/interfaces";
import { FC } from "react";
declare const Video: FC<CanvasMedia>;
export default Video;
export interface UploadIconProps {
    handleUpload: (e: any) => void;
}
