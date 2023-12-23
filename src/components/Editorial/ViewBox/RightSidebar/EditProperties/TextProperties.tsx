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
  RiItalic,
  RiLink,
  RiLinkUnlink,
  RiListCheck,
  RiListOrdered,
  RiListUnordered,
  RiUnderline,
} from "react-icons/ri";

const TextProperties: FC<any> = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full my-5 py-2">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Text Properties</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>

      {isActive && (
        <main className="w-full shadow-md">
          <section className="flex flex-wrap py-4">
            <TextEditProperties />
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

const TextEditProperties = () => {
  return (
    <>
      <div className="border p-2 cursor-pointer">
        <RiBold />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiItalic />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiUnderline />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiH1 />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiH2 />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiListOrdered />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiListUnordered />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiListCheck />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiLink />
      </div>
      <div className="border p-2 cursor-pointer">
        <RiLinkUnlink />
      </div>
    </>
  );
};

export default TextProperties;
