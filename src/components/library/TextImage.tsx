import React from "react";
import ImageComponent from "../Image";
import image from "../../img/image.png";
import { FiEdit } from "react-icons/fi";
import TextWithTooltips from "../TextWithTooltips";

function TextImage() {
  return (
    <div className="w-full p-[27px] rounded-[9px] bg-white flex items-center flex-col h-full">
      <div className="flex justify-between w-full">
        <TextWithTooltips sentence="In ~nature~, we are ________surrounded________  by many things. All <thing> are either ##living## or non-living. \n Living things ^have^ life. <?> Non-living `things` <?> do _not_ have **life**." />
        <div className="cursor-pointer">
          <FiEdit className="text-[#87909E] text-[22px]" />
        </div>
      </div>
      <ImageComponent
        src={image}
        alt="Example Image"
        width="w-full"
        height="h-full"
        objectFit="object-contain"
        borderRadius="rounded-lg"
      />
    </div>
  );
}

export default TextImage;
