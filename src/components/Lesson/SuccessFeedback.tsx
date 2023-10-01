import React, { FC, useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { ContinueSmallBtn } from "./UI/CompButton";
interface Props {
  close: () => void;
  message: string;
  canProceed : boolean;
  proceed : Function;
}
const SuccessFeedback: FC<Props> = ({ close, message, canProceed, proceed }) => {
    const [showContinue, setShowContinue] = useState(false)
  return (
    <>
      <div className="">
        <div className="h-[80vh] w-[280px] absolute bottom-0 -right-3 bg-bgsuccess bg-fit flex  justify-end showfeed">
          <div className="text-center text-white fw-600 w-[85%] pr-4 mb-6 mt-[180px]">
            <p className="fs-700 blob-thing">{message}</p>
            <div className="mt-6 flex justify-center">
            {canProceed && (<ContinueSmallBtn onClick={() => proceed()} title={'Continue'}/>)}
            </div>
          </div>
          <MdOutlineCancelPresentation
            className="text-white text-3xl absolute top-10 right-10 cursor-pointer"
            onClick={close}
          />

        </div>
      </div>
    </>
  );
};

export default SuccessFeedback;
