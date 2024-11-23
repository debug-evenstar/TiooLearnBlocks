import { CanvasStates } from "apps/Editorial/Base/CanvasManager";
import { ManagerInterface, _getManager } from "apps/Editorial/Base/Manager";
import { ComponentBaseDataInterface } from "components/interface";
import { RefObject } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { objectsAreIdentical } from "utilities/object";
import Tooltip from "./Tooltip";
import { CurrentStylesState } from "apps/Editorial/Base/StateInterface";

/* -------------------------------------------------------------------------- */
/*                             INTERFACE FOR TEXT                             */
/* -------------------------------------------------------------------------- */

interface TextComponentDataInterface extends ComponentBaseDataInterface {
    content: string;
    tips?: string[];
}

export enum TextFormatType {
    STYLE,
    WRAP,
}

export const supportedStyles: any = {
    bold: { fontWeight: "bold" },
    italic: { fontStyle: "italic" },
    underline: { textDecoration: "underline" },
    linethrough: { textDecoration: "line-through" },
};

/* --------------------------- GENERATE TEXT DATA --------------------------- */

export const textComponentData = (
    content: string = "",
    tips: string[] = []
) => {
    content = wrapTextData(content);
    const data: TextComponentDataInterface = {
        component: "Text",
        content,
        tips,
        theme: "white",
        canvas: true,
    };
    return data;
};

/* ---------------------- WRAP TEXT CONTENT WITHIN SPAN --------------------- */

export const wrapTextData = (content: string) => {
    if (content[0] != "<") {
        return `<p class='main outline-none'>${content}</p>`;
    }
    return content;
};

/* --------------------------- GET SELECTION RANGE -------------------------- */
export const getRange = () => {
    const selection = window.getSelection();
    if (!selection) return;
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        return range;
    }
};

/* --------------------- HANDLE TEXT CHANGE ON EDIT BOX --------------------- */

export const handleTextChange = (event: any, manager: ManagerInterface) => {
    // Using innerHTML to avoid conflict with Text value on content update...
    manager.canvasManager.canvas.updateActiveComponentData(
        textComponentData(event.target.innerHTML)
    );
};

/* -------------- SET DEFAULT STYLES AND CLASSES OF PARENT TAG -------------- */

const setDefaultStyles = (element: HTMLElement) => {
    element.className = "main outline-none";
    const canvasView = document.getElementById("editorial-canvas")
        ?.clientWidth as number;
    element.style.fontSize = "20px";
    element.setAttribute("data-type", "text");
    element.setAttribute("data-container-pixel", canvasView.toString());
};

/* ---------------- WRAP EDITABLE CONTENT IN PARENT TEXT TAG ---------------- */

export const initializeParentTag = (
    editableRef: React.RefObject<HTMLDivElement>,
    force: boolean = false
) => {
    const editable: any = editableRef.current;
    let parentTag: any = editable.querySelector("p.main");
    if (
        !parentTag &&
        (editable.innerHTML || force) &&
        !startsWithHtmlTextTag(editable.innerHTML)
    ) {
        const textNode = document.createTextNode(editable.innerHTML);
        parentTag = document.createElement("p");
        setDefaultStyles(parentTag);
        parentTag.appendChild(textNode);
        const currentValue = editable.innerHTML;
        editable.innerHTML = "";
        editable.appendChild(parentTag);

        // Set cursor
        // Would convert to helper
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(parentTag, currentValue.length);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
    }
};

/* --------------------------- ADJUST TEXTAREA BOX -------------------------- */
export const resizeBox = (
    editableRef: React.RefObject<HTMLDivElement>,
    viewBoxRef: React.MutableRefObject<any>,
    textareaRowCount: number,
    setTextareaRowCount: (value: React.SetStateAction<number>) => void,
    event: any | null = null
) => {
    const editableDiv =
        event && event.target
            ? (event.target as HTMLElement)
            : editableRef.current;

    if (!editableDiv) return;

    const lineHeight = parseFloat(
        window.getComputedStyle(editableDiv).lineHeight
    );
    const numberOfRows = Math.floor(editableDiv.scrollHeight / lineHeight);
    editableDiv.style.height = "auto";
    editableDiv.style.height = editableDiv.scrollHeight + "px";
    // const viewBox = viewBoxRef.current;
    // if (viewBox) {
    //     if (numberOfRows > textareaRowCount) {
    //         setTextareaRowCount(numberOfRows);
    //         const heightDifference =
    //             lineHeight * (numberOfRows - textareaRowCount);
    //         const newHeight = viewBox.offsetHeight + heightDifference;
    //         viewBox.style.height = newHeight + "px";
    //     }
    // }
};

