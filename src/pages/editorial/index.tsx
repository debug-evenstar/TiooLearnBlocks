import React from "react";
import MultipleOptions from "../../components/library/MultipleOptions";
import TextImage from "../../components/library/TextImage";
import MainLayout from "../../layouts/MainLayout";
import {FaAngleRight, FaAngleLeft} from "react-icons/fa"


function Editorial() {
  return (
    <MainLayout>
      <div className="w-full bg-white h-full px-[30px] py-[28px]">
        <div>
          <h3 className="text-center text-[#030036] opacity-70 text-[18px]">
            <span className="font-semibold ">Lesson 3:</span> <br />
            <span className="font-normal"> Slide 1</span>
          </h3>
        </div>
        <div className="w-full mt-[62px] h-full max-h-[60%] flex gap-3">
          <div className="flex justify-between z-50 absolute w-[55%] top-[50%]">
            <div className="w-[54px] h-[54px] rounded-full border-[1.5px] shadow-lg cursor-pointer border-[#87909E] flex items-center justify-center">
              <FaAngleLeft className="text-[#87909E] text-[20px]" />
            </div>
            <div className="w-[54px] h-[54px] rounded-full border-[1.5px] shadow-lg cursor-pointer border-[#87909E] flex items-center justify-center">
              <FaAngleRight className="text-[#87909E] text-[20px]" />
            </div>
          </div>

          <div className="w-[20%]">
            <h3 className="text-[14px] text-[#87909E] font-normal text-center">
              Component
            </h3>
            <h4 className="text-[#030036] opacity-70  text-base font-normal text-center">
              Multi-choice
            </h4>
          </div>
          <div className=" w-full border-[0.92px] rounded-[9px] overflow-hidden h-full shadow-md">
            <MultipleOptions />
            {/* <TextImage /> */}
          </div>
          <div className="w-[20%]">
            <div className="w-full flex items-center justify-center">
              <label className="accent-[#4F46E5] inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-[20px] w-[20px] text-red-600"
                  checked
                />
                <span className="ml-2 text-[#4F46E5] text-base font-medium">
                  Used
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-full h-full mb-[40px] mt-[44px] bottom-0 z-50 relative px-[30px]">
          <div className="w-full h-[50px] flex items-center justify-between">
            <div className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-3 cursor-pointer text-semibold">
              Save
            </div>
            <div className="w-[140px] rounded-[8px] border bg-[#4F46E5] text-white flex items-center justify-center py-3 cursor-pointer text-semibold">
              Preview
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Editorial;
