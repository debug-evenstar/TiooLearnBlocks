import ReactDOM from "react-dom";
import Tooltip from "../Tooltip";

const checkersForToggleWrapper = (
    elementType: string,
    element: HTMLElement,
    style: string,
    styleType: string,
    link: string
) => {
    if (elementType === "span") {
        if (styleType === "line") {
            element.style.textDecoration = style;
        }

        if (styleType === "font") {
            element.style.fontFamily = style;
        }

        if (styleType === "font-size") {
            element.style.fontSize = style + "px";
            const canvasView = document.getElementById("editorial-canvas")
                ?.clientWidth as number;
            element.setAttribute("data-type", "text");
            element.setAttribute("data-container-pixel", canvasView.toString());
        }
        if (styleType === "spacing") {
            element.style.lineHeight = style + "px";
        }

        element.style.color = style;
    }

    if (styleType === "position") {
        element.className = "w-full";
        element.style.textAlign = style;
    }

    if (elementType === "a") {
        //@ts-ignore
        element.href = link;
        element.style.color = style;
        element.style.textDecoration = "underline";
        element.style.cursor = "cursor-move";
    }
};

export const toggleWrapper = (
    range: Range,
    elementType: string,
    style: string,
    styleType: string,
    link: string
) => {
    const element = document.createElement(elementType);

    if (styleType.length > 2) {
        const parent =
            range.commonAncestorContainer.parentElement?.querySelector(
                ".main"
            ) as HTMLElement;
        if (!parent) return;
        checkersForToggleWrapper(elementType, parent, style, styleType, link);
        return;
    }

    //checkersForToggleWrapper(elementType, element, style, styleType, link);

    if (elementType !== "b" && elementType !== "i" && elementType) {
        element.innerText = range.toString();
        range.deleteContents();
        range.insertNode(element);
        return;
    }

    range.surroundContents(element);
};

export const unLink = (range: Range) => {
    const anchor = range.commonAncestorContainer.parentElement;

    if (anchor && anchor.tagName === "A") {
        anchor.replaceWith(range.toString());
    }
};

export const toggleList = (range: Range, elementType: string) => {
    const value = range.toString();
    range.deleteContents();
    const tipComponent = <li>{value}</li>;
    var element = document.createElement(elementType);
    ReactDOM.render(tipComponent, element);
    range.insertNode(element);
};

export function calculateCharacterWidth(element: HTMLInputElement): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const testString = "m";
    if (!context) return 20;
    context.font = element.style.font;
    const textWidth = context.measureText(testString).width;
    return textWidth;
}

export const createInput = (id: string) => {
    const element = document.createElement("div");

    element.contentEditable = "true";
    element.id = id;
    element.className =
        "h-5 w-20 p-2 text-[2px] cursor-pointer border-2 border-[#4F46E5] inline-block outline-[#FA14D5] rounded-full relative top-1";

    return element;
};

export const replaceContent = (range: Range, id: string) => {
    const element = createInput(id);
    range.deleteContents();
    range.insertNode(element);

    const parentElement = element.parentElement; // Assuming input is the input element

    if (parentElement) {
        // console.log(parentElement.offsetHeight, "start");

        const newHeight = parseInt(getComputedStyle(parentElement).height) + 20;
        parentElement.style.height = newHeight + "px";
        // console.log(getComputedStyle(parentElement).height);
    }
};

export const addTooltip = (range: Range, tip: string) => {
    const value = range.toString();
    range.deleteContents();
    const tipComponent = (
        //<ToolTipComponent label={value} content={tip}></ToolTipComponent>
        <Tooltip text={value} tip={tip} />
    );
    var div = document.createElement("div");
    ReactDOM.render(tipComponent, div);
    range.insertNode(div.children[0]);
};


