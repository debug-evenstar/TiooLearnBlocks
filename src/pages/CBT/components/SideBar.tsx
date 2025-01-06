import logoImg from "../../../img/logo.png";
import LeftArrow from "FigmaIcons/LeftArrow";
import { FC, forwardRef, useEffect, useImperativeHandle, useState } from "react";

const QuestionNav: FC<any> = ({
  lesson,
  answers,
  setActiveSlide,
  activeSlide,
  onItemClick,
}) => {
  const slides = lesson?.lesson_slides;
  const answeredSlides = Object.keys(answers ?? {});
  const isActive = (index: number) => activeSlide === index;
  const isAnswered = (slide_id: number) => answeredSlides.includes(String(slide_id));

  return (
    <>
      <p>Question Navigation</p>
      <ul className="grid grid-cols-8 gap-1 mt-3 w-full">
        {slides?.map(({ id }: any, i: number) => (
          <li key={id}>
            <button
              onClick={() => onItemClick(i)}
              className={`px-1 flex items-center justify-center py-2 focus:border-purple-400 outline-none border w-[30px] h-[30px] rounded-md text-sm
                ${isActive(i) ? "bg-green-700 text-white" : isAnswered(id) ? "bg-[#9C29B2] text-white" : ""}`}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const SideBar: FC<any> = forwardRef(({
  lesson,
  subject,
  studentName,
  setActiveSlide,
  activeSlide,
  answersRef,
  slideManagerRef,
}, ref) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    sideBarOpen,
    setSideBarOpen,
    toggleSideBar: () => setSideBarOpen(!sideBarOpen),
  }));

  const close = () => setSideBarOpen(false);
  const handleSetSlide = (index: number) => slideManagerRef?.current?.navigator(0, index);
  const [answers, setAnswers] = useState<any>();

  useEffect(() => {
    if (answersRef.current && subject?.id) {
      const subjectAnswers = answersRef.current[subject.id];
      setAnswers(subjectAnswers);
    }
  }, [answersRef.current, lesson]);

  return (
    <div className={`h-screen flex ${sideBarOpen ? "block z-[1000]" : "hidden"} sm:block`}>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 sm:hidden ${sideBarOpen ? "block" : "hidden"}`}
        onClick={close}
      ></div>

      {/* Sidebar Content */}
      <div
        className={`w-[80%] sm:w-[330px] bg-white sm:relative fixed inset-y-0 left-0 transform sm:translate-x-0 transition-transform duration-300 ease-in-out ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-10 lg:px-4 py-4">
          <div className="flex items-center justify-between">
            <img src={logoImg} alt="Logo" />
            <button className="sm:hidden" onClick={close}>
              &times;
            </button>
          </div>

          <div className="mt-12 px-4">
            <button onClick={() => window.history.back()}>
              <LeftArrow fill="#000000" className="w-[14px]" />
            </button>

            <div className="mt-4 quicksand">
              <ul className="flex flex-col gap-2">
                <li>
                  <b>Student's Name:</b> <span>{studentName}</span>
                </li>
                <li>
                  <b>Exam Title:</b> <span>UTME</span>
                </li>
              </ul>
              <p className="mt-8">
                <span>Current Subject: </span>
                <b>{subject?.name}</b>
              </p>
            </div>

            <div className="mt-5">
              <QuestionNav
                answers={answers}
                onItemClick={handleSetSlide}
                lesson={lesson}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SideBar;