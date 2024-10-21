import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import {
    TextComponentProps,
    buildTextData,
    formatTextContent,
    handleAnswerQuestion,
} from "./handler";
import { ToolTipTypes, ToolTips } from "../extensions/ToolTip";
import { TextFields } from "../extensions/TextFields";
import { attachTextInputHandler } from "components/Question/handler";

const TextComponent: FC<TextComponentProps> = ({
    styles,
    data,
    slide,
    altHeaderStyle,
    activeSlideIndex,
    viewArea,
}) => {
    const [processed, setProcessed] = useState<any[]>([]);

    const [formatted, setFormatted] = useState<any[]>([]);

    const textContainerRef = useRef<any>(null);

    const hideText = () => {
        textContainerRef.current.style.display = "none";
    };

    const showText = () => {
        textContainerRef.current.style.display = "block";
    };

    // useEffect(() => {
    //     // Handle initial text formatting
    //     setFormatted(formatTextContent(data.content));
    //     slide.setFunction("hideText", hideText);
    //     slide.setFunction("showText", showText);

    // }, [data.content, slide]);

    useEffect(() => {
        let processText: any[] = formatted;
        // Handle tips
        if (data.tips) {
            processText = ToolTips(
                ToolTipTypes.TEXT,
                processText,
                data.tips
            ).data;
        }
        setProcessed(() => processText);
        setTimeout(() => {
            attachTextInputHandler(textContainerRef.current, slide.slide, (data:any)=>{
                handleAnswerQuestion(data);
                slide.dispatch("answerQuestion", data);
            });  
        }, 1000);
    }, [formatted, data.content, slide]);

    // Can be optimized
    useEffect(() => {
        slide.on("answerQuestion", (data: any) => {
            handleAnswerQuestion(data);
            if ( textContainerRef?.current ) {
                const input = textContainerRef.current.querySelector("input");
                input && input.focus();
            }
        });
    }, [slide]);


    return (
        <>
            <div
                className="text-render whitespace-normal"
                ref={textContainerRef}
            >
                {data.canvas ? (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: ` ${buildTextData(data.content, viewArea)}`,
                        }}
                    />
                ) : (
                    processed.map((item, index) =>
                        typeof item === "string" ? (
                            <span
                                className="text-font"
                                key={index}
                                dangerouslySetInnerHTML={{
                                    __html: ` ${item} `,
                                }}
                            />
                        ) : (
                            <span className="text-font" key={index}>
                                (item)
                            </span>
                        )
                    )
                )}
            </div>
        </>
    );
};

export default TextComponent;
