import React from "react";
import { BsPencil } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";

const EditGrid = () => {
  return (
    <div className="w-full my-5 py-2">
      <div className="w-full flex justify-between items-center">
        <p className="text-[15px]">Edit Grid</p>
        <RiEditBoxLine className="curosr-pointer" />
      </div>
    </div>
  );
};

export default EditGrid;
