import logoImg from "../../../img/logo.png";

import LeftArrow from "FigmaIcons/LeftArrow";

import { FC, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";

const QuestionNav: FC<any> = ({
  lesson,
  setActiveSlide,
  activeSlide,
  onItemClick,
  back
}) => {
  const slidesCount = lesson?.lesson_slides.length;

  const isActive = (index: number) => activeSlide == index;

  return (
    <>
      <p>Question Navigation</p>
      <ul className="grid-cols-8 grid gap-1 mt-3 w-full">
        {Array(slidesCount)
          .fill(null)
          .map((_, i: number) => (
            <li key={i}>
              <button
                onClick={() => onItemClick(i)}
                className={`px-1 flex items-center justify-center py-2 focus:border-purple-400 outline-none border w-[30px] h-[30px] rounded-md text-sm
                    ${isActive(i) ? "bg-green-700 text-white" : ""}
                  `}
              >
                {i + 1}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

const SideBar: FC<any> = ({
  lesson,
  subject,
  setActiveSlide,
  activeSlide,
  slideManagerRef,
}) => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const close = () => setSideBarOpen(false);

  const handleSetSlide = (index: number) => {
    slideManagerRef?.current?.navigator(0, index);
  };


  const getClassName = () =>
    sideBarOpen
      ? `w-0 sm:w-[390px] fixed sm:relative ease-in-out relative duration-1000 transition-all overflow-y-auto max-h-screen h-screen`
      : `sm:-translate-x-full sm:w-0 fixed sm:relative ease-in-out relative duration-1000 transition-all overflow-y-auto max-h-screen h-screen`;

  return (
    // <div className="w-[413px] px-10 py-4 border-r h-[980px] ">
    <div className={getClassName() + ` relative`}>
      {sideBarOpen && (
        <div className="absolute z-[10000] sm:z-0 bg-white h-screen sm:w-full  py-4">
          <div className="px-10 flex items-center justify-between">
            <img src={logoImg} alt="" className="" />
            <button className="sm:hidden" onClick={() => close()}>
              &times;
            </button>
          </div>
          <div className="mt-12 px-4 w-full">
            <button onClick={() => window.history.back()}>
              <LeftArrow fill="#000000" className="w-[14px]" />
              {/* <img src={leftArrow} className="w-[18px] text-black" /> */}
            </button>

            <div className="mt-4 quicksand w-full">
              <div>
                <ul className="flex  flex-col gap-2 ">
                  <li className="">
                    <b>Student's Name:</b>
                    <span> Praxeum Ani</span>
                  </li>
                  {/* <li className="">
                    <b>Subject:</b>
                    <span>{subject.name}</span>
                  </li> */}
                  <li className="">
                    <b>Exam Title: </b>
                    <span> JAMB</span>
                  </li>
                </ul>
                <p className="mt-8">
                  <span>Current Subject: </span>
                  <b>{subject?.name}</b>
                </p>
              </div>
              <div className="mt-5 w-full">
                <QuestionNav
                  onItemClick={handleSetSlide}
                  lesson={lesson}
                  activeSlide={activeSlide}
                  setActiveSlide={setActiveSlide}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
