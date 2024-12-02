import katex from "katex";
import MathStructure from "./MathStructure";

export type InputState = {
    activeInput: any;
    setActiveInput: Function;
    inputData?: any;
    setInputData?: Function;
};

export type MathState = {
    currentValue: any;
    setCurrentValue: Function;
    latexData: any;
    setLatexData: Function;
};
export const processExpression = (
    expression: string,
    mathState: MathState,
    inputState: InputState
) => {
    if (inputState.activeInput) {
        const inputNode = inputState.activeInput;
        const parentStructure: MathStructure = mathState.latexData.find(
            (mathStructure: MathStructure) => {
                return (
                    mathStructure.id ==
                    inputNode.getAttribute("data-structure-id")
                );
            }
        );
        // Check if expression is single character input
        if (expression.length == 1) {
            // This check can be improved later
            inputNode.innerHTML += expression;
            parentStructure.appendToInputData(expression, inputNode.id);
            setTimeout(() => {
                inputNode.focus();
                setCursor(inputNode);
            }, 100);
        } else {
            const math = new MathStructure(
                expression,
                inputState,
                parentStructure.level + 1
            );
            mathState.setLatexData((prev: any) => [...prev, math]);
            parentStructure.appendToInputData(math, inputNode.id);
            inputNode.innerHTML += `<span contenteditable="false">${math.extractDeepHtml()}</span>`;
            setTimeout(() => {
                inputNode.focus();
                setCursor(inputNode);
            }, 100);
        }
        return;
    }
    const math = new MathStructure(expression, inputState);
    mathState.setLatexData((prev: any) => [...prev, math]);
    mathState.setCurrentValue((prev: string) => prev + math.toHtml());
};

const setCursor = (element: HTMLElement) => {
    var range = document.createRange();
    var sel: any = window.getSelection();
    const lastNode: any = element.childNodes[element.childNodes.length - 1];
    range.setStart(lastNode, lastNode.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
};

export const extractFinalMath = (latexData: any[], level: number = 1) => {
    let latexCode = "";
    latexData
        .filter((l: any) => l.level == 1)
        .forEach((data: any) => {
            if (data instanceof MathStructure) {
                const math = data as MathStructure;
                latexCode += math.fillInputSlots();
            } else {
                latexCode += data;
            }
        });
    let html = katex.renderToString(latexCode, {
        throwOnError: false,
        displayMode: false,
    });
    return `<span class="latex-math" contenteditable="false" data-latex-code="${latexCode}">${html}</span>`;
};

export const registerInputHandlers = (
    inputState: InputState,
    mathState: MathState
) => {
    (window as any).handleMathInput = (element: any, event: any) => {
        const activeInput: any = document.activeElement;
        const elementStructureId = element.getAttribute("data-structure-id");
        const activeStructureId = activeInput.getAttribute("data-structure-id");
        if (elementStructureId == activeStructureId) {
            const math = mathState.latexData.find(
                (m: MathStructure) => m.id == elementStructureId
            );
            if (math) {
                math.appendToInputData(event.data, activeInput.id);
            }
        }
    };
    (window as any).handleMathInputFocus = (element: any, event: any) => {
        inputState.setActiveInput(element);
        element.setAttribute("oninput", "window.handleMathInput(this, event)");
    };
    (window as any).handleMathInputBlur = (element: any, event: any) => {
        setTimeout(() => {
            if (
                document.activeElement !== element &&
                !document.activeElement?.classList.contains("math-button") &&
                !document.activeElement?.id.includes("input")
            ) {
                inputState.setActiveInput(null);
                element.setAttribute("oninput", "null;");
            }
        }, 100);
    };
};
