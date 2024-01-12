/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import React, { FC, useState } from "react";
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
import { toggleWrapperStyle } from "components/Editorial/ViewBox/Boxtypes/Text/handlers/stylesHandler";

interface Props {
  manager: EditorialManagerInterface;
}

const TextProperties: FC<Props> = ({ manager }) => {
  const toggleWrapper =
    manager.canvasManager.activeComponent.functions?.toggleWrapper;

  const toggleTextStyle =
    manager.canvasManager.activeComponent.functions?.toggleTextStyle;

  const toggleWrapperStyle =
    manager.canvasManager.activeComponent.functions?.toggleWrapperStyle;

  const [isActive, setIsActive] = useState(false);
  const [colorIsActive, setColorIsActive] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [textSize, setTextSize] = useState("0");
  const [textSpacing, setTextSpacing] = useState("0");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const fonts = [
    "Arial",
    "Times New Roman",
    "Roboto",
    "Helvetica",
    "Courier New",
  ];

  const handleChangeTextColor = (color: ColorResult) => {
    setTextColor(color.hex);
    toggleTextStyle(color.hex, "textColor");
    setColorIsActive(false);
  };

  const handleChangeTextSize = (size: string) => {
    setTextSize(size);
    toggleTextStyle(size, "font-size");
  };

  const handleChangeTextSpacing = (spacing: string) => {
    setTextSpacing(spacing);
    toggleTextStyle(spacing, "spacing");
  };

  const handleFontChange = (newFont: string) => {
    setSelectedFont(newFont);
    toggleTextStyle(selectedFont, "font");
  };

  return (
    <div className="w-full my-5 py-2">
      <a
        href="javascript:void(0)"
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Text Properties</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </a>

      {isActive && (
        <main className="w-full shadow-md">
          <section className="flex flex-wrap py-4">
            <TextEditProperties manager={manager} />
          </section>

          <section className="w-full flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <p className="text-[12px]">Font: </p>
              <select
                className="w-[50%] text-sm bg-white p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#4f46e5] focus:border-[#4f46e5] sm:text-sm"
                value={selectedFont}
                onChange={(e) => handleFontChange(e.target.value)}
              >
                {fonts.map((font) => (
                  <option key={font} value={font} className="text-[12px]">
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <a href="javascript:void(0)">
              <div className="flex items-center gap-2">
                <p onClick={() => handleChangeTextSize(`${+textSize - 1}`)}>
                  <b>-</b>
                </p>
                <input
                  className="border h-6 w-8 text-center"
                  placeholder="0"
                  value={textSize}
                  onChange={(e) => handleChangeTextSize(e.target.value)}
                />
                <p onClick={() => handleChangeTextSize(`${+textSize + 1}`)}>
                  <b>+</b>
                </p>
              </div>
            </a>
          </section>

          <section className="w-full border flex justify-between my-4 p-2">
            <a
              className="border p-2 cursor-pointer"
              href="javascript:void(0)"
              onClick={() => {
                toggleWrapper("div", "left", "position");
              }}
            >
              <RiAlignLeft className="cursor-pointer" />
            </a>

            <a
              className="border p-2 cursor-pointer"
              href="javascript:void(0)"
              onClick={() => {
                toggleWrapper("div", "center", "position");
              }}
            >
              <RiAlignCenter className="cursor-pointer" />
            </a>

            <a
              className="border p-2 cursor-pointer"
              href="javascript:void(0)"
              onClick={() => {
                toggleWrapper("div", "right", "position");
              }}
            >
              <RiAlignRight className="cursor-pointer" />
            </a>

            <a
              className="border p-2 cursor-pointer"
              href="javascript:void(0)"
              onClick={() => {
                toggleWrapper("div", "justify", "position");
              }}
            >
              <RiAlignJustify className="cursor-pointer" />
            </a>
          </section>

          <section className="w-full py-4">
            <div
              className={`${!colorIsActive && "flex"} items-center gap-2 mb-4`}
            >
              <p
                className={`text-[12px] cursor-pointer ${
                  colorIsActive && "mb-4"
                }`}
                onClick={() => setColorIsActive(!colorIsActive)}
              >
                Text color:{" "}
              </p>
              <a href="javascript:void(0)">
                {!colorIsActive && (
                  <div
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
                  </div>
                )}
                {colorIsActive && (
                  <SketchPicker
                    width="90%"
                    color={textColor}
                    onChangeComplete={(color) => handleChangeTextColor(color)}
                  />
                )}
              </a>
            </div>

            <a href="javascript:void(0)">
              <div className="flex items-center gap-2">
                <p className="text-[12px]">Spacing: </p>
                <input
                  className="border h-6 w-8 text-center"
                  type="text"
                  placeholder="0"
                  value={textSpacing}
                  onChange={(e) => handleChangeTextSpacing(e.target.value)}
                />
              </div>
            </a>
          </section>
        </main>
      )}
    </div>
  );
};

const TextEditProperties: FC<Props> = ({ manager }) => {
  const toggleWrapper =
    manager.canvasManager.activeComponent.functions?.toggleWrapper;

  const toggleList =
    manager.canvasManager.activeComponent.functions?.toggleList;

  const [linkBoxActive, setLinkBoxActive] = useState(false);
  const [linkBoxValue, setLinkBoxValue] = useState("");

  const handleAddLink = () => {
    toggleWrapper("a", "blue", linkBoxValue);
    setLinkBoxValue("");
    setLinkBoxActive(false);
  };

  return (
    <>
      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("b");
        }}
      >
        <RiBold />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("i");
        }}
      >
        <RiItalic />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("span", "underline", "line");
        }}
      >
        <RiUnderline />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("span", "line-through", "line");
        }}
      >
        <RiStrikethrough />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("h1");
        }}
      >
        <RiH1 />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("h2");
        }}
      >
        <RiH2 />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("h3");
        }}
      >
        <RiH3 />
      </a>

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

      <div className="border p-2 cursor-pointer relative">
        <a
          href="javascript:void(0)"
          onClick={() => setLinkBoxActive(!linkBoxActive)}
        >
          <RiLink />
        </a>

        {linkBoxActive && (
          <section className="bg-white border p-2 absolute">
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
        <RiLinkUnlink />
      </div>
    </>
  );
};

export default TextProperties;
