/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */ import React, {
  FC,
  useState,
} from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";
import Tips from "./Tips";
import { ManagerInterface } from "apps/Editorial/Base/Manager";

interface Props {
  manager: ManagerInterface;
}

const Extensions: FC<Props> = ({ manager }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="w-full my-5 py-2">
      <a href="javascript:void(0)" onClick={() => setIsActive(!isActive)}>
        <div
          className={`w-full flex justify-between items-center cursor-pointer ${
            isActive ? "bg-[#E6E6FA] p-2 rounded-sm" : ""
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          <p className="text-[15px]">Extensions</p>
          {isActive ? <RiArrowDropUpFill /> : <RiArrowDropDownFill />}
        </div>
      </a>

      {isActive && (
        <main>
          <a href="javascript:void(0)">
            <Tips manager={manager} />
          </a>
        </main>
      )}
    </div>
  );
};

export default Extensions;
