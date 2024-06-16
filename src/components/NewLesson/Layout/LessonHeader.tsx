import clockImg from "../../../img/clock.svg";

export default function LessonHeader({ currentLesson }: any) {

  const slide_count = currentLesson?.slides?.length;

  const LessonProgress = () => {
    return (
      <div className="flex items-center space-x-5">
        <div>
          <p className="text-gray-500 text-sm">Your progress</p>
          <p className="text-main font-[700]">
            {slide_count} Slide{ slide_count > 1 && 's' } in this lesson
          </p>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-[10px] rounded-full px-1 bg-main flex items-center justify-end">
              <div className="h-[5px] w-[5px] rounded-full bg-gray-100"></div>
            </div>
            {
              // Array(currentLesson?.slides?.length -1).fill(null).map((e: any) => (
              //   <div className="w-10 h-[10px] rounded-full px-1 bg-white flex items-center justify-end">
              //   <div className="h-[5px] w-[5px] rounded-full bg-gray-300"></div>
              // </div>
              // ))
            }
          </div>
        </div>
        <p className="text-gray-500 flex items-center space-x-1 ">
          <img src={clockImg} className="w-3" alt="" />
          <span className="text-sm">10min</span>
        </p>
      </div>
    );
  };



  return (
    <div className="w-full border-b h-[90px] px-10 flex justify-between items-center">
      <p className="font-[500] text-[18px]">{currentLesson.topic}</p>
      <LessonProgress/>
    </div>
  );
}
