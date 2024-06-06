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

    const [isHeading, setIsHeading] = useState<boolean>(false);

    const textContainerRef = useRef<any>(null);

    const hideText = () => {
        textContainerRef.current.style.display = "none";
    };

    const showText = () => {
        textContainerRef.current.style.display = "block";
    };

    // Needs to be refactored later // No time right now //
    const answerBelongsToPrevious = (answer: string) => {
        if (data.answers) {
            for (let i = 0; i < data.answers.length; i++) {
                const ans = data.answers[i];
                if (typeof ans == "string") {
                    if (answer.toLowerCase() === ans.toLowerCase()) {
                        return false;
                    }
                } else {
                    // If answer is list of answers
                    for (let j = 0; j < ans.length; j++) {
                        const item = ans[j];
                        if (item.toLowerCase() === answer.toLowerCase()) {
                            return false;
                        }
                    }
                }
            }
        } else {
            // Yet to be handled for option based
            return false;
        }
        return true;
    };

    const parseStyles = () => {
        // Expandable
        if (data.canvas) { return; }
        const textStyle = `
        ${isHeading || slide.parent ? "text-center" : "text-left"}
        text-font
        ${styles?.fontSize ? "text-[" + styles.fontSize + "]" : ""}
      `;
        return textStyle;
    };

    useEffect(() => {
        if (data.content.includes("<*-") && data.content.includes("-*>")) {
            setIsHeading(() => true);
        }
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

        // Handle TextFields
        if (formatted.includes("<?>")) {
            var textFields: any = TextFields(
                processText,
                slide,
                data.answers ?? [],
                data.options ?? []
            );
            processText = textFields.data;
        }
        setProcessed(() => processText);
        if (data.answers && !data.options) {
            slide.attributes["hasSubjective"] = true;
            if (slide.functions && slide.functions.setHint) {
                setTimeout(() => {
                    slide.functions?.setHint(true);
                }, 1000);
            }
        }
    }, [formatted, data.content, slide]);
    return (
        <>
            <div className={parseStyles()} ref={textContainerRef}>
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
