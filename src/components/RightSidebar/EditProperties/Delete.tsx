import { handleSetActiveViewbox } from "provider/activeViewboxSlice";
import { handleSetDragItems } from "provider/dragItemsSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import React, { FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  id: string;
}

const Delete: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(handleSetActiveViewbox);

  const dragItems: any[] = selector.payload.dragItems.value;

  const handleDelete = (id: string) => {
    const filteredItems = dragItems.filter((item) => item.id !== id);
    dispatch(handleSetDragItems(filteredItems));
    dispatch(refreshToggleSidebarState());
  };

  return (
    <div className="w-full my-5 py-2">
      <div className="w-full flex justify-between items-center">
        <p className="text-[15px]">Delete</p>
        <RiDeleteBinLine
          className="cursor-pointer"
          onClick={() => handleDelete(id)}
        />
      </div>
    </div>
  );
};

export default Delete;
