import katex from "katex";
import { range } from "utilities/array";
import { randomString } from "utilities/string";
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

export const processInputCharacter = (
    expression: any,
    index: number,
    setList: Function,
    inputState: InputState
) => {
    const base = expression;
    const html = convertLatex(expression, index);
    let inputs = base.matchAll(/(@[0-9])/g);
    inputs = Array.from(inputs).map((a: any) => {
        return a[0];
    });
    const converted = applyInputs([], base);
    if (inputState.activeInput.current) {
        const inputNode = inputState.activeInput.current;
        inputNode.value += expression;
        setTimeout(() => {
            inputNode.focus();
            handleInputChange(inputNode, setList);
        }, 500);
        return;
    }
    setList((prev: any) => {
        return [...prev, { base, converted, html, inputs }];
    });
};

export const convertLatex = (
    math: string,
    dataIndex: number,
    inputs: any = null
) => {
    var html = katex.renderToString(math, {
        throwOnError: false,
    });

    if (inputs === false) {
        return html;
    }

    html = replaceInputAreas(html, dataIndex, inputs);
    return html;
};

const generateInput = (
    inputIndex: number,
    dataIndex: number,
    inputs: any[]
) => {
    const input = document.createElement("input");
    const id = randomString(10);
    input.className = `math-input w-[16px] h-[16px] relative z-[10]
        bg-white text-[14px] text-center text-black mx-auto 
        my-[1px] border-[0.5px] !border-gray-500`;
    input.id = id;
    input.setAttribute("data-input-index", inputIndex.toString());
    input.setAttribute("data-latex-index", dataIndex.toString());

    if (
        inputs &&
        inputs[inputIndex] != null &&
        !inputs[inputIndex].includes("@")
    ) {
        input.setAttribute("value", inputs[inputIndex]);
    }
    return input.outerHTML;
};

const replaceInputAreas = (
    html: string,
    dataIndex: number,
    inputs: any = null
) => {
    html = html.replace(/(@)([0-9])/g, (match, s1, s2, offset, string) =>
        generateInput(s2, dataIndex, inputs)
    );
    return html;
};

const applyInputs = (inputs: any[], latexCode: string) => {
    latexCode = latexCode.replace(
        /(@)([0-9])/g,
        (match, s1, s2, string) => inputs[s2] ?? `${s1}${s2}`
    );
    return latexCode;
};

export const processMathValue = (
    latexDataObject: {
        base: string;
        converted: string;
        inputs: any[];
        html: string;
    },
    index: number
) => {
    var latex = applyInputs(latexDataObject.inputs, latexDataObject.base);
    latexDataObject.converted = latex;
    const html = convertLatex(
        latexDataObject.base,
        index,
        latexDataObject.inputs
    );
    latexDataObject.html = html;
    return latexDataObject;
};

const handleInputBlur = (inputState: InputState) => {
    return (event: any) => {
        const input = event.target as HTMLInputElement;
        setTimeout(() => {
            if (
                inputState.activeInput.current &&
                inputState.activeInput.current.id == input.id
            ) {
                inputState.setActiveInput(null);
                input.removeEventListener("blur", handleInputBlur(inputState));
            }
        }, 300);
    };
};

const handleInputFocus = (inputState: InputState) => {
    return (event: any) => {
        const input = event.target;
        inputState.setActiveInput(input);
        input.addEventListener("blur", handleInputBlur(inputState));
    };
};

const handleInputChange = (element: HTMLInputElement, setList: Function) => {
    const value = element.value;
    let dataIndex = element.getAttribute("data-latex-index") as string;
    if (dataIndex) {
        let inputIndex: number = parseInt(
            element.getAttribute("data-input-index") as string
        );
        setList((prev: any) => {
            return prev.map((data: any, index: number) => {
                if (index == parseInt(dataIndex)) {
                    const inputCount = data.inputs.length;
                    data.inputs = range(inputCount).map((n: number) => {
                        return n - 1 == inputIndex ? value : data.inputs[n - 1];
                    });
                    return data;
                }
                return data;
            });
        });
    }
};

export const addInputEventHandlers = (
    setList: Function,
    inputState: InputState
) => {
    document.querySelectorAll(".math-input").forEach((node: any) => {
        node.addEventListener("change", (event: any) => {
            const element: HTMLInputElement = event.target;
            handleInputChange(element, setList);
            // setTimeout(() => {
            //     addInputEventHandlers(setList, inputState);
            // }, 500);
        });
        node.addEventListener("focus", handleInputFocus(inputState));
    });
};

/* -------------------------------------------------------------------------- */
/*                                NEW FUNCTIONS                               */
/* -------------------------------------------------------------------------- */

