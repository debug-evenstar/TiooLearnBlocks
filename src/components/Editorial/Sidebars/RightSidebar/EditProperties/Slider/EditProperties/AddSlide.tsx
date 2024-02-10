import { ManagerInterface } from "components/Editorial/Base/Manager";
import { handleToggleTrigger } from "provider/triggerSlice";
import React, { FC } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

interface Props {
  type: string;
  manager: ManagerInterface;
}

const data = (component: string) => {
  switch (component) {
    case "Text":
      return [{ component, content: "" }, {}];
    case "Image":
      return [
        {
          url: "",
          component,
          alternative: [],
        },
      ];
    default:
      return [{ component }];
  }
};

const AddSlide: FC<Props> = ({ type, manager }) => {
  const addComponentToSlider =
    manager.canvasManager.canvas.functions.addComponentToSlider;

  const handleClick = () => {
    addComponentToSlider(data(type));
    manager.setState("trigger", (prev: any) => !prev);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex justify-between items-center py-2 text-[14px] text-[#4f46e5] font-medium cursor-pointer"
    >
      <p>Add {type}</p>
      <RiAddCircleLine />
    </div>
  );
};

export default AddSlide;
