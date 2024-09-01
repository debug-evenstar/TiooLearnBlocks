import { useState } from "react";
import circleLeft from "../../../img/circle-left.svg";

const ToggleNavBtn = ({ handleClick }: any) => {
  const [ isOpen, setIsOpen ] = useState(true);
  const onClickHandler = () => {
    setIsOpen(!isOpen);
    handleClick();
  }
  return (
    <button onClick={onClickHandler} className="w-10 h-10 outline-none z-[100] absolute left-1 top-[48%]">
      <img src={circleLeft} className={`${!isOpen && 'rotate-[180deg]'}`}/>
    </button>
  );
};

export default ToggleNavBtn;