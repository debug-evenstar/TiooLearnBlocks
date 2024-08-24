import React, { useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import Theme from "./Theme";

const GridTheme = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full my-5 py-2">
      <div
        className={`w-full flex justify-between items-center cursor-pointer ${
          isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
        }`}
        onClick={() => setIsActive(!isActive)}
      >
        <p className="text-[15px]">Grid Theme</p>
        {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
      </div>

      {isActive && (
        <main className="w-full mt-4">
          <Theme />
        </main>
      )}
    </div>
  );
};

export default GridTheme;
