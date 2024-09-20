import React from "react";

interface TooltipProps {
  text: string;
  tip: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, tip }) => {
  return (
    <div className="relative group inline-block">
      <span
        className={`absolute hidden group-hover:flex -top-2 -translate-y-full w-auto p-3 bg-[#4f46e5] rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#4f46e5] left-1/2 -translate-x-1/2`}
      >
        {tip}
      </span>
      <p className="group relative inline-block text-blue-500 underline hover:text-red-500 duration-300">
        {text}
      </p>
    </div>
  );
};

export default Tooltip;
