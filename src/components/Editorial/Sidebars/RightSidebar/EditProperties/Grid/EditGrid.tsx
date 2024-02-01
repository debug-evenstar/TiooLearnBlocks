import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { GridState } from "components/Editorial/Base/StateInterface";
import React, { FC } from "react";
import { BsPencil } from "react-icons/bs";
import { RiEditBoxLine } from "react-icons/ri";

interface Props {
  manager: EditorialManagerInterface;
}

const EditGrid: FC<Props> = ({ manager }) => {
  const toggleIsEditable = () => {
    manager.setState("grid", (prev: GridState) => {
      return {
        ...prev,
        ...({ gridIsEditable: !prev.gridIsEditable } as GridState),
      };
    });
  };

  return (
    <div className="w-full my-5 py-2 cursor-pointer" onClick={toggleIsEditable}>
      <div className="w-full flex justify-between items-center">
        <p className="text-[15px]">Edit Grid</p>
        <RiEditBoxLine className="curosr-pointer" />
      </div>
    </div>
  );
};

export default EditGrid;
