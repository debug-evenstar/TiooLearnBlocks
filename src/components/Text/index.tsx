import { FC, useEffect, useRef, useState } from "react";
import {
    TextComponentProps,
    buildTextData,
    formatTextContent,
} from "./handler";
import { ToolTipTypes, ToolTips } from "../extensions/ToolTip";
import { TextFields } from "../extensions/TextFields";

const TextComponent: FC<TextComponentProps> = ({
    styles,
    data,
    slide,
    altHeaderStyle,
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


    useEffect(() => {
        // Handle initial text formatting
        setFormatted(formatTextContent(data.content));
        slide.setFunction("hideText", hideText);
        slide.setFunction("showText", showText);
    }, [data.content, slide]);

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
    }, [formatted, data.content, slide]);

    // Can be optimized
    useEffect(() => {
        slide.on("answerQuestion", (data : any) => {
            // Check if any linked inputs exists and populate them
            const linkedInput = document.querySelector(`.text-render input[data-question-hash='${data.question.hash}']`);
            if (linkedInput) {
                const parent = linkedInput.parentElement;
                const textFill = document.createElement("span");
                textFill.className = "font-bold text-[#409972] text-[20px] mx-[3px]";
                textFill.innerHTML = ` ${data.option.title} `;
                parent?.replaceChild(textFill, linkedInput);
            }
        });
    },[slide]);
    return (
        <>
            <div className="text-render whitespace-normal" ref={textContainerRef}>
                {data.canvas ? (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: ` ${buildTextData(
                                data.content,
                                viewArea
                            )}`,
                        }}
                    />
                ) : (
                    processed.map((item, index) =>
                        typeof item == "string" ? (
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
