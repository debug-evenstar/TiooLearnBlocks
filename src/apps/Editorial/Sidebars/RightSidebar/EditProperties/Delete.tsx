import { ManagerInterface } from "apps/Editorial/Base/Manager";
import { ComponentBaseDataInterface } from "components/interface";
import { handleSetActiveViewbox } from "provider/activeViewboxSlice";
import { handleSetDragItems } from "provider/dragItemsSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import React, { FC } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  id: string;
  manager: ManagerInterface;
}

const Delete: FC<Props> = ({ id, manager }) => {
  const handleDelete = (id: string) => {
    // Create a standalone function for this
    const updatedSlides = manager.slideManager.slides;
    const itemIndex = manager.canvasManager.getComponentIndex(id);
    const activeSlide = updatedSlides[manager.slideManager.activeSlide];
    const updatedSlide = activeSlide.filter(
      (component: ComponentBaseDataInterface, index: number) =>
        index !== itemIndex
    );
    updatedSlides[manager.slideManager.activeSlide] = updatedSlide;
    manager.slideManager.slides = updatedSlides;
    manager.slideManager.handleSlidesUpdate(updatedSlides);
    const updatedComponents = manager.states.slideComponents.filter(
      (component: any, index: number) => index !== itemIndex
    );
    manager.setState("slideComponents", updatedComponents);
    // const filteredItems = dragItems.filter((item) => item.id !== id);
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
