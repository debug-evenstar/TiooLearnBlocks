import { FC, useEffect, useState } from "react";
import CountdownTimer from "./Countdown";
import { SubjectLesson } from "../types";
import SubmitExamModal from "./SubmitExamModal";
import ExamSubmittedModal from "./ExamSubmittedModal";
import { FaBars } from "react-icons/fa";

interface TopNavProps {
  data: SubjectLesson[] | null;
  setCurrent: any;
  openSubmitModal: Function;
  inSession: boolean;
  sidebarRef?: any;
  setInSession: any;
  handleTimeUp: any;
  currentSubjectId?: number | null;
  duration: number;
}

const TopNav: FC<TopNavProps> = ({
  data,
  setCurrent,
  currentSubjectId,
  sidebarRef,
  inSession,
  duration,
  setInSession,
  openSubmitModal,
  handleTimeUp,
}) => {
  const [activeId, setActiveId] = useState(currentSubjectId ?? 0);
  const subjects = data?.map((i) => i.subject);
  const isActive = (id: number) => id === activeId;

  const handleSubjectClick = (id: number) => {
    const target = data?.find((d) => d.subject.id == id);

    setActiveId(id);
    if (target) setCurrent(target);
  };

  useEffect(() => {
    if (subjects && subjects.length) {
      setActiveId(currentSubjectId ?? subjects[0].id);
    }
  }, [currentSubjectId]);

  const toggleSidebar = () => {
    console.log("clicking",sidebarRef?.current);
    sidebarRef?.current?.toggleSideBar();
  }

  return (
    <>
      <div className="relative w-full">
        <div className="w-full border-b items-center flex-col lg:flex-row lg:h-[90px] lg:px-5 sm:px-10 flex justify-between relative">
          <div className="flex items-end pb-2 gap-3 h-full order-2 lg:order-1 overflow-x-auto hide-scroll lg:w-fit w-full px-3 lg:px-0">
            <ul className="flex items-center gap-x-4 lg:gap-x-12 ">
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
          <div className="order-1 px-3 py-2 lg:py-0 lg:px-0 lg:order-2 w-full lg:w-auto flex items-center gap-4 flex-row justify-between">
            <button onClick={toggleSidebar} className="lg:hidden text-2xl">
              <FaBars />
            </button>
            <div className="flex w-fit items-center gap-2 ">
              <CountdownTimer
                targetTime={60 * duration}
                onStart={() => setInSession(true)}
                onTimeUp={handleTimeUp}
              />
              {!inSession && (
                <button
                  onClick={() => openSubmitModal()}
                  className="bg-[#9C29B2] rounded-md px-2 lg:px-3 font-semibold text-[18px] lg:text-[20px] flex items-center gap-2 py-2 lg:py-3 quicksand text-white"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopNav;