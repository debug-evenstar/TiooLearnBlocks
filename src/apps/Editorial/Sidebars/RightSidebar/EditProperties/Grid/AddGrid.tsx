import React from "react";
import { RiAddCircleLine } from "react-icons/ri";

const AddGrid = () => {
  return (
    <div className="w-full flex justify-between items-center py-2 text-[14px] text-[#4f46e5] font-medium cursor-pointer">
      <p>Add Another Grid</p>
      <RiAddCircleLine />
    </div>
  );
};

export default AddGrid;
