import clockImg from "../../../img/clock.svg";

const LessonProgress = () => {
  return (
    <div className="flex itetms-center space-x-5">
      <div>
        <p className="text-gray-500 text-sm">Your progress</p>
        <p className="text-main  font-[700]">
          4 Lessons in this chapter
        </p>
        <div>
          <div className="w-10 h-[10px] rounded-full px-1 bg-main flex items-center justify-end">
            <div className="h-[5px] w-[5px] rounded-full bg-gray-100"></div>
          </div>
        </div>
      </div>
      <p className="text-gray-500 flex items-center space-x-1 ">
        <img src={clockImg} className="w-3" alt="" />
        <span className="text-sm">39min</span>
      </p>
    </div>
  );
};

export default function LessonHeader({ title }: any) {
  return (
    <div className="w-full border-b py-5 px-10 flex justify-between items-center">
      <p className="font-[500] text-[18px]">{title}</p>
      <LessonProgress />
    </div>
  );
}
