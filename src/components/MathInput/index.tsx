import { FC, useEffect, useRef, useState } from "react";
import {
    extractFinalMath,
    processExpression,
    registerInputHandlers,
} from "./handler";
import { NthRootImage, SquareRootImage } from "./MathAssets/MathSVG";

const MathInput: FC<{ close: Function; callback: Function }> = ({
    close,
    callback,
}) => {
    const [currentValue, setCurrentValue] = useState<string>("");
    const [latexData, setLatexData] = useState<any[]>([]);
    const [inputData, setInputData] = useState<{ [key: string]: any }>();
    const [activeInput, setActiveInput] = useState<any>(null);
    const activeInputRef = useRef<any>();

    const getMathState = () => ({
        currentValue,
        setCurrentValue,
        latexData,
        setLatexData,
    });

    const getInputState = () => ({
        activeInput,
        setActiveInput,
        setInputData,
    });
    const handleKeyboardButton = (expression: string) => {
        processExpression(expression, getMathState(), getInputState());
    };

    useEffect(() => {
        registerInputHandlers(getInputState(), getMathState());
    }, [latexData]);

    return (
        <div className="absolute w-screen h-screen z-[30] top-0">
            <div className="w-screen h-screen absolute bg-black opacity-[0.7] top-0"></div>
            <div className="w-[100%] absolute top-[100px] h-auto p-3">
                <div className="w-[60%] bg-white mx-auto border-[1px] rounded-t-md">
                    <div
                        className="math-area w-[100%] min-h-[80px] h-auto bg-white border-[1px] rounded-t-md text-black text-[16px] flex justify-center items-center"
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
                                callback(extractFinalMath(latexData));
                                close();
                            }}
                        >
                            Insert
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-[85%] left-0 right-0 mx-auto absolute bottom-0">
                <div className="bg-gray-400 shadow-lg rounded-lg p-4 w-full">
                    <div className="grid grid-cols-10 gap-2">
                        <button
                            onClick={() => handleKeyboardButton("1")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            1
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("2")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            2
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("3")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            3
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\sin(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            sin
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\cos(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            cos
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\tan(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            tan
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("\\bigcap_1^{@} p")
                            }
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ⋂
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("+")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            +
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\pi")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            π
                        </button>
                        <button
                            onClick={() => {
                                setLatexData((prev) => prev.slice(0, -1));
                            }}
                            className="math-button flex justify-center items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        >
                            C
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("4")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            4
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("5")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            5
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("6")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            6
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\asin(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            asin
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\acos(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            acos
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\atan(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            atan
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("\\bigcup_1^{k} p")
                            }
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ⋃
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\div")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ÷
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("(")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            (
                        </button>
                        <button
                            onClick={() => handleKeyboardButton(")")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            )
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("7")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            7
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("8")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            8
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("9")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            9
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\log(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            log
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\ln(@)")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ln
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("e^{@}")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            exp
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("\\sqrt{@}")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            <SquareRootImage />
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("-")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            −
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("e")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            e
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("1")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ^
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("0")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            0
                        </button>
                        <button
                            onClick={() => handleKeyboardButton(".")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            .
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("=")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
                        >
                            =
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("10^{@}")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            10<sup>x</sup>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("{@}^{@}")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x<sup>y</sup>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("{@}_{@}")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x<sub>y</sub>
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("\\sqrt[{@}]{@}")
                            }
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            <NthRootImage />
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\times")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ×
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("1")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            %
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\pm")}
                            className="math-button flex justify-center items-center bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ±
                        </button>

                        <button
                            onClick={() => handleKeyboardButton("x")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑥
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("y")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑦
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("z")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            𝑧
                        </button>

                        <button
                            onClick={() =>
                                handleKeyboardButton(
                                    "\\int_{@}^{@} {@2} \\, dx"
                                )
                            }
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ∫
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\Theta")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            Θ
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("\\sum_{i=@}^{@} i")
                            }
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            Σ
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("{@}!")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            x!
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\frac{@}{@}")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            <sup>x</sup>/<sub>y</sub>
                        </button>
                        <button
                            onClick={() => handleKeyboardButton("\\infty")}
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            ∞
                        </button>
                        <button
                            onClick={() =>
                                handleKeyboardButton("\\lim_{n \to infty}{@}_n")
                            }
                            className="math-button flex justify-center items-center bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                        >
                            lim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MathInput;
