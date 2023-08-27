import React, { FC, useEffect, useRef } from "react";
import { VideoComponentProps } from "./handler";

const VideoComponent: FC<VideoComponentProps> = ({ data, slide }) => {
    const videoRef = useRef<any>(null);
    const endVideo = () => {
        if( 
            !slide.answers || 
            slide.answers.length === 0 ||
            slide.answers.length === slide.progress
        ) {
            slide?.functions?.allowProceed();
        }
        slide.setVideo({ ended : true});
    }
    useEffect(()=>{
        slide.setVideo({ ended : false });
    });
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
