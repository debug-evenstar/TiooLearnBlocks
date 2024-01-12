import { handleSetCorrectOption } from "provider/optionsDataSlice";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feedback: FC<any> = ({ manager }) => {
  const selector: any = useSelector(handleSetCorrectOption);
  const id = selector.payload.activeViewbox.value;

  const [questions, setQuestions] = useState<any[]>([]);

  const dispatch = useDispatch();
  const { identifier } = selector.payload.optionsData.value as {
    identifier: string;
  };
  const coreData = manager?.canvasManager?.activeComponent.data.coreData;

  useEffect(() => {
    coreData?.questions?.forEach((question: any) => {
      if (question?.identifier === identifier) {
        setQuestions([...questions, question]);
        console.log(question);
      }
    });
  }, [coreData, identifier]);
  return (
    <div className="w-full h-[15rem] bg-white border border-black absolute left-[-20]">
      <header className="border-b border-black text-[12px]">
        Set Feedback
      </header>
      <div className="text-[13px]">Option 1</div>
    </div>
  );
};

export default Feedback;
