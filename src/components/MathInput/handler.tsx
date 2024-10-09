import katex from "katex";
import { range } from "utilities/array";
import { randomString } from "utilities/string";

type InputState = { activeInput: any; setActiveInput: Function };

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

export const convertLatex = (math: string, dataIndex: number, inputs: any = null) => {
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
    input.className =
        `math-input w-[16px] h-[16px] relative z-[10]
        bg-white text-[14px] text-center text-black mx-auto 
        my-[1px] border-[0.5px] !border-gray-100 hover:!border-gray-400 focus:!border-gray-500`;
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
