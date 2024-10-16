import { _getManager } from "apps/Editorial/Base/Manager";
import React, { createRef, useRef, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { focusOnTipEditable } from "./handler";

interface TooltipProps {
    text: string;
    tip: string;
}


const Tooltip: React.FC<TooltipProps> = ({ text, tip }) => {

    return (
        <span className="tooltip relative group inline-block">
            <span
                className={`tip-text  absolute hidden group-hover:flex -top-2 -translate-y-full p-3 bg-[#4f46e5] rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-[#4f46e5] left-1/2 -translate-x-1/2`}
            >
                {tip}
            </span>
            <span
                className={`absolute opacity-0 hidden group-hover:flex -top-1 -translate-y-[30%] -translate-x-1/2 left-1/2 p-2`}
            >
            </span>
            <span className="group relative inline-block text-blue-500 underline hover:text-red-500 duration-300">
                {text}
            </span>
        </span>
    );
};

export default Tooltip;
