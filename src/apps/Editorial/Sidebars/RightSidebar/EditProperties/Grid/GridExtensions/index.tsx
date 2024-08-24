import React, { FC, useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import { ManagerInterface } from "apps/Editorial/Base/Manager";
import Objective from "./Objective";

interface Props {
  manager: ManagerInterface;
}

const GridExtensions: FC<Props> = ({ manager }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full my-5 py-2">
      <div
        className={`w-full flex justify-between items-center cursor-pointer ${
          isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Extensions</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>

      {isActive && (
        <main className="w-full mt-4">
          <Objective manager={manager} index={0} data={null} />
        </main>
      )}
    </div>
  );
};

export default GridExtensions;
