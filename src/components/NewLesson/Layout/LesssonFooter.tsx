import leftArrow from "../../../img/left-arrow.svg";
import gotItImg from "../../../img/got-it.png";

export default function LessonFooter() {
  return (
    <div className="w-full border-t py-4 px-10 flex items-center justify-between">
      <button className="text-main text-[20px] font-[500] flex items-center space-x-3">
        <img src={leftArrow} className="w-[18px]" alt="" />
        <span>Previous</span>
      </button>
      <button>
        <img src={gotItImg} className="w-[170px]" alt="" />
      </button>
    </div>
  );
}
<button></button>;
