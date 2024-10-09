import React, { FC, useEffect, useState } from "react";
// import { handleKeyboardButton } from "./handler";
import { mathjax } from "mathjax-full/js/mathjax";
import { TeX } from "mathjax-full/js/input/tex";
import { CHTML } from "mathjax-full/js/output/chtml";
import { SVG } from "mathjax-full/js/output/svg";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html";

const MathInput: FC<any> = ({}) => {
    const adaptor = liteAdaptor();
    RegisterHTMLHandler(adaptor);

    // const MathJax = {
    //     enableAssistiveMml: true,
    //     scale: 1,                                                       // global scaling factor for all expressions
    //     minScale: .5,                                                   // smallest scaling factor to use
    //     mtextInheritFont: false,                                        // true to make mtext elements use surrounding font
    //     merrorInheritFont: true,                                        // true to make merror text use surrounding font
    //     mathmlSpacing: false,                                           // true for MathML spacing rules, false for TeX rules
    //     skipAttributes: {},                                             // RFDa and other attributes NOT to copy to the output
    //     exFactor: .5,                                                   // default size of ex in em units
    //     displayAlign: 'center',                                         // default for indentalign when set to 'auto'
    //     displayIndent: '0',                                             // default for indentshift when set to 'auto'
    //     matchFontHeight: true,                                          // true to match ex-height of surrounding font
    //     fontURL: '[mathjax]/components/output/chtml/fonts/woff-v2',     // The URL where the fonts are found
    //     adaptiveCSS: false                                               // true means only produce CSS that is used in the processed equations
    // }

    // const MathJax = {
    //     chtml: {
    //         scale: 1, // global scaling factor for all expressions
    //         minScale: 0.5, // smallest scaling factor to use
    //         mtextInheritFont: false, // true to make mtext elements use surrounding font
    //         merrorInheritFont: false, // true to make merror text use surrounding font
    //         mtextFont: "", // font to use for mtext, if not inheriting (empty means use MathJax fonts)
    //         merrorFont: "serif", // font to use for merror, if not inheriting (empty means use MathJax fonts)
    //         unknownFamily: "serif", // font to use for character that aren't in MathJax's fonts
    //         mathmlSpacing: false, // true for MathML spacing rules, false for TeX rules
    //         skipAttributes: {}, // RFDa and other attributes NOT to copy to the output
    //         exFactor: 0.5, // default size of ex in em units
    //         displayAlign: "center", // default for indentalign when set to 'auto'
    //         displayIndent: "0", // default for indentshift when set to 'auto'
    //     },
    // };
    // const mathjax_document = mathjax.document("", {
    //     InputJax: new TeX({ packages: AllPackages }),
    //     OutputJax: new CHTML(),
    // });

    const mathjax_document = mathjax.document('', {
        InputJax: new TeX({ packages: AllPackages }),
        OutputJax: new SVG({ fontCache: 'local' })
    })

    const mathjax_options = {
        em: 16,
        ex: 8,
        containerWidth: 1280,
    };

    function get_mathjax_html(math: string): string {
        const node = mathjax_document.convert(math, mathjax_options);
        return adaptor.innerHTML(node);
    }

    const [currentValue, setCurrentValue] = useState<string>("");
    const [latexValue, setLatexValue] = useState<string>("");
    const handleKeyboardButton = (a:any,b:any) => {}

    useEffect(() => {
        setTimeout(() => {
            const ish = get_mathjax_html(`\\frac{x}{y}`);
            setCurrentValue(ish);
        }, 2000);
    }, []);
    return (
        <>
            <div
                className="w-[60%] bg-green-400 absolute text-white top-[100px] h-[80px] p-3"
                dangerouslySetInnerHTML={{ __html: currentValue }}
            ></div>
            <div className="w-[95%] absolute bottom-0">
                <div className="bg-gray-400 shadow-lg rounded-lg p-4 w-full">
                    <div className="grid grid-cols-9 gap-2">
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            1
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("2", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            2
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("3", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            3
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("sin", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            sin
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("cos", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            cos
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("tan", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            tan
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("+", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            +
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("π", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            π
                        </button>
                        <button
                            onClick={() => {}}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                            C
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton("4", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            4
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("5", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            5
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("6", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            6
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("asin", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            asin
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("acos", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            acos
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("atan", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            atan
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("÷", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ÷
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("(", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            (
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton(")", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            )
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton("7", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            7
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("8", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            8
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("9", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            9
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            log
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ln
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            exp
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            −
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            e
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ^
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            0
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            .
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                            =
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            10<sup>x</sup>
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x<sup>y</sup>
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x!
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ×
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            %
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            √
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑥
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑦
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑧
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ∫
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ∂
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("Σ", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            Σ
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            Δ
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ∞
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("1", setCurrentValue)
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            lim
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MathInput;