/* ----------------------- TEXT PROPERTIES AND ACTIONS ---------------------- */

// Function to handle text formatting properties
export const formatText = (
    type: TextFormatType,
    tag: string | HTMLElement,
    styles?: { [key: string]: string }
) => {
    const manager = _getManager();
    let formatted;
    if (typeof tag === "string") {
        formatted = formatTextWithWrapper(tag, styles ?? {}, type);
    } else {
        formatted = formatTextStyle(tag, (styles ?? {}) as any);
    }

    manager.canvasManager.canvas.updateActiveComponentData(
        textComponentData(
            manager.states.canvasStates?.editableTextRef.current.innerHTML
        )
    );
    return formatted;
};

const formatTextWithWrapper = (
    tagName: string,
    styles: any,
    type: TextFormatType
) => {
    const range = getRange();
    const manager = _getManager();
    const lastSelection = manager.states.canvasStates?.lastRangeSelection;

    if (range?.toString()) {
        const boundingElement = range.startContainer.parentElement;
        if (undoRangeFormat(range, tagName, styles, type)) {
            return;
        }

        // If bounding element is formatted wrapper
        if (
            boundingElement &&
            boundingElement.className === "ft" &&
            type === TextFormatType.STYLE &&
            range.toString() === boundingElement.innerText
        ) {
            const element = formatTextStyle(boundingElement, styles);
            setState("lastRangeSelection", { element, range, styles });
            return element;
        }

        // // If last range is current range selected
        if (
            lastSelection &&
            isLastRange(range, lastSelection) &&
            lastSelection.element.className === "ft" &&
            type === TextFormatType.STYLE
        ) {
            const element = formatTextStyle(lastSelection.element, styles);
            return element;
        }
        // ran.cloneContents().childNodes[1].innerHTML
        // Final wrap option
        const element = createElementWithStyles(tagName, styles);

        try {
            range.surroundContents(element);
        } catch (err) {
            const rangeContents = range.extractContents();
            element.appendChild(rangeContents);
            range.deleteContents();
            range.insertNode(element);
        }

        // Clean empty elements #Change the parent element here to editable ref element
        boundingElement && cleanEmptyNodes(boundingElement);

        setState("lastRangeSelection", { element, range, styles });
        return element;
    }
};

const formatTextStyle = (element: HTMLElement, styles: CSSStyleDeclaration) => {
    Object.keys(styles).forEach((styleName: any) => {
        element.style[styleName] = styles[styleName];
    });
    return element;
};

const createElementWithStyles = (
    tagName: string,
    styles: CSSStyleDeclaration
) => {
    const element = document.createElement(tagName) as HTMLElement;
    element.className = tagName === "span" ? "ft" : ""; // Mark formatting elements as ft
    Object.keys(styles).forEach((styleName: any) => {
        element.style[styleName] = styles[styleName];
    });
    return element;
};

export const handleInsertMath = (mathHtml: string) => {
    const manager = _getManager();
    const textElement = manager.canvasManager.activeComponentElement();
    const editableArea = textElement.querySelector("div.editable-text");
    const cursorPosition = editableArea.getAttribute("data-cursor-position");
    let updatedHtml;
    let currentHtml = editableArea.innerHTML;
    // Assume existing text ends in closing </p> tag, insert into existing
    let closing = currentHtml.slice(-4);
    // if (cursorPosition) {} // Come back to this later
    if (currentHtml.includes('%%')) {
        updatedHtml = currentHtml.replace(/(%%)/, `<span contenteditable="false">${mathHtml}</span>`);
    } else {
        if (closing === "</p>") {  
            updatedHtml =
                editableArea.innerHTML.slice(0, -4) +
                `<span contenteditable="false">${mathHtml}</span>` +
                "</p>";
        } else {
            const parentTag = document.createElement("p");
            setDefaultStyles(parentTag);
            parentTag.innerHTML = `<span contenteditable="false">${mathHtml}</span>`;
            updatedHtml = editableArea.innerHTML + parentTag.outerHTML;
        }
    }


    
    // Send event to text component
    manager.event.emit("insertMath", updatedHtml);
    // Update in slide data
    manager.canvasManager.canvas.updateActiveComponentData(
        textComponentData(updatedHtml)
    );
};

// Function to check for existing text format and deactivate