export const processExpression = (
    expression: string,
    mathState: MathState,
    inputState: InputState
) => {
    // const inputCount =
    //     mathState.currentValue.match(/(math-input)/g)?.length ?? 0;
    // expression = generateInputIds(expression, inputCount + 1);
    const math = new MathStructure(expression, inputState);
    if (inputState.activeInput.current) {
        const inputNode = inputState.activeInput.current;
        const inputId = inputNode.id.split("-")[1];

        // Check if expression is single character input
        if (expression.length == 1) {
            // This check can be improved later
            inputNode.innerHTML += expression;
            inputState.setInputData &&
                inputState.setInputData((prev: any) => ({
                    ...prev,
                    [inputId]: [...(prev[inputId] ?? []), expression],
                }));
            setTimeout(() => {
                inputNode.focus();
                // inputNode.setSelectionRange(length, length);
                // handleInputFocus(inputState)({ target: inputNode });
            }, 250);
        } else {
            inputState.setInputData &&
                inputState.setInputData((prev: any) => ({
                    ...prev,
                    [inputId]: [
                        ...((prev ? prev[inputId] : null) ?? []),
                        expression,
                    ],
                }));
        }
        return;
    }
    // const updatedLatexData = [...mathState.latexData, math.toHtml()];
    // mathState.setLatexData(updatedLatexData);
    console.log(math.toHtml());
    mathState.setCurrentValue((prev : string) => prev + math.toHtml());
    setTimeout(() => {
        addInputEvents(inputState);
    }, 500);
};

const toMathHtml = (string: string, inline: boolean = false) => {
    const windowObject = window as any;
    let html;
    if (typeof windowObject?.MathJax !== "undefined" && false) {
        // Disable MathJax for now
        html = windowObject?.MathJax.tex2chtml(string).outerHTML;
    } else {
        html = katex.renderToString(string, {
            throwOnError: false,
            displayMode: !inline,
        });
    }
    return html;
};

export const updateMathValue = (
    latexData: any[],
    inputData: any,
    noRender: boolean = false
) => {
    const latexToHtml = toMathHtml(joinLatexData(latexData), noRender);
    if (noRender) {
        return fillLatexHtmlWithValues(latexToHtml);
    }
    const updateWithInputs = convertPlaceholdersToInput(latexToHtml, inputData);
    return updateWithInputs;
};

const fillLatexHtmlWithValues = (latex: string) => {
    return latex.replace(
        /(@)([0-9]+)(@)/g,
        (match, s1, s2, s3, offset, string) => {
            const inputsById = document.querySelectorAll(
                `.math-input#input-${s2}`
            );
            const inputElement: any = Array.from(inputsById).find(
                (input: any) => input.value && input.value !== false
            );
            return inputElement ? inputElement?.value : "?";
        }
    );
};

const generateInputIds = (expression: string, count: number) => {
    return expression.replace(/(@)/g, (match, s1, offset, string) => {
        const id = count;
        count++;
        return `@${id}@`;
    });
};

const convertPlaceholdersToInput = (html: string, inputData: any = null) => {
    let updatedHTML = html.replace(
        /(@)([0-9]+)(@)/g,
        (match, s1, s2, s3, offset, string) => createInput(s2, inputData)
    );
    return updatedHTML;
};

const createInput = (id: string, inputData: any) => {
    const span = document.createElement("span");
    span.className = `math-input inline-block w-auto h-auto min-w-[18px] min-h-[18px] relative z-[10]
        bg-white text-[13px] text-center text-black mx-auto
        border-[0.5px] !border-gray-500`;
    span.id = `input-${id}`;
    span.contentEditable = "true";
    // Check for existing input data for id
    if (inputData && inputData[id] && inputData[id].length > 0) {
        span.innerHTML = updateMathValue(inputData[id], inputData);
        // span.innerHTML = "<span class='math-input w-[15px] h-[80px] inline-block relative'><span/>"
    }
    return span.outerHTML;
};

const replaceInputWithLatex = (
    inputNode: HTMLInputElement,
    expression: string[],
    mathState: MathState
) => {
    const inputId = inputNode.id.split("-")[1];
    const parentExpression = mathState.latexData.find((ex: string) =>
        ex.includes(`@${inputId}@`)
    );
    const updatedParentExpression = parentExpression.replace(
        `@${inputId}@`,
        expression.join("")
    );
    const updatedLatexData = mathState.latexData.map((ex: string) =>
        ex == parentExpression ? updatedParentExpression : ex
    );
    mathState.setLatexData(updatedLatexData);
    const latexToHtml = toMathHtml(joinLatexData(updatedLatexData));
    const updateWithInputs = convertPlaceholdersToInput(latexToHtml);
    mathState.setCurrentValue(updateWithInputs);
};

const joinLatexData = (latexDataArray: (string[] | string)[]): string => {
    return latexDataArray
        .map((data: string[] | string) => {
            return typeof data == "object" ? joinLatexData(data) : data;
        })
        .join("");
};

export const addInputEvents = (inputState: InputState) => {
    document.querySelectorAll(".math-input").forEach((node: any) => {
        node.addEventListener("change", (event: any) => {
            const element: HTMLInputElement = event.target;
            inputState.setInputData &&
                inputState.setInputData((prev: any) => ({
                    ...prev,
                    [element.id]: element.value,
                }));
        });
        node.addEventListener("focus", handleInputFocus(inputState));
    });
};
