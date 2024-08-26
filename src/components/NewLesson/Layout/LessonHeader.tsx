import { FaBars } from "react-icons/fa";
import clockImg from "../../../img/clock.svg";

export default function LessonHeader({ currentLesson, activeSlide, sideBarOpen }: any) {

  const slide_count = currentLesson?.slides?.length;
  const position = Math.floor((activeSlide / slide_count) * 5);

  const duration = currentLesson?.duration?.toLowerCase().replace('minute', 'min')

  console.log(currentLesson)

  const LessonProgress = () => {
    return (
      <div className="flex items-center space-x-5">
        <div>
          <p className="text-gray-500 text-sm">Your progress</p>
          <p className="text-[#7E1593] font-[700]">
            {slide_count} Slide{slide_count > 1 && 's'} in this lesson
          </p>
          <div className="flex items-center w-fit bg-gray-50 rounded-full overflow-hidden">
            {
              Array(5).fill(null).map((i: any, index: number) => {
                const active = position >= (index + 1);
                const isCurrentColumn = position == (index + 1);
                return (
                  <div className={`w-10 h-[10px] px-1 ${active ? "bg-[#7E1593]" : ""} ${isCurrentColumn && 'rounded-r-full'} flex items-center justify-end`}>
                    <div className="h-[5px] w-[5px] rounded-full bg-gray-300"></div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <p className="text-gray-500 hidden sm:flex items-center space-x-1 ">
          <img src={clockImg} className="w-3" alt="" />
          <span className="text-sm">{duration}</span>
        </p>
      </div>
    );
  };



  return (
    <>
      <div className="px-5 py-3 flex sm:hidden border-b items-center space-x-3">
        <button>
          <FaBars />
        </button>
        <p>
          show chapters
        </p>
      </div>
      <div className="w-full sm:border-b h-[90px] px-10 flex justify-between items-center">
        <p className="font-[500] text-[18px] hidden sm:block">{currentLesson?.topic ?? ""}</p>
        {
          currentLesson &&
          <LessonProgress />
        }
      </div>
    </>
  );
}
