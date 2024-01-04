/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { ColorResult, SketchPicker } from "react-color";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";

interface Props {
  manager: EditorialManagerInterface;
}

const Background: FC<Props> = ({ manager }) => {
  const toggleViewboxStyle =
    manager.canvasManager.activeComponent.functions?.toggleViewboxStyle;

  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState<any>("#561ecb");

  const handleChangeColor = (color: ColorResult) => {
    setColor(color.hex);
    toggleViewboxStyle(color.hex, "bgColor");
  };

  return (
    <div className="w-full my-5 py-2">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Background</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>

      {isActive && (
        <main className="w-full mt-4">
          <a href="javascript:void(0)">
            <SketchPicker
              width="90%"
              className="w-80"
              color={color}
              onChangeComplete={(color) => handleChangeColor(color)}
            />
          </a>
        </main>
      )}
    </div>
  );
};

export default Background;
