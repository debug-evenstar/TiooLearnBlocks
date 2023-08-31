import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const datas = [
  {
    id: 1,
    text: "The Environment",
  },
  {
    id: 2,
    text: "Air in Motion",
  },
  {
    id: 3,
    text: "Basics of Living things",
  },
  {
    id: 4,
    text: "Animals",
  },
  {
    id: 5,
    text: "Soil",
  },
];
const  RightSidebar = ({data}:any) => {
  const Item = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isActive, setIsActive] = useState(1);
    return (
      <div className="w-full my-5">
        <h3 className="text-[12px] text-[#87909E] font-medium">First Term</h3>
        <div className="w-full flex items-center justify-between">
          <h3
            className="text-[#030036] text-[13px] font-medium w-[137px] opacity-70 cursor-pointer py-[8px]"
            onClick={() => setIsOpen(!isOpen)}
          >
            Introduction to Basic science
          </h3>
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FaAngleUp className="text-[15px] text-[#030036]" />
            ) : (
              <FaAngleDown className="text-[15px] text-[#030036]" />
            )}
          </div>
        </div>
        {isOpen && (
          <div>
            {datas?.map((data, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setIsActive(data.id)}
                  className={` ${
                    isActive === data.id
                      ? `w-full p-[9px] text-[#4F46E5] text-[11px] font-medium border-l-[3.3px] border-[#4F46E5] bg-[#E3E2FF] rounded-[4px] overflow-hidden cursor-pointer`
                      : `w-full p-[9px] text-[#87909E] text-[11px] font-normal cursor-pointer`
                  }`}
                >
                  Lesson {data.id}: {data.text}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="border-l bg-white border-[#030036] border-opacity-10 shadow relative w-full h-screen max-w-[20%] overflow-auto pt-5 px-[29px] ">
      <div className="w-full h-full ">
        <Item />
        {/* <Item />
        <Item /> */}
      </div>
    </div>
  );
}

export default RightSidebar;
