import React, { FC } from "react";
import { BsArrowLeft, BsPencil } from "react-icons/bs";
import { MdRedo, MdUndo } from "react-icons/md";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { ManagerInterface } from "apps/Editorial/Base/Manager";
import { EditProperties } from "./EditProperties/handler";

interface Props {
  manager: ManagerInterface;
}

const ActiveSidebar: FC<Props> = ({ manager }) => {
  
  const id = manager.canvasManager.activeComponent.data.id;
  const canvas = manager.canvasManager.canvas;

  const popHistory = () => {
    const history = manager.canvasManager.canvas.history;
    if (history.length) {
      const previousState = history[history.length - 1];
      manager.slideManager.handleSlidesUpdate(previousState);
      manager.canvasManager.canvas.history.pop();
    }
  };

  const handleRefreshToggleSidebarState = () => manager.setState("rightSidebarState", false);

  return (
    <div className="w-full h-full overflow-y-visible pt-5 pb-20">
      <header className="w-full flex justify-between p-4 border-b border-gray-400 items-center">
        <div className="h-fit flex gap-2">
          <BsArrowLeft
            className="self-center cursor-pointer"
            onClick={handleRefreshToggleSidebarState}
          />
          <p className="flex item-center text-[14px] text-[#87909E] font-medium self-center">
            Components
          </p>
        </div>
        <div>
          <b className="text-[12px] mt-2 text-[#4F46E5]">
            {canvas.getOriginalName(id) !== "FlashCards"
              ? canvas.getOriginalName(id)
              : "Flash Card"}
          </b>
        </div>
      </header>

      <main className="w-full p-4 px-[25px]">
        <section className="w-full flex justify-between py-4">
          <div className="flex gap-4">
            <MdUndo className="cursor-pointer" onClick={() => popHistory()} />
            <MdRedo className="cursor-pointer" onClick={() => {}} />
          </div>
          <div className="flex gap-4 bg-[#E6E6FA] p-2 rounded-full">
            <BsPencil />
            <RiArrowDropDownFill />
          </div>
        </section>

        <section>{EditProperties(id, manager)}</section>
      </main>
    </div>
  );
};

export default ActiveSidebar;
