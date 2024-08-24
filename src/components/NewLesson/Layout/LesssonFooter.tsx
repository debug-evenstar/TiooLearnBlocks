import leftArrow from "../../../img/left-arrow.svg";
import gotItImg from "../../../img/got-it.png";
import TransitionButton from "../../../components/NewLesson/Buttons/TransitionButton";

export default function LessonFooter({previous,isPreview, closePreview, next, chatVisible}: any) {
  return (
    <div className="w-full border-t px-10 flex h-[80px] items-center justify-between">
      {
        isPreview ? <p></p> :
        <button onClick={previous} className="text-main outline-none text-[20px] font-[500] flex items-center space-x-3">
        <img src={leftArrow} className="w-[18px]" alt="" />
        <span>Previous</span>
      </button>
      }
      { 
        (!chatVisible && <button onClick={(e) => isPreview? closePreview(e) : next(e)} className="outline-none relative">
         { isPreview && 
          <span className="lilita-one text-white absolute font-[500] text-lg right-[30%] px-4 top-2 bg-[#aa18b8]">Back</span>
         }
          <img src={gotItImg} className="w-[170px]" alt="" />
        </button>)
      
      }
    </div>
  );
}
