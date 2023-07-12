import React from "react";
import TextWithTooltips from "../TextWithTooltips";
import { FiEdit } from "react-icons/fi";
import Option from "../Option";

function MultipleOptions() {
  return (
    <div className="w-full max-w-[614px] p-[27px] rounded-[9px] bg-white flex items-center flex-col">
      <div className="flex justify-between w-full">
 
        <TextWithTooltips sentence="All living things are natural. Plants and animals are natural living things. Non-living things may be natural or man-made. The sun, moon, stars & rivers are natural non-living things. Things like fan, car, & basket are man-made non-living things. Can you identify the characteristics of non-living things?" />
        <div className="cursor-pointer">
          <FiEdit className="text-[#87909E] text-[22px]" />
        </div>
      </div>
      <div className="w-full mt-[24px]">
        <h2 className="font-inter text-[10px] font-medium text-[#87909E] ">
          SELECT MULTIPLE ANSWERS
        </h2>
        <Option />
        <Option />
        <Option />
        <Option />
        <Option />
      </div>
    </div>
  );
}

export default MultipleOptions;
