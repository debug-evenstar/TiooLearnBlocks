import React, { FC, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import InputResize from "./InputResize";
import { ManagerInterface } from "components/Editorial/Base/Manager";

interface Props {
  manager: ManagerInterface;
}

const VideoProperties: FC<Props> = ({ manager }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full my-5 py-2">
      <div
        className={`w-full flex justify-between items-center cursor-pointer ${
          isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Video Properties</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>

      {isActive && (
        <main>
          <InputResize manager={manager} componentType="video" />
        </main>
      )}
    </div>
  );
};

export default VideoProperties;
