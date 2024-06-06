import logoImg from "../../../img/logo.png";
import downCarret from "../../../img/carret-down.svg";
import readingImg from "../../../img/reading.svg";
import assessmentImg from "../../../img/assessment.svg";

import LeftArrow from "FigmaIcons/LeftArrow";
import { FC, useState } from "react";

interface LessonProps {
  type: "reading" | "assessment";
  title: string;
}

interface TextbookDropdownProps {
  title: string;
  lessons: LessonProps[];
}

const TextbookDropdown: FC<TextbookDropdownProps> = ({ title, lessons }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="w-full transition-all duration-300">
      <div
        onClick={() => setIsActive(!isActive)}
        className="cursor-pointer flex items-center justify-between border-gray-200 border-b"
      >
        <p className="text-light pb-1">{title}</p>
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
        {lessons.map(({ type, title }: any, index: number) => (
          <li
            key={index}
            className="flex items-center mb-5 space-x-2 text-[13px]"
          >
            <img
              src={type == "reading" ? readingImg : assessmentImg}
              alt=""
              className="w-[17px]"
            />
            <p className="text-start">
              <span className="capitalize font-[600]">{type}: </span>
              <span className="text-nowrap">{title}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LessonSidebar: FC<any> = () => {
  const textbooks = [
    "Amazing world of computer",
    "Computer Programs",
    "Coding Vocabulary",
  ];

  const lessons: LessonProps[] = [
    { type: "reading", title: "What are computers" },
    { type: "assessment", title: "What are computers" },
    { type: "assessment", title: "Can you tell if these are computers" },
  ];

  return (
    // <div className="w-[413px] px-10 py-4 border-r h-[980px] ">
    <div className="w-[390px] py-4 overflow-y-auto max-h-screen h-screen ">
      <div className="px-10">
        <img src={logoImg} alt="" className="" />
      </div>
      <div className="mt-12 px-4">
        <button>
          <LeftArrow fill="#000000" className="w-[14px]" />
          {/* <img src={leftArrow} className="w-[18px] text-black" /> */}
        </button>
        <div className="text-dark mt-2">
          <p className="quicksand font-[700]">Early Coding For Kids</p>
          <p className="text-sm">By David Ogunshola</p>
        </div>
        <div className="text-sm mt-4">
          {textbooks.map((title, index) => (
            <TextbookDropdown
              key={index}
              title={title}
              lessons={lessons}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonSidebar;
