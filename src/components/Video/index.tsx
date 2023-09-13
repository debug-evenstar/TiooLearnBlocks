import React, { FC, useEffect, useRef, useState } from "react";
import { VideoComponentProps } from "./handler";

declare global {
    interface Window {
      YT: any;
    }
}

const VideoComponent: FC<VideoComponentProps> = ({ data, slide }) => {
    const videoRef = useRef<any>(null);
    const [videoId, setvideoId] = useState<string>("");
    const [videoEnded, setVideoEnded] = useState<boolean>(false);
    const endVideo = () => {
        slide.setVideo({ ended : true});
        setVideoEnded(() => true);
        if( 
            !slide.answers || 
            slide.answers.length === 0 ||
            slide.answers.length === slide.progress
        ) {
            slide?.functions?.allowProceed();
        }
    }

    const isYoutubeUrl = () => {
        return data.url.includes("youtube") || data.url.includes("youtu.be");
    };

    const onPlayerReady = (event : any) => {
        console.log(event);
    }

    const onPlayerStateChange = (event : any) => {
        if (event.data === 0) {
            endVideo();
        }
    }

    const fallbackVideoCheck = (instance : any) => {
        const fallbackCheck = setInterval(()=>{
            if(instance.playerInfo.playerState === 0){
                if(!videoEnded){
                    endVideo();
                }
                clearInterval(fallbackCheck);
            }
        },2000);
    }

    let videoInit = false;
    useEffect(()=>{
        slide.setVideo({ ended : false });
        if(videoId === "" && !videoInit) {
            const vidId = `ytb-${(new Date()).getTime()}`;
            setvideoId(() => vidId);
            videoInit = true;
            setTimeout(()=>{
                const playerOptions = {
                    events: {
                      'onReady': onPlayerReady,
                      'onStateChange': onPlayerStateChange
                    },
                    host: data.url.includes("www") 
                        ? 'https://www.youtube.com' 
                        : 'https://youtube.com'
                };
                const instance = new window.YT.Player(vidId, playerOptions);
                fallbackVideoCheck(instance);
            }, 1000);
        }
    },[]);


    return (
        <>
            <div className="w-full">
                {!isYoutubeUrl() && (<video className="w-full" controls autoPlay={true} ref={videoRef} onEnded={() => endVideo()}>
                    <source src={data.url} type="video/mp4"></source>
                </video>)}
                {isYoutubeUrl() && (
                    <iframe 
                        id={videoId}
                        title="Youtube video"
                        className="w-full aspect-video"
                        src={`${data.url}?enablejsapi=1`}
                    >
                    </iframe>
                )}
            </div>
        </>
    );
};

export default VideoComponent;
