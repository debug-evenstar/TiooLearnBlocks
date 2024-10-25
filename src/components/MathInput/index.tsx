import { FC, useEffect, useRef, useState } from "react";
import {
    addInputEventHandlers,
    convertLatex,
    processInputCharacter,
    processMathValue,
} from "./handler";
import { NthRootImage, SquareRootImage } from "./MathAssets/MathSVG";

const MathInput: FC<{ close: Function; callback: Function }> = ({
    close,
    callback,
}) => {
    const [currentValue, setCurrentValue] = useState<string>("");
    const [latexData, setLatexData] = useState<any[]>([]);
    const [activeInput, setActiveInput] = useState<any>(null);
    const activeInputRef = useRef<any>();
    const handleKeyboardButton = (expression: string) => {
        processInputCharacter(expression, latexData.length, setLatexData, {
            activeInput: activeInputRef,
            setActiveInput,
        });
    };

    const finalMath = () => {
        return latexData.map((data) => data.converted).join(" ");
    }

    useEffect(() => {
        activeInputRef.current = activeInput;
    }, [activeInput]);

    useEffect(() => {
        setCurrentValue((prev: any) => {
            //Process expressions
            const processed = latexData.map(
                (data: any, index: number) => processMathValue(data, index).html
            );
            return processed.join("");
        });
        setTimeout(() => {
            addInputEventHandlers(setLatexData, {
                activeInput: activeInputRef,
                setActiveInput,
            });
        }, 500);
    }, [latexData]);
    return (
        <>
            <div className="w-screen h-screen absolute bg-black opacity-[0.7] top-0"></div>
            <div className="w-[100%] absolute top-[100px] h-auto p-3">
                <div className="w-[60%] bg-white mx-auto border-[1px] rounded-t-md">
                    <div
                        className="w-[100%] min-h-[80px] h-auto bg-white border-[1px] rounded-t-md text-black text-[16px] flex justify-center items-center"
                        dangerouslySetInnerHTML={{ __html: currentValue }}
                    ></div>
                    <div className="flex w-[100%] justify-between">
                        <button
                            className="min-w-[100px] my-[1px] p-3 text-center text-white bg-red-500 border-transparent rounded-r-md"
                            onClick={() => close()}
                        >
                            Cancel
                        </button>
                        <button
                            className="min-w-[90px] my-[1px] p-3 text-center text-white bg-green-500 border-transparent rounded-l-md"
                            onClick={() => {
                                callback(convertLatex(finalMath(),0,false));
                                close();
                            }}
                        >
                            Insert
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[96%] absolute bottom-0">
                <div className="bg-gray-400 shadow-lg rounded-lg p-4 w-full">
                    <div className="grid grid-cols-10 gap-2">
                        <button
                            onClick={() => handleKeyboardButton("1")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            1
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("2")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            2
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("3")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            3
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\sin(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            sin
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\cos(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            cos
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\tan(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            tan
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\bigcap_1^{@0} p")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ⋂
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("+")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            +
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\pi")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            π
                        </button>
                        <button
                            onClick={() => {
                                setLatexData((prev) => prev.slice(0, -1));
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                            C
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("4")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            4
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("5")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            5
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("6")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            6
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\asin(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            asin
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\acos(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            acos
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\atan(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            atan
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\bigcup_1^{k} p")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ⋃
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\div")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ÷
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("(")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            (
                        </button>
                        <button
                            onClick={() => handleKeyboardButton(")")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            )
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("7")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            7
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("8")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            8
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("9")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            9
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\log(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            log
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\ln(@0)")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ln
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("e^{@0}")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            exp
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("\\sqrt{@0}")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            <SquareRootImage/>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("-")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            −
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("e")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            e
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("1")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ^
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("0")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            0
                        </button>
                        <button
                            onClick={() => handleKeyboardButton(".")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            .
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("=")}
                            className="bg-gray-100 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
                        >
                            =
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("10^{@0}")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            10<sup>x</sup>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("{@0}^{@1}")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x<sup>y</sup>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("{@0}_{@1}")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x<sub>y</sub>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\sqrt[{@0}]{@1}")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            <NthRootImage/>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\times")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ×
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("1")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            %
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\sqrt{@0}")}
                            className="bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            √
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("x")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑥
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("y")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑦
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("z")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑧
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton(
                                    "\\int_{@0}^{@1} {@2} \\, dx"
                                )
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ∫
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\Theta")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            Θ
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("\\sum_{i=@0}^{@1} i")
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            Σ
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("{@0}!")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x!
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("\\frac{@0}{@1}")
                            }
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            <sup>x</sup>/<sub>y</sub>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\infty")}
                            className="bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ∞
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton(
                                    "\\lim_{n \to infty}{@0}_n"
                                )
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
