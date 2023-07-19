import React from "react";

function LeftSidebar() {
  const Item = () => {
    return (
      <div className="w-full h-[130px] flex gap-2 mb-[14px] cursor-pointer">
        <h6 className="text-[10px] text-black pointer-events-none">1</h6>
        <div className="h-full w-full border-[1.5px] border-[#4F46E5] rounded-[3px]"></div>
      </div>
    );
  };
  return (
    <div className="border-r bg-white border-[#030036] border-opacity-10 shadow relative w-full h-screen max-w-[20%] overflow-auto   pl-[53px] pr-[20px] overflow-y-auto  scrollbar">
      <h2 className="text-center pt-[35px] text-base text-[#87909E] font-normal">
        5 Slides
      </h2>
      <div className="w-full h-full mt-[64px] ">
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}

export default LeftSidebar;
