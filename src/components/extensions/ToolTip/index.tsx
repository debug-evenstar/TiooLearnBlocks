import React, { FC, useState } from "react";
import dropdown from "../extMedia/dropdown-svgrepo-com.svg";
interface Props {
  type?: string;
  targetId?: string;
  content?: JSX.Element;
}
const ToolTipComponent: FC<Props> = ({ type, targetId, content }) => {
  const [toolTip, setTooltip] = useState(false);
  const showTip = (id: any) => {
    setTooltip(!toolTip);
  };
  const RenderTip = ({ item }: { item: string }) => {
    return (
      <div className="bg-[#4F46E5] absolute -top-[450%] -left-[420%] text-center w-64 lg:w-[350px]  text-white px-2 py-2 rounded-lg">
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
      <p
        className="relative w-9 mx-auto bg-red-600 mt-28 text-center"
        onClick={(id) => showTip(id)}
      >
        text
        {toolTip && (
          <RenderTip item="Hello we're creating a tooltip, Hello we're creating a tooltip, Hello we're creating a tooltip" />
        )}
      </p>
    </>
  );
};

export default ToolTipComponent;
