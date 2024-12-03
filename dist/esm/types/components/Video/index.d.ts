import { FC } from "react";
import { VideoComponentProps } from "./handler";
declare global {
    interface Window {
        YT: any;
    }
}
declare const VideoComponent: FC<VideoComponentProps>;
export default VideoComponent;
