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

interface Props {
  manager: EditorialManagerInterface;
}

const TextProperties: FC<Props> = ({ manager }) => {
  const [isActive, setIsActive] = useState(false);
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

          <section className="w-full flex justify-between py-4">
            <div className="flex items-center gap-2">
              <p className="text-[12px]">Font: </p>
              <div className="border h-6 w-14" />
            </div>

            <div className="flex items-center gap-2">
              <p>
                <b>-</b>
              </p>
              <div className="border h-6 w-8" />
              <p>
                <b>+</b>
              </p>
            </div>
          </section>

          <section className="w-full border flex justify-between my-4 p-2">
            <RiAlignLeft className="cursor-pointer" />
            <RiAlignCenter className="cursor-pointer" />
            <RiAlignRight className="cursor-pointer" />
            <RiAlignJustify className="cursor-pointer" />
          </section>

          <section className="w-full py-4">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-[12px]">Text color: </p>
              <div className="border h-6 w-14" />
            </div>

            <div className="flex items-center gap-2">
              <p className="text-[12px]">Spacing: </p>
              <p>0</p>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

const TextEditProperties: FC<Props> = ({ manager }) => {
  const toggleWrapper =
    manager.canvasManager.activeComponent.functions?.toggleWrapper;

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
          toggleWrapper("span", "underline");
        }}
      >
        <RiUnderline />
      </a>

      <a
        className="border p-2 cursor-pointer"
        href="javascript:void(0)"
        onClick={() => {
          toggleWrapper("span", "line-through");
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
        <RiListOrdered />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiListUnordered />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiListCheck />
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
