import katex from "katex";
import { randomString } from "utilities/string";
import { InputState, MathState } from "./handler";

interface MathStructureInterface {
    id: string;
    level: number;
    latexCode: string;
    toHtml: Function;
    hasInput: boolean;
    inputs: any;
    extractDeepHtml: Function;
    appendToInputData: Function;
    fillInputSlots: Function;
}

class MathStructure implements MathStructureInterface {
    id: string = randomString(8);
    latexCode: string;
    inputs: any = {};
    level: number = 1;
    hasInput: boolean;
    constructor(latex: string, inputState: InputState, level: number = 1) {
        this.latexCode = latex;
        this.level = level;
        this.hasInput = this.latexCode.includes("@");
    }

    toHtml(inline: boolean = false) {
        const latex = this.generateInputIds(this.latexCode);
        let html = katex.renderToString(latex, {
            throwOnError: false,
            displayMode: !inline,
        });
        html = this.convertPlaceholdersToInput(html);
        return `<span id="${this.id}" contenteditable="false">${html}</span>`;
    }

    convertPlaceholdersToInput(html: string) {
        let updatedHTML = html.replace(
            /(@)([0-9]+)(@)/g,
            (match, s1, s2, s3, offset, string) => this.createInput(s2)
        );
        return updatedHTML;
    }
    generateInputIds(expression: string, count: number = 1) {
        let id = count;
        return expression.replace(/(@)/g, (match, s1, offset, string) => {
            this.inputs[id.toString()] = this.inputs[id.toString()] ?? [];
            const replacement = `@${id}@`;
            id++;
            return replacement;
        });
    }
    fillInputSlots(count: number = 1) {
        let id = count;
        return this.latexCode.replace(/(@)/g, (match, s1, offset, string) => {
            const inputData = this.inputs[id.toString()];
            id++;
            let finalInput = "";
            inputData.forEach((i: any) => {
                finalInput +=
                    i instanceof MathStructure ? i.fillInputSlots() : i;
            });
            return finalInput;
        });
    }
    createInput(id: string) {
        const span = document.createElement("span");
        span.className = `math-input inline-block w-auto h-auto max-h-full relative
         z-[10] bg-transparent text-[14px] text-center text-black 
         mx-auto hover:bg-[#f8f8f8] border-[0.5px] !border-[#dbdbdb] hover:!border-gray-500 px-2`;
        span.style.minHeight = 24 - this.level * 3 + "px";
        span.style.minWidth = 24 - this.level * 3 + "px";
        span.id = `input-${id}`;
        span.setAttribute("data-structure-id", this.id);
        span.contentEditable = "true";
        span.setAttribute("oninput", "window.handleMathInput(this, event)");
        span.setAttribute(
            "onfocus",
            "window.handleMathInputFocus(this, event)"
        );
        span.setAttribute("onblur", "window.handleMathInputBlur(this, event)");
        return span.outerHTML;
    }

    appendToInputData(math: MathStructure | any, id: string) {
        id = id.split("-")[1];
        console.log(id);
        console.log(this.id);
        console.log("BEFORE", this.inputs[id.toString()]);
        console.log(math);
        if (this.inputs[id.toString()]) {
            this.inputs[id.toString()].push(math);
        } else {
            this.inputs[id.toString()] = [];
            this.inputs[id.toString()] = [math];
        }
        console.log("AFTER", this.inputs[id.toString()]);
    }

    extractDeepHtml() {
        const abstractDiv = document.createElement("div");
        abstractDiv.innerHTML = this.toHtml();
        return abstractDiv.querySelector(".katex-html")?.innerHTML;
    }
}

export default MathStructure;