const undoRangeFormat = (
    currentRange: Range,
    tagName: string,
    styles: any = {},
    type: TextFormatType
) => {
    const manager = _getManager();
    let undone = false;

    // Check if container element satisfies format conditions
    const boundingElement = currentRange.startContainer
        .parentElement as HTMLElement;
    if (
        tagName &&
        tagName.toLowerCase() === boundingElement.tagName.toLowerCase() &&
        type === TextFormatType.STYLE &&
        elementHasStyles(boundingElement, styles)
    ) {
        formatTextStyle(boundingElement, nullifyStyles(styles));
        // -----------
        undone = true;
    }

    // Check for last range selection
    const lastSelection = manager.states.canvasStates?.lastRangeSelection;
    // Check if previous same range is being formatted again
    if (
        lastSelection &&
        tagName &&
        tagName.toLowerCase() === lastSelection.element.tagName.toLowerCase() &&
        isLastRange(currentRange, lastSelection)
    ) {
        if (
            elementHasStyles(lastSelection.element, styles) &&
            type === TextFormatType.STYLE
        ) {
            formatTextStyle(lastSelection.element, nullifyStyles(styles));
            undone = true;
        }
        // if( type === TextFormatType.WRAP) {
        //   // const element = lastSelection.element.
        //   // currentRange.surroundContents(element);
        // }
    }
    return undone;
};

const elementHasStyles = (element: HTMLElement, styles: any) =>
    !Object.keys(styles).filter(
        (styleName: any) => element.style[styleName] !== styles[styleName]
    ).length;

export const toggleList = (listType: string) => {
    const range = getRange();
    if (range) {
        const value = range.toString();
        range.deleteContents();
        const tipComponent = <li>{value}</li>;
        var element = document.createElement(listType);
        const root = createRoot(element);
        root.render(tipComponent);
        range.insertNode(element);
    }
};

export const verifySelectionProperty = () => {
    const range = getRange();
    const manager = _getManager();
    try {
        if (range && range.toString()) {
            const boundingElement = range.startContainer.parentElement;
            if (boundingElement?.classList.contains("ft")) {
                Object.keys(supportedStyles).forEach((style: string) => {
                    const styleName: any = Object.keys(
                        supportedStyles[style]
                    )[0];
                    const elementStyle = boundingElement.style[styleName];
                    if (
                        elementStyle &&
                        elementStyle === supportedStyles[style][styleName]
                    ) {
                        manager.canvasManager.canvas.functions.toggleTextEditPropertyActiveState(
                            style,
                            true
                        );
                    } else {
                        manager.canvasManager.canvas.functions.toggleTextEditPropertyActiveState(
                            style,
                            false
                        );
                    }
                });
            }
        } else {
            Object.keys(supportedStyles).forEach((style: string) => {
                manager.canvasManager.canvas.functions.toggleTextEditPropertyActiveState(
                    style,
                    false
                );
            });
        }
    } catch (err) {
        // console.log(err);
    }
};

export const handleSelectionChange = () => {
    const manager = _getManager();
    const range = getRange();
    if (range) {
        const element = range.commonAncestorContainer.parentElement;

        if (element) {
            const styles = getComputedStyle(element);

            manager.setState("currentStyles", (prev: CurrentStylesState) => {
                return {
                    ...prev,
                    ...({
                        textColor: styles.color,
                        textSize: removePx(styles.fontSize),
                        textSpacing: removePx(styles.lineHeight),
                        font: styles.fontFamily,
                    } as CurrentStylesState),
                };
            });
        }
    } else {
        return;
    }
};

/* -------------------------------------------------------------------------- */
/*                             TOOL TIP FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

export const handleAddTip = (tip: string) => {
    const range = getRange();
    const manager = _getManager();
    if (range && range.toString()) {
        const children = (range.cloneContents() as any).children;
        let value = "";
        if (children.length > 0) {
            Array.from(children).forEach(
                (child: any) => (value += child.outerHTML)
            );
        } else {
            value = range.toString();
        }
        range.deleteContents();
        const tipComponent = <Tooltip text={value} tip={tip} />;
        var span = document.createElement("span");
        range.surroundContents(span);
        const root = createRoot(span);
        root.render(tipComponent);
        const textElement = manager.canvasManager.activeComponentElement();
        const editableArea = textElement.querySelector(
            "div[contenteditable=true]"
        );
        clearSelection();
        if (editableArea) {
            setTimeout(() => {
                manager.canvasManager.canvas.updateActiveComponentData(
                    textComponentData(editableArea.innerHTML)
                );
                configureTipManager(editableArea);
            }, 1000);
        }
    }
};

/* - HANDLE EDITABLE STATE AND INNER SPAN OF TIP COMPONENT ON MOUSE ACTIONS - */

