import circleLeft from "../../../img/circle-left.svg";

const ToggleNavBtn = ({ isOpen,handleClick }: any) => {
  return (
    <button onClick={handleClick} className="w-10 h-10 outline-none z-[100] absolute left-1 top-[48%]">
      <img src={circleLeft} className={`${!isOpen && 'rotate-[180deg]'}`}/>
    </button>
  );
};

export default ToggleNavBtn;