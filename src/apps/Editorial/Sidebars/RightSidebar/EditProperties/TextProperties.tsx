/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { ManagerInterface } from "apps/Editorial/Base/Manager";
import React, { FC, useEffect, useState } from "react";
import {
    RiAlignCenter,
    RiAlignJustify,
    RiAlignLeft,
    RiAlignRight,
    RiArrowDropDownFill,
    RiArrowDropUpFill,
    RiBold,
    RiH1,
    RiH2,
    RiH3,
    RiItalic,
    RiLink,
    RiLinkUnlink,
    RiListCheck,
    RiListOrdered,
    RiListUnordered,
    RiStrikethrough,
    RiUnderline,
} from "react-icons/ri";
import { ColorResult, SketchPicker } from "react-color";
import { toggleWrapperStyle } from "apps/Editorial/Components/Text/handlers/stylesHandler";
import { CurrentStylesState } from "apps/Editorial/Base/StateInterface";
import {
    TextFormatType,
    formatText,
    getRange,
    handleAddTip,
    handleInsertMath,
    textComponentData,
    toggleList,
    verifySelectionProperty,
} from "apps/Editorial/Components/Text/handler";
import { getParseTreeNode } from "typescript";
import {
    FaCommentAlt,
    FaInfinity,
    FaPercentage,
    FaSquareRootAlt,
    FaSuperscript,
} from "react-icons/fa";

interface Props {
    manager: ManagerInterface;
    propertiesActiveState?: any;
    toggleTextPropertyActiveState?: any;
}