export const configureTipManager = (element: any) => {
    const handleEnterEvent = (event: any) => {
        const tipText = event.target.querySelector(".tip-text");
        if (tipText) {
            const previousContent = tipText.innerText;
            const span = document.createElement("span");
            span.className = "tip-editable";
            span.innerHTML = previousContent || "....";
            tipText.innerHTML = "";
            tipText.appendChild(span);
            const editableSpan = tipText.querySelector(".tip-editable");
            editableSpan && editableSpan.setAttribute("contenteditable", true);
        }
    };
    const handleLeaveEvent = (event: any) => {
        const tipText = event.target.querySelector(".tip-text");
        if (tipText) {
            const editableSpan = tipText.querySelector(".tip-editable");
            editableSpan &&
                editableSpan?.setAttribute("contenteditable", false);
            if (
                editableSpan?.innerText === "" ||
                editableSpan?.innerText === " "
            ) {
                editableSpan.innerHTML = "....";
            }
        }
    };

    /* -------------------- REGISTER TOOLTIP MANAGER LISTENER ------------------- */

    if (element) {
        element.querySelectorAll(".tooltip").forEach((node: any) => {
            node.addEventListener("mouseenter", handleEnterEvent);
            node.addEventListener("mouseleave", handleLeaveEvent);
        });
    }

    const removeListeners = () => {
        if (element) {
            element.querySelectorAll(".tooltip").forEach((node: any) => {
                node.removeEventListener("mouseenter", handleEnterEvent);
                node.removeEventListener("mouseleave", handleLeaveEvent);
            });
        }
    };
    return removeListeners;
};

/* -------------------- RESIZE TIP BOX ON CONTENT CHANGE -------------------- */

export const resizeTipBoxes = (editableElement: HTMLElement | null) => {
    if (editableElement) {
        editableElement.querySelectorAll(".tip-text").forEach((node: any) => {
            const text = node.innerText;
            const width = text.length < 10 ? 100 : text.length * 7 + 15;
            node.style.width = `${Math.min(width, 300)}px`;
            node.nextSibling.style.width = `${Math.min(width, 300)}px`;
        });
    }
};

/* -------------------------------------------------------------------------- */
/*                           TOOL TIP FUNCTIONS END                           */
/* -------------------------------------------------------------------------- */

/* ---------------------------- HELPER FUNCTIONS ---------------------------- */

export function removePx(value: string): string {
    return Number.parseFloat(value.slice(0, -2)).toString();
}

export function selectNode(node: any) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection && selection.removeAllRanges();
    selection && selection.addRange(range);
}

export function setState(key: string, data: any) {
    const manager = _getManager();
    const newData: any = {};
    newData[key] = data;
    manager.setState("canvasStates", (prev: CanvasStates) => ({
        ...prev,
        ...newData,
    }));
}
export function cleanEmptyNodes(parent: HTMLElement) {
    const nodes = parent.querySelectorAll("*");
    nodes.forEach((node: Element | any) => {
        if (!node.innerHTML || node.innerHTML === "") {
            node.remove();
        }
    });
}

// const rangeHasStyles = () =>

const isLastRange = (currentRange: any, lastSelection: any) =>
    !currentRange.compareBoundaryPoints(
        Range.START_TO_START,
        lastSelection.range
    ) &&
    !currentRange.compareBoundaryPoints(Range.END_TO_END, lastSelection.range);

const nullifyStyles = (styles: any) => {
    const modified = styles;
    Object.keys(styles).forEach((styleName) => {
        modified[styleName] = null;
    });
    return modified;
};

const clearSelection = () => {
    if (window.getSelection) {
        if (window.getSelection()?.empty) {
            // Chrome
            window.getSelection()?.empty();
        } else if (window.getSelection()?.removeAllRanges) {
            // Firefox
            window.getSelection()?.removeAllRanges();
        }
    } else if ((document as any).selection) {
        // IE?
        (document as any).selection.empty();
    }
};

const startsWithHtmlTextTag = (text: string) => {
    const trimStart = text.substring(0, 15);
    return (
        /(<)([A-Za-z]+)( )/.test(trimStart) ||
        /(<)([A-Za-z]+)(>)/.test(trimStart) ||
        /(<)([A-Za-z]+)(\/>)/.test(trimStart)
    );
};

export const setCursorPosition = (element: any, setter: Function) => {
    setTimeout(() => {
        const selection = document.getSelection();
        if (selection && element.contentEditable) {
            let _range = selection.getRangeAt(0);
            let range = _range.cloneRange();
            range.selectNodeContents(element);
            range.setEnd(_range.endContainer, _range.endOffset);
            setter(range.toString().length);
        }
    }, 200);
};
