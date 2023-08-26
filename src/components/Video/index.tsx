import React, { FC, useEffect, useRef } from "react";
import { VideoComponentProps } from "./handler";

const VideoComponent: FC<VideoComponentProps> = ({ data, slide }) => {
    const videoRef = useRef<any>(null);
    const endVideo = () => {
        console.log(slide)
        if( !slide.answers || slide.answers.length === 0 ) {
            slide?.functions?.allowProceed();
        }
    }
    return (
        <>
            <div className="w-full">
                <video className="w-full" controls autoPlay={true} ref={videoRef} onEnded={() => endVideo()}>
                    <source src={data.url} type="video/mp4"></source>
                </video>
            </div>
        </>
    );
};

export default VideoComponent;