const TextProperties: FC<Props> = ({ manager }) => {
    const id = manager.states.activeViewBox;
    const parent = document.getElementById(id) as HTMLDivElement;
    const activeElement: any = parent?.firstChild;

    const states = manager.states;
    const {
        textColor: currentTextColor,
        textSize: currentTextSize,
        textSpacing: currentTextSpacing,
        font: currentFont,
    } = states.currentStyles;

    const currentStyles = states.currentStyles;

    const toggleWrapperStyle =
        manager.canvasManager.canvas.functions?.toggleWrapperStyle;

    const [isActive, setIsActive] = useState(false);
    const [colorIsActive, setColorIsActive] = useState(false);
    const [textColor, setTextColor] = useState("#000000");
    const [textSize, setTextSize] = useState("16");
    const [textSpacing, setTextSpacing] = useState(`${+textSize * 1.2}`);
    const [selectedFont, setSelectedFont] = useState("Arial");
    const fonts = [
        "Arial",
        "Times New Roman",
        "Roboto",
        "Helvetica",
        "Courier New",
    ];
    const defaultProperties: any = {
        align: "left",
    };
    const [propertiesActiveState, setPropertiesActiveState] =
        useState<any>(defaultProperties);

    const handleChangeTextColor = (color: ColorResult) => {
        setTextColor(color.hex);
        formatText(TextFormatType.STYLE, "span", { color: color.hex });
        setColorIsActive(false);
    };

    const handleChangeTextSize = (size: string) => {
        setTextSize(size);
        const element = formatText(TextFormatType.STYLE, "span", {
            fontSize: size + "px",
        });
        if (element) {
            const canvasView = document.getElementById("editorial-canvas")
                ?.clientWidth as number;
            element.setAttribute("data-type", "text");
            element.setAttribute("data-container-pixel", canvasView.toString());
        }
    };

    const handleChangeTextSpacing = (spacing: string) => {
        setTextSpacing(spacing);
        formatText(TextFormatType.STYLE, "span", { lineHeight: spacing });
    };

    const handleFontChange = (newFont: string) => {
        setSelectedFont(newFont);
    };

    const toggleTextPropertyActiveState = (
        propertyName: string,
        state: any = null
    ) => {
        const update: any = {};
        update[propertyName] =
            state !== null ? state : !propertiesActiveState[propertyName];
        setPropertiesActiveState((prev: any) => ({ ...prev, ...update }));
    };

    // Function to get the primary text node in active component is <... class="main">....</..>
    const getPrimaryTextNode = () => {
        return manager.states.canvasStates?.editableTextRef.current?.querySelector(
            ".main"
        ) as HTMLElement;
    };

    const handleActiveStyles = (propertyName: string, value: any = true) =>
        propertiesActiveState[propertyName] === value
            ? "text-white bg-[#E6E6FA]"
            : "";

    useEffect(() => {
        setTextColor(currentTextColor);
        setSelectedFont(currentFont);
    }, [currentStyles]);

    useEffect(() => {
        if (!activeElement) return;
        manager.canvasManager.canvas.functions.updateActiveComponentData(
            textComponentData(activeElement.innerHTML)
        );
    }, [activeElement?.innerHTML]);

    useEffect(() => {
        document.addEventListener("selectionchange", (event) => {
            verifySelectionProperty();
        });
    }, []);

    useEffect(() => {
        verifySelectionProperty();
    }, [isActive]);

    return (
        <div className="w-full my-5 py-2">
            <a
                href="javascript:void(0)"
                className={`w-full flex justify-between items-center cursor-pointer ${
                    isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
                }`}
                onClick={() => setIsActive(!isActive)}
            >
                <p className="text-[15px]">Text Properties</p>
                {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
            </a>

            {isActive && (
                <main className="w-full shadow-md relative">
                    <section className="flex flex-wrap py-4">
                        <TextEditProperties
                            manager={manager}
                            propertiesActiveState={propertiesActiveState}
                            toggleTextPropertyActiveState={
                                toggleTextPropertyActiveState
                            }
                        />
                    </section>

                    <section className="w-full flex justify-between items-center py-4">
                        <div className="flex items-center gap-2">
                            <p className="text-[12px]">Font: </p>
                            <select
                                className="w-[50%] text-sm bg-white p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4f46e5] focus:border-[#4f46e5] sm:text-sm"
                                value={selectedFont}
                                onChange={(e) => {
                                    formatText(TextFormatType.STYLE, "span", {
                                        fontFamily: e.target.value,
                                    });
                                    setSelectedFont(e.target.value);
                                }}
                            >
                                {fonts.map((font) => (
                                    <option
                                        key={font}
                                        value={font}
                                        className="text-[12px]"
                                    >
                                        {font}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <a href="javascript:void(0)">
                            <div className="flex items-center gap-2">
                                <p
                                    onClick={() =>
                                        handleChangeTextSize(`${+textSize - 1}`)
                                    }
                                >
                                    <b>-</b>
                                </p>
                                <input
                                    className="border h-6 w-8 text-center text-[12px]"
                                    placeholder="0"
                                    value={textSize}
                                    onChange={(e) =>
                                        handleChangeTextSize(e.target.value)
                                    }
                                />
                                <p
                                    onClick={() =>
                                        handleChangeTextSize(`${+textSize + 1}`)
                                    }
                                >
                                    <b>+</b>
                                </p>
                            </div>
                        </a>
                    </section>

                    <section className="w-full border flex justify-between my-4 p-2">
                        <button
                            className={
                                "border p-2 cursor-pointer" +
                                handleActiveStyles("align", "left")
                            }
                            onClick={() => {
                                formatText(
                                    TextFormatType.STYLE,
                                    getPrimaryTextNode(),
                                    { textAlign: "left " }
                                );
                                toggleTextPropertyActiveState("align", "left");
                            }}
                        >
                            <RiAlignLeft className="cursor-pointer" />
                        </button>

                        <button
                            className={
                                "border p-2 cursor-pointer" +
                                handleActiveStyles("align", "center")
                            }
                            onClick={() => {
                                formatText(
                                    TextFormatType.STYLE,
                                    getPrimaryTextNode(),
                                    { textAlign: "center" }
                                );
                                toggleTextPropertyActiveState(
                                    "align",
                                    "center"
                                );
                            }}
                        >
                            <RiAlignCenter className="cursor-pointer" />
                        </button>

                        <button
                            className={
                                "border p-2 cursor-pointer" +
                                handleActiveStyles("align", "right")
                            }
                            onClick={() => {
                                formatText(
                                    TextFormatType.STYLE,
                                    getPrimaryTextNode(),
                                    { textAlign: "right" }
                                );
                                toggleTextPropertyActiveState("align", "right");
                            }}
                        >
                            <RiAlignRight className="cursor-pointer" />
                        </button>

                        <button
                            className={
                                "border p-2 cursor-pointer" +
                                handleActiveStyles("align", "justify")
                            }
                            onClick={() => {
                                formatText(
                                    TextFormatType.STYLE,
                                    getPrimaryTextNode(),
                                    { textAlign: "justify" }
                                );
                                toggleTextPropertyActiveState(
                                    "align",
                                    "justify"
                                );
                            }}
                        >
                            <RiAlignJustify className="cursor-pointer" />
                        </button>
                    </section>

                    <section className="w-full py-4">
                        <div
                            className={`${
                                !colorIsActive && "flex"
                            } items-center gap-2 mb-4`}
                        >
                            <button
                                className={`text-[12px] cursor-pointer ${
                                    colorIsActive && "mb-4"
                                }`}
                                onClick={() => setColorIsActive(!colorIsActive)}
                            >
                                Text color:
                            </button>
                            {!colorIsActive && (
                                <button
                                    className="text-center"
                                    onClick={() => setColorIsActive(true)}
                                >
                                    <b className="w-full">A</b>
                                    <div
                                        className="h-1 w-6"
                                        style={{
                                            backgroundColor: textColor,
                                        }}
                                    />
                                </button>
                            )}
                            <button
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                }}
                            >
                                {colorIsActive && (
                                    <SketchPicker
                                        width="90%"
                                        color={textColor}
                                        onChange={(color) =>
                                            handleChangeTextColor(color)
                                        }
                                    />
                                )}
                            </button>
                        </div>

                        <a href="javascript:void(0)">
                            <div className="flex items-center gap-2">
                                <p className="text-[12px]">Spacing: </p>
                                <div className="flex items-center gap-2">
                                    <p
                                        onClick={() =>
                                            handleChangeTextSpacing(
                                                `${+textSpacing - 1}`
                                            )
                                        }
                                    >
                                        <b>-</b>
                                    </p>
                                    <input
                                        className="border h-6 w-8 text-center text-[12px]"
                                        placeholder="0"
                                        value={textSpacing}
                                        onChange={(e) =>
                                            handleChangeTextSpacing(
                                                e.target.value
                                            )
                                        }
                                    />
                                    <p
                                        onClick={() =>
                                            handleChangeTextSpacing(
                                                `${+textSpacing + 1}`
                                            )
                                        }
                                    >
                                        <b>+</b>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </section>
                </main>
            )}
        </div>
    );
};

const TextEditProperties: FC<Props> = ({
    manager,
    propertiesActiveState,
    toggleTextPropertyActiveState,
}) => {
    const unLink = manager.canvasManager.canvas.functions?.unLink;

    const [linkBoxActive, setLinkBoxActive] = useState(false);
    const [linkBoxValue, setLinkBoxValue] = useState("");

    const handleAddLink = () => {
        setLinkBoxValue("");
        setLinkBoxActive(false);
    };

    const handleActiveStyles = (propertyName: string) =>
        propertiesActiveState[propertyName] ? "text-white bg-[#E6E6FA]" : "";

    useEffect(() => {
        manager.canvasManager.canvas.functions.toggleTextEditPropertyActiveState =
            (property: string, state: boolean | null = null) => {
                toggleTextPropertyActiveState(property, state);
            };
    }, []);

    return (
        <>
            <a
                className={
                    "border p-2 cursor-pointer" + handleActiveStyles("bold")
                }
                href="javascript:void(0)"
                onClick={() => {
                    formatText(TextFormatType.STYLE, "span", {
                        fontWeight: "bold",
                    });
                    toggleTextPropertyActiveState("bold");
                }}
            >
                <RiBold />
            </a>

            <a
                className={
                    "border p-2 cursor-pointer" + handleActiveStyles("italic")
                }
                href="javascript:void(0)"
                onClick={() => {
                    formatText(TextFormatType.STYLE, "span", {
                        fontStyle: "italic",
                    });
                    toggleTextPropertyActiveState("italic");
                }}
            >
                <RiItalic />
            </a>

            <a
                className={
                    "border p-2 cursor-pointer" +
                    handleActiveStyles("underline")
                }
                href="javascript:void(0)"
                onClick={() => {
                    formatText(TextFormatType.STYLE, "span", {
                        textDecoration: "underline",
                    });
                    toggleTextPropertyActiveState("underline");
                }}
            >
                <RiUnderline />
            </a>

            <a
                className={
                    "border p-2 cursor-pointer" +
                    handleActiveStyles("linethrough")
                }
                href="javascript:void(0)"
                onClick={() => {
                    formatText(TextFormatType.STYLE, "span", {
                        textDecoration: "line-through",
                    });
                    toggleTextPropertyActiveState("linethrough");
                }}
            >
                <RiStrikethrough />
            </a>

            {/* <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          formatText(TextFormatType.WRAP, "h1");
        }}
      >
        <RiH1 />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          formatText(TextFormatType.WRAP, "h2");
        }}
      >
        <RiH2 />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          formatText(TextFormatType.WRAP, "h3");
        }}
      >
        <RiH3 />
      </a> */}

            <div className="border p-2 cursor-pointer">
                <a href="javascript:void(0)" onClick={() => toggleList("ol")}>
                    <RiListOrdered />
                </a>
            </div>
            <div className="border p-2 cursor-pointer">
                <a href="javascript:void(0)" onClick={() => toggleList("ul")}>
                    <RiListUnordered />
                </a>
            </div>

            <div className="border p-2 cursor-pointer">
                <a
                    href="javascript:void(0)"
                    onClick={() => setLinkBoxActive(!linkBoxActive)}
                >
                    <RiLink />
                </a>

                {linkBoxActive && (
                    <section className="bg-white border p-2 absolute left-0">
                        <input
                            className="border p-2 h-10 w-40 text-[12px]"
                            placeholder="Input link here"
                            value={linkBoxValue}
                            onChange={(e) => setLinkBoxValue(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                            <a
                                className="bg-[#4F46E5] text-[12px] text-white p-1.5"
                                href="javascript:void(0)"
                                onClick={handleAddLink}
                            >
                                Add link
                            </a>
                            <button
                                className="bg-[#4F46E5] text-[12px] text-white p-1"
                                onClick={() => setLinkBoxActive(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </section>
                )}
            </div>

            <div className="border p-2 cursor-pointer">
                <a href="javascript:void(0)" onClick={() => unLink()}>
                    <RiLinkUnlink />
                </a>
            </div>

            <div className="border p-2 cursor-pointer">
                <a
                    href="javascript:void(0)"
                    onClick={() => {
                        handleAddTip("....");
                    }}
                >
                    <FaCommentAlt fill="#7a7a7a" />
                </a>
            </div>

            <div className="border p-2 cursor-pointer">
                <a
                    href="javascript:void(0)"
                    onClick={() => {
                        manager.event.emit("togglePlugin", {
                            name: "MathInput",
                            callback: handleInsertMath,
                        });
                    }}
                >
                    <div className="grid grid-cols-2">
                        <FaPercentage size={8} />
                        <FaSquareRootAlt size={8} />
                        <FaSuperscript size={8} />
                        <FaInfinity size={8} />
                    </div>
                </a>
            </div>
        </>
    );
};

export default TextProperties;
