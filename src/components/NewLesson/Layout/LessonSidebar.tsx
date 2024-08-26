import logoImg from "../../../img/logo.png";
import downCarret from "../../../img/carret-down.svg";
import readingImg from "../../../img/reading.svg";
// import assessmentImg from "img/assessment.svg";

import LeftArrow from "FigmaIcons/LeftArrow";
import { FC, useState } from "react";

interface LessonProps {
  type: "reading" | "assessment";
  title: string;
}

interface ChapterDropdownProps {
  title: string;
  lessons: LessonProps[];
  setCurrentLesson: Function;
}

const ChapterDropdown: FC<ChapterDropdownProps> = ({
  title,
  lessons,
  setCurrentLesson,
}) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="w-full transition-all duration-300">
      <div
        onClick={() => setIsActive(!isActive)}
        className="cursor-pointer flex items-center justify-between border-gray-200 border-b"
      >
        <p className="text-[#a5a5a5] pb-1">{title}</p>
        <button className="outline-none">
          <img
            src={downCarret}
            alt=""
            className={`duration-300 w-[20px] ${isActive && "rotate-[180deg]"}`}
          />
        </button>
      </div>
      <ul
        className={`${
          isActive ? "max-h-40" : "max-h-0 invisible"
        } text-sm text-center px-2 pt-5 transition-all duration-500 ease-in-out overflow-hidden`}
      >
        {lessons.map((lesson: any, index: number) => (
          <li
            key={index}
            onClick={() => setCurrentLesson(lesson)}
            className="flex items-center mb-5 space-x-2 cursor-pointer hover:bg-gray-100 px-2 rounded py-1"
          >
            <img
              // src={type == "reading" ? readingImg : assessmentImg}
              src={readingImg}
              alt=""
              className="w-[17px]"
            />
            <p className="text-start">
              {/* <span className="capitalize font-[600]">{type}: </span> */}
              <span className="text-[14px] capitalize font-[600]">Reading: </span>
              <span className="text-[14px] text-nowrap">{lesson.topic}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LessonSidebar: FC<any> = ({
  chapters,
  isOpen,
  close,
  textbook,
  setCurrentLesson,
}) => {

  const getClassName = () => 
    isOpen ? `w-0 sm:w-[390px] fixed sm:relative ease-in-out relative duration-300 transition-all overflow-y-auto max-h-screen h-screen`
    : `sm:-translate-x-full sm:w-0 fixed sm:relative ease-in-out relative duration-300 transition-all overflow-y-auto max-h-screen h-screen`;


  return (
    // <div className="w-[413px] px-10 py-4 border-r h-[980px] ">
    <div
      className={getClassName()}
    >
      {isOpen && (
        <div className="absolute z-[10000] bg-white h-screen sm:w-auto w-screen py-4">
          <div className="px-10 flex items-center justify-between">
            <img src={logoImg} alt="" className="" />
            <button className="sm:hidden" onClick={() => close()} >&times;</button>
          </div>
          <div className="mt-12 px-4">
            <button onClick={() => window.history.back()}>
              <LeftArrow fill="#000000" className="w-[14px]" />
              {/* <img src={leftArrow} className="w-[18px] text-black" /> */}
            </button>
            <div className="text-dark mt-2">
              <p className="quicksand font-[700]">{textbook.name}</p>
              {/* <p className="text-sm">By David Ogunshola</p> */}
            </div>
            <div className="text-sm mt-4">
              {chapters.map((chapter: any, index: number) => (
                <ChapterDropdown
                  key={index}
                  title={chapter.name}
                  setCurrentLesson={setCurrentLesson}
                  lessons={chapter.lessons}
                />
              ))}
            </div>
          </div>
        </div>
      )}  
    </div>
  );
};

export default LessonSidebar;
