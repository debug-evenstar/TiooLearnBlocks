/* -------------------------- COMPONENT INTERFACES -------------------------- */

import {
    ComponentBaseDataInterface,
    ComponentBasePropsInterface,
} from "components/interface";

interface TextStyles {
    color?: string;
    fontSize?: string;
}

export interface TextData extends ComponentBaseDataInterface {
    component: string;
    content: string;
    tips?: string[];
    answers?: any[];
    options?: string[][];
}

export interface TextComponentProps extends ComponentBasePropsInterface {
    styles?: TextStyles;
    data: TextData;
    activeSlideIndex: number;
    altHeaderStyle: string;
}

/* ------------------------ COMPONENT HANDLER HELPERS ----------------------- */

const formatIdentifiers: { [key: string]: any } = {
    bold: ["<**", "**>"],
    heading: ["<*-", "-*>"],
    italic: ["<!!", "!!>"],
    keyword: ["<(", ")>"],
};

const formatMappings: { [key: string]: Function } = {
    bold: (text: string | React.ReactElement) => (
        <strong className="text-font">
            {` `}
            {text}
            {` `}
        </strong>
    ),
    heading: (text: string | React.ReactElement) => (
        <strong className="w-full text-center text-font heading">
            {` `}
            {text}
            {` `}
        </strong>
    ),
    italic: (text: string | React.ReactElement) => (
        <i>
            {` `}
            {text}
            {` `}
        </i>
    ),
    keyword: (text: string | React.ReactElement) => (
        <span className="!text-green-500">
            {` `}
            {text}
            {` `}
        </span>
    ),
};

const exclusions = ["<~", "~>"];

const format = (key: string, text: string) => {
    return formatMappings[key](text);
};

/* ----------------------- COMPONENT HANDLER FUNCTIONS ---------------------- */

const stringContainsAny = (list: string[], text: string) => {
    return list.filter((item: string) => text.includes(item)).length > 0;
};

const recursiveFormatter = (identifiers: any, text: string, index: number) => {
    var key = identifiers[index];
    const pair = formatIdentifiers[key];
    const start = pair[0],
        end = pair[1];
    var result: any = text.replace(start, "").replace(end, "");
    if (index + 1 < identifiers.length) {
        result = recursiveFormatter(identifiers, result, index + 1);
        return format(key, result);
    } else {
        return format(key, result);
    }
};

const formatText = (text: any) => {
    const identifiers = Object.keys(formatIdentifiers);
    const identifiersPresent = identifiers.filter((key: any) => {
        const item = formatIdentifiers[key];
        return text.includes(item[0]);
    });
    const result = recursiveFormatter(identifiersPresent, text, 0);
    return result;
};

const collectFormattingIndices = (list: any[], index: number = 0) => {
    const identifiers = Object.values(formatIdentifiers);
    const keys = Object.keys(formatIdentifiers);
    const pair = identifiers[index];
    const indices: any = {};
    let track = false;
    for (let i = 0; i < list.length; i++) {
        const text = list[i];
        if (stringContainsAny(exclusions, text)) {
            continue;
        }
        if (text.includes(pair[0])) {
            track = true;
            list[i] = list[i].replace(pair[0], "");
        }
        if (track) {
            const key = keys[index];
            if (indices[key]) {
                indices[key].push(i);
            } else {
                indices[key] = [i];
            }
        }
        if (text.includes(pair[1])) {
            track = false;
            list[i] = list[i].replace(pair[1], "");
        }
    }

    if (identifiers.length > index + 1) {
        const next: any = collectFormattingIndices(list, index + 1);
        return {
            list: next.list,
            indices: {
                ...indices,
                ...next.indices,
            },
        };
    }
    return {
        list: list,
        indices: indices,
    };
};

const handleFormatting = (content: string) => {
    const list = content.split(" ");
    const collect = collectFormattingIndices(list);
    for (const key in collect.indices) {
        const indicesToFormat: any[] = collect.indices[key];
        indicesToFormat.forEach((index) => {
            collect.list[index] = format(key, collect.list[index]);
        });
    }
    return collect.list;
};

const animate = (element: HTMLElement) => {
    if (element) {
        element.style.setProperty("transform", "scale(1.3)");
        element.style.setProperty("text-shadow", "0px 0px 15px #ffb870");
        setTimeout(() => {
            element && element.style.setProperty("transform", "scale(1)");
            element &&
                element.style.setProperty("text-shadow", "0px 0px 0px #fff");
        }, 400);
    }
};

export const handleAnswerQuestion = (data: any) => {
    // Check if any linked inputs exists and populate them
    const linkedInput = document.querySelector(
        `.text-render input[data-question-hash='${data.question.hash}']`
    );
    if (linkedInput) {
        const parent = linkedInput.parentElement;
        const textFill = document.createElement("span");
        textFill.className =
            "relative inline-block font-bold text-[#089c28] text-[20px] mx-[3px] -bottom-[0.5px]";
        textFill.innerHTML = ` ${data.option?.title ?? data.answer } `;
        textFill.style.setProperty(
            "transition",
            "transform 0.4s, text-shadow 0.4s"
        );
        textFill.style.setProperty("transition-timing-function", "linear");
        textFill.style.setProperty("text-shadow", "0px 0px 0px #fff");
        parent?.replaceChild(textFill, linkedInput);
        setTimeout(() => {
            animate(textFill);
        }, 300);
    }
};

export const processTextStyles = () => {
    // Some Data Here
};

export const formatTextContent = (content: string) => {
    return handleFormatting(content);
};

const pixelDependentStyles = ["fontSize"];

// To be expanded
export const buildTextData = (data: string, viewArea: any) => {
    const abstractBody = document.createElement("body");
    abstractBody.innerHTML = data;
    const textNodeList = abstractBody.querySelectorAll("*[data-type=text]");
    textNodeList.forEach((node: Element | any) => {
        // For parsing pixel dependent styles
        pixelDependentStyles.forEach((styleName: string) => {
            if (
                node &&
                node.hasAttribute("data-container-pixel") &&
                node.style[styleName]
            ) {
                const style: string = node.style[styleName];
                // Some work left here
                const parseFontSize: number = Number.parseInt(
                    style.replace("px", "")
                );
                const relativeContainerPixel = node.getAttribute(
                    "data-container-pixel"
                ) as number;
                if (viewArea) {
                    node.style[styleName] = `${
                        (parseFontSize / relativeContainerPixel) *
                        viewArea.width
                    }px`;
                }
            }
        });
    });
    return abstractBody.innerHTML;
};
