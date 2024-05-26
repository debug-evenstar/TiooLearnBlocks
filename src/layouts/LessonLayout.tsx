import LessonHeader from "components/NewLesson/Layout/LessonHeader";
import LessonSidebar from "components/NewLesson/Layout/LessonSidebar";
import LessonFooter from "components/NewLesson/Layout/LesssonFooter";
import { ReactNode } from "react";
import muteImg from "../img/mute.svg";
import './LessonLayout.css';

export default function LessonLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-screen overflow-hidden urbanist">
      <LessonSidebar />
      <div className="flex flex-col w-full justify-between border-l overflow-y-auto h-screen">
        <LessonHeader title={"What are computers? "} />
        <div className="relative h-full">
          <button className="absolute w-fit right-[3rem] top-[2rem]">
            <img src={muteImg} className="w-[25px]" alt="" />
          </button>
          {children}
        </div>
        <LessonFooter />
      </div>
    </div>
  );
}
