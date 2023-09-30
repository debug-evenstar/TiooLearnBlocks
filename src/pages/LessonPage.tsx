import { FC, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import RenderComponent from "./renderComp";

interface LessonPageProps {
    subject : string;
    className : string;
    title : string;
    slides : any[];
}
const LessonPage : FC<LessonPageProps> = ({subject, className, title, slides}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sl = [
    [
        {
            tips: [],
            content: "<*-Rotation of the sun-*>",
            component: "Text",
        },
        {
            tips: ["This imaginary line is called the earth's axis."],
            content:
                "The earth rotates from the West to the East as if it is being turned on an <~imaginary line~> passing through its centre.",
            component: "Text",
        },
        {
            content:
                "The <?> is not ready",
            component: "Text",
            answers: [
                "Test",
            ],
        },
        {
            answers: [
                ["Day", "Night"],
                ["Night", "Day"],
            ],
            content:
                "This rotation of the earth about its axis causes <?> and <?> .",
            component: "Text",
        },
        {
            content:
                "The earth makes one complete rotation about its axis in <(<**twenty-four hours**>)>.",
            component: "Text",
        },
    ],
    [
        {
            component : "Text",
            content : "The robot needs to get to the cookie. We would write a program to help the robot reach the box with the cookie.",
        },
        {
            component: "GridSteps",
            start : "1X1",
            end : "4X1",
            size : "4X4",
            steps : 3,
            example : true,
            answers : ["4X1"],
            theme : "white",
            feedbacks : [
                ["Cool!. Now let's try out some exercises"]
            ]
        },
    ],
    [
        {
            component: "GridSteps",
            start : "1X1",
            end : "4X3",
            size : "4X4",
            steps : 5,
            answers : ["4X3"],
            theme : "white",
            feedbacks : [
                ["Yayy", "Try Again"]
            ]
        },
    ],
    [
        {
            component: "GridSteps",
            start : "3X4",
            end : "1X2",
            size : "4X4",
            steps : 4,
            answers : ["4X3"],
            theme : "white"
        },
    ],
  ];
  return (
    <>
      <div id="LessonPage" className="lesson-bg-default lg:bg-cover bg-fixed nue w-full h-screen overflow-y-auto pb-24 lg:pb-0 px-3 lg:px-6 xl:px-6 flex flex-col">
        <div className="">
        <div className="hidden lg:flex text-white justify-between">
          <div className="exit-box lg:w-3/12 pt-6">
            <div className="flex gap-x-2 item-center cursor-pointer" onClick={() => navigate(-1)}>
              <MdArrowBack className="text-4xl" />
              <span className="fw-600 text-2xl mt-1">EXIT</span>
            </div>
            { subject && className && (<p className="mt-4 hidden">{subject} : {className}</p>)}
          </div>
          <div className="w-6/12 relative">
          <img
              src="https://res.cloudinary.com/dic7regoe/image/upload/v1691443460/praxeum/Group_12598_mkbyg0.png"
              alt="board"
              className="w-full absolute hanger-default"
            />
            <img
              src="https://res.cloudinary.com/dbgorivob/image/upload/v1696016208/backgrounds/HangingBar_g9ydh0.png"
              alt="board"
              className="w-full absolute hanger-white"
            />
            <div className="mt-[9%] text-center relative">
              {/* <p className="fw-600 text-black text-lg">Lesson 1</p> */}
              {title && (<p className="font-bold  text-[#FA14D5] pt-3 text-2xl 2xl:text-3xl ">
                {title}
              </p>)}
            </div>
          </div>
          <div className="lg:w-3/12 pt-6">
            <p className="mt-8 lg:pl-8 hidden">
              Chapter 1: Introduction to Basic science Lesson 3 of 5
            </p>
          </div>
        </div>
        </div>
        <div className="lg:hidden text-white">
          <div className="flex items-center justify-between pt-4">
            <Link to="/home" className="flex gap-x-2 item-center">
              <MdArrowBack className="text-3xl" />
              <span className="fw-600 text-2xl mt-1">EXIT</span>
            </Link>
            {subject && className && (<p className="w-7/12 text-end">{subject}: {className}</p>)}
          </div>
          <div>
            <p className="mt-4 text-center px-6">
              Chapter 1: Introduction to Basic science Lesson 3 of 5
            </p>
          </div>
          <div className="w-11/12 mx-auto h-20 oveflow-hidden text-center mt-4 relative">
          <img src="https://res.cloudinary.com/dic7regoe/image/upload/v1691566168/praxeum/Group_12535_prhvpt.png" alt="header" className="absolute w-full h-full top-0 left-0 hanger-default" />
            <img src="https://res.cloudinary.com/dbgorivob/image/upload/v1696016276/backgrounds/Group_12535_v1uqzx.png" alt="header" className="absolute w-full h-full top-0 left-0 hanger-white" />
            <div className="relative z-10 pt-2">
            <p className="fw-600 text-[#4F46E5]">Week 1</p>
            {title && (<p className="fw-600 text-[#FA14D5]">
              {title}
            </p>)}
            </div>
          </div>
        </div>
        <div className="lg:mt-16 w-full grow">
          {sl && sl.length && (<RenderComponent slides={sl} back={()=>{}}/>)}
        </div>
      </div>
    </>
  );
};

export default LessonPage;
