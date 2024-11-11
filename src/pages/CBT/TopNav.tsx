import { useState } from "react";
import CountdownTimer from "./Countdown";

const TopNav = () => {
  const subjects = ["Mathematitcs", "English", "Chemistry", "Physics"];
  const [activeIndex, setActive] = useState(0);
  const isActive = (index: number) => index === activeIndex;
  return (
    <div className="relative w-full ">
      <div className="w-full sm:border-b items-center  h-[90px] px-5 sm:px-10 flex justify-between relative">
        <div className="flex items-end pb-2 gap-3 h-full">
          <ul className="flex items-center gap-x-12 ">
            {subjects.map((subject: string, index: number) => (
              <li>
                <button
                  onClick={() => setActive(index)}
                  className={`${
                    isActive(index) ? "bg-[#F9DAFF]" : "bg-white"
                  } text-[13px] quicksand px-3 rounded-[27px] py-1 font-[600]`}
                >
                  {subject}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <CountdownTimer targetTime={3600} onTimeUp={() => console.log("timeup")}/>
        </div>
      </div>
    </div>
  );
};
export default TopNav;
