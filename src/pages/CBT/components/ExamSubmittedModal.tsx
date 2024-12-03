import React from "react";
import image from "../assets/good-job.gif";
import Overlay from "./Overlay";
export default function ExamSubmittedModal({
  submittedModal,
  handleClick,
  setSubmittedModal,
}: any) {

  const close = () => {
    setSubmittedModal(false);
    handleClick();
  }

  return (
    <Overlay close={() => setSubmittedModal(false)}>
      <div className="bg-white outfit-font gap-4 rounded-[12px] py-16 shadow p-4 flex-col lg:w-[450px] w-full flex items-center justify-center">
        <img src={image} alt="" className="w-[12rem]" />
        <p className="text-[#9C29B2] font-semibold text-2xl">
          Successful !!!!!!!
        </p>
        <p className="text-[14px] text-center">Examination submitted!</p>
        <div className="flex items-center gap-6">
          <button onClick={close} className="px-24 py-2 rounded-[20px] text-white bg-[#9C29B2]">
            View results
          </button>
        </div>
      </div>
    </Overlay>
  );
}
