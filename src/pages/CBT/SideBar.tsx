import logoImg from "../../img/logo.png";

import LeftArrow from "FigmaIcons/LeftArrow";

import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";

const QuestionNav = () => {
  return (
    <>
      <p>Question Navigation</p>
      <ul className="grid-cols-8 grid gap-1 mt-3 w-full">
        {Array(23)
          .fill(null)
          .map((_, i: number) => (
            <li>
              <button className="px-1 flex items-center justify-center py-2 focus:border-purple-400 outline-none border w-[30px] h-[30px] rounded-md text-sm">
                {i + 1}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

const SideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const close = () => setSideBarOpen(false);

  const enableAnswers = false;
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
                  <li className="">
                    <b>Subject:</b>
                    <span> Mathematics</span>
                  </li>
                  <li className="">
                    <b>Exam Title: </b>
                    <span> JAMB</span>
                  </li>
                </ul>
                <p className="mt-8">
                  <span>Current Subject: </span>
                  <b>Mathematics</b>
                </p>
              </div>
              <div className="mt-5 w-full">
                <QuestionNav />
                <button disabled={!enableAnswers} className={`${ enableAnswers ? "text-[#9C29B2] border-[#9C29B2]":"bg-[#A9A9A9] text-white"} px-4  border mt-4 text-sm py-1 rounded-full`}>
                  See your answers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
