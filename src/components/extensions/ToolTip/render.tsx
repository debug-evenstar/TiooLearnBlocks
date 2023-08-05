import React, { FC, useEffect, useState, useRef } from "react";
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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTooltip(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  const RenderTip = ({ item }: { item: string }) => {
    return (
      <div className="absolute h-[400px] flex items-end -top-[410px] -left-[100px] lg:-left-[132px] w-64 lg:w-[350px]">
        <div className="bg-[#4F46E5] text-center text-white px-2 py-2 rounded-lg">
        <p> {item}</p>
        <img
          src={dropdown}
          alt="pointer"
          className="w-16 absolute -bottom-[35px] left-[35%]"
        />
      </div>
      </div>
    );
  };
  return (
    <>
      <div
        className="relative cursor-pointer underline inline text-center"
        onClick={() => showTip()}
        ref={ref}
      >
        {toolTip && (
            <RenderTip item={content} />
        )}
        <span>{label}</span>
      </div>
    </>
  );
};

export default ToolTipComponent;
