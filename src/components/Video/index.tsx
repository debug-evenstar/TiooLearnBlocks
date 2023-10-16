import React, { FC, useEffect, useRef, useState } from "react";
import { VideoComponentProps } from "./handler";
import { pageContainsYoutubeScript, youtubeInit } from "components/SlideManager/handler";

declare global {
    interface Window {
      YT: any;
    }
}

const VideoComponent: FC<VideoComponentProps> = ({ data, slide }) => {
    const videoRef = useRef<any>(null);
    const [videoId, setvideoId] = useState<string>("");
    const [videoEnded, setVideoEnded] = useState<boolean>(false);
    const [youtubePluginReady, setYoutubePluginReady] = useState<boolean>(pageContainsYoutubeScript());
    
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

    const generateEmbedUrl = () => {
        const s = data.url.split("/");
        const UVC = (s[s.length-1]).trim(); // Unique Video Code
        return `https://www.youtube.com/embed/${UVC}?enablejsapi=1`;
    }

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


    const loadYoutubeInstance = (videoId : string) => {
        try{
            const playerOptions = {
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                },
                host: 'https://www.youtube.com'
            };
            const instance = new window.YT.Player(videoId, playerOptions);
            fallbackVideoCheck(instance);
        }catch(e){
            setTimeout(() => loadYoutubeInstance(videoId),1000);
        }
    }

    useEffect(()=>{
        // Verify slide is not false slide before initializing
        if(youtubePluginReady && slide?.functions?.allowProceed) {
            slide.setVideo({ ended : false });
            if(videoId === "") {
                const vidId = `ytb-${(new Date()).getTime()}`;
                setvideoId(() => vidId);
                setTimeout(() => loadYoutubeInstance(vidId), 1000);
            }
        }
    },[youtubePluginReady, slide]);

    useEffect(()=>{
        if(!pageContainsYoutubeScript) {
            youtubeInit();
        }
        setYoutubePluginReady(() => true);
    },[]);


    return (
        <>
            <div className="w-full">
                {!isYoutubeUrl() && (<video className="w-full" controls ref={videoRef} onEnded={() => endVideo()}>
                    <source src={data.url} type="video/mp4"></source>
                </video>)}
                {isYoutubeUrl() && youtubePluginReady && (
                    <iframe 
                        id={videoId}
                        title="Youtube video"
                        className="w-full aspect-video"
                        src={generateEmbedUrl()}
                    >
                    </iframe>
                )}
            </div>
        </>
    );
};

export default VideoComponent;
