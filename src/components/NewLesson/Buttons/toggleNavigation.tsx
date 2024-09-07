import { useEffect, useState } from "react";
import circleLeft from "../../../img/circle-left.svg";

const ToggleNavBtn = ({ handleClick, sideBarRef }: any) => {
  const sidebarOpen = sideBarRef?.current?.sideBarOpen;
  const [isOpen, setIsOpen] = useState(sidebarOpen);



  const onClickHandler = () => {
    const sidebar = handleClick();
    setIsOpen(sidebar);
  };

  return (
    <button
      onClick={onClickHandler}
      className="w-10 h-10 outline-none z-[100] absolute left-1 top-[48%]"
    >
      <img src={circleLeft} className={`${isOpen && "rotate-[180deg]"}`} />
    </button>
  );
};

export default ToggleNavBtn;
