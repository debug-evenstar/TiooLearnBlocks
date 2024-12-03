import { FC, useEffect, useState } from "react";
import CountdownTimer from "./Countdown";
import { SubjectLesson } from "../types";
import SubmitExamModal from "./SubmitExamModal";
import ExamSubmittedModal from "./ExamSubmittedModal";

interface TopNavProps {
  data: SubjectLesson[] | null;
  setCurrent: any;
 openSubmitModal: Function;
 inSession: boolean;
 setInSession: any;
 handleTimeUp: any;
 duration: number;
}

const TopNav: FC<TopNavProps> = ({data, setCurrent, inSession, duration, setInSession, openSubmitModal, handleTimeUp}) => {

  const [activeId, setActiveId] = useState(0);
  const subjects = data?.map((i) => i.subject);
  const isActive = (id: number) => id === activeId;

  const handleSubjectClick = (id: number) => {
    const target = data?.find((d) => d.subject.id == id);

    setActiveId(id);
    if (target) setCurrent(target);
  };


  useEffect(() => {
    if (subjects && subjects.length) {
      setActiveId(subjects[0].id);
    }
  }, [data]);


  return (
    <>

      <div className="relative w-full ">
        <div className="w-full sm:border-b items-center  h-[90px] px-5 sm:px-10 flex justify-between relative">
          <div className="flex items-end pb-2 gap-3 h-full">
            <ul className="flex items-center gap-x-12 ">
              {subjects?.map((item, idx: number) => (
                <li>
                  <button
                    onClick={() => handleSubjectClick(item.id)}
                    className={`${
                      isActive(item.id) ? "bg-[#F9DAFF]" : "bg-white"
                    } text-[13px] quicksand px-3 rounded-[27px] py-1 font-[600]`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <CountdownTimer
              targetTime={60 * duration}
              onStart={() => setInSession(true)}
              onTimeUp={handleTimeUp}
            />
            {inSession && 
            <button onClick={() => openSubmitModal()} className="bg-[#9C29B2] rounded-md px-3 font-semibold text-[20px] flex items-center gap-2 py-3 quicksand text-white">
              Submit
            </button>
            }
          </div>
        </div>
      </div>
    </>
  );
};
export default TopNav;
