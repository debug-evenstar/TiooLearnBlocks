import { CanvasText } from "components/Editorial/interfaces";
import React, { FC } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const Text: FC<CanvasText> = ({ id, handleDelete }) => {
  return (
    <div className="handle p-3 h-full w-full cursor-move">
      <input
        className="w-full outline-none"
        type="text"
        placeholder="Add text"
      />
      <div className="w-full flex justify-end gap-2">
        <RiDeleteBin5Line
          className="text-2xl cursor-pointer"
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
};

export default Text;
