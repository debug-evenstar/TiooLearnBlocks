import React, { FC, useState } from "react";
import dropdown from "../extMedia/dropdown-svgrepo-com.svg";
interface ToolTipProps {
  label : string,
  content: string;
}
const ToolTipComponent: FC<ToolTipProps> = ({ label, content }) => {
  const [toolTip, setTooltip] = useState(false);
  const showTip = () => {
    setTooltip(!toolTip);
  };
  const RenderTip = ({ item }: { item: string }) => {
    return (
      <div className="bg-[#4F46E5] absolute -top-[450%] -left-[420%] text-center w-64 lg:w-[350px] text-white px-2 py-2 rounded-lg">
        {item}
        <img
          src={dropdown}
          alt="pointer"
          className="w-24 absolute -bottom-[55px] left-[35%]"
        />
      </div>
    );
  };
  return (
    <>
      <div
        className="relative w-9 inline text-center"
        onClick={() => showTip()}
      >
        {label}
        {toolTip && (
          <RenderTip item={content} />
        )}
      </div>
    </>
  );
};

export default ToolTipComponent;
