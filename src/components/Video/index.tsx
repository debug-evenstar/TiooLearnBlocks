import React, { FC, useEffect, useRef } from "react";
import { VideoComponentProps } from "./handler";

const VideoComponent: FC<VideoComponentProps> = ({ data, slide }) => {
    const videoRef = useRef<any>(null);
    const endVideo = () => {
        slide.setVideo({ ended : true});
        if( 
            !slide.answers || 
            slide.answers.length === 0 ||
            slide.answers.length === slide.progress
        ) {
            slide?.functions?.allowProceed();
        }
    }
    useEffect(()=>{
        slide.setVideo({ ended : false });
    });

    const isYoutubeUrl = () => {
        return data.url.includes("youtube") || data.url.includes("youtu.be");
    };

    return (
        <>
            <div className="w-full">
                {!isYoutubeUrl() && (<video className="w-full" controls autoPlay={true} ref={videoRef} onEnded={() => endVideo()}>
                    <source src={data.url} type="video/mp4"></source>
                </video>)}
                {isYoutubeUrl() && (
                    <div className="w-full">
                        <iframe 
                            title="Youtube Video"
                            className="w-full h-full"
                            src={data.url}
                        >
                        </iframe>
                    </div>
                )}
            </div>
        </>
    );
};

export default VideoComponent;
