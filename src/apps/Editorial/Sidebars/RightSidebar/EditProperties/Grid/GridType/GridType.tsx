import React, { FC, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import StartAndEnd from "./StartAndEnd";
import SecondType from "./SecondType";
import { ManagerInterface } from "apps/Editorial/Base/Manager";

interface Props {
  manager: ManagerInterface;
}

const GridType: FC<Props> = ({ manager }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full my-5 py-2">
      <div
        className={`w-full flex justify-between items-center cursor-pointer ${
          isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Grid Type</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>

      {isActive && (
        <main className="w-full mt-4">
          <StartAndEnd manager={manager} />
        </main>
      )}
    </div>
  );
};

export default GridType;
