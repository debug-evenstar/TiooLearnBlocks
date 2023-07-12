import React from "react";
import TextComponent from "../Text";
import ImageComponent from "../Image";
import image from "../../img/image.png";
import { FiEdit } from "react-icons/fi";
import TextWithTooltips from "../TextWithTooltips";

function TextImage() {
  return (
    <div className="w-full max-w-[614px] p-[27px] rounded-[9px] bg-white flex items-center flex-col">
      <div className="flex justify-between w-full">
        <TextWithTooltips sentence="In ~nature~, example1 we are ________surrounded________ by many things. All things are either living or non-living. example2 Living things have life. <?> Non-living things <?> do not have life." />
        <div className="cursor-pointer">
          <FiEdit className="text-[#87909E] text-[22px]" />
        </div>
      </div>
      <ImageComponent
        src={image}
        alt="Example Image"
        width="w-full"
        height="h-[314px]"
        objectFit="object-contain"
        borderRadius="rounded-lg"
      />
    </div>
  );
}

export default TextImage;
