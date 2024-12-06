import React from "react";
import image from "./assets/congrats.gif";
import logo from "../../img/logo.png";
import { AssessmentResultInterface, ResultInterface } from ".";
export default function AssessmentResult({
  resultRef,
  home,
}: {
  resultRef: React.RefObject<AssessmentResultInterface>;
  home: any;
}) {
  const answers = resultRef?.current?.answers || [];
  const totalScore = resultRef.current?.answers
    ?.map((a) => a.scores.subjectScore)
    .reduce((acc, val) => acc + val);

  return (
    <div className="h-screen fixed w-full z-[100] bg-white">
      <div className="h-[90px] border-b px-7 flex items-center">
        <img src={logo} className="w-[5rem]" alt="" />
      </div>
      <div className="bg-white outfit-font gap-4 py-16 p-4 flex-col grow w-full flex items-center justify-center">
        <img src={image} alt="" className="w-[12rem]" />
        <p className="text-lg">Congratulations</p>
        <p className="text-[14px] text-center">
          You Have Completed Your Assessment With A Test Score break down below.
        </p>
        <div>
          <ul>
            {answers.map(
              ({
                subject: { name },
                scores: { subjectScore },
              }: ResultInterface) => (
                <li className="flex gap-3 items-center">
                  <span>{name}:</span>
                  <span className="text-[#9C29B2]">{`${Math.round(subjectScore || 0)}/${100}`}</span>
                </li>
              )
            )}
            <li className="flex gap-3 items-center">
              <span>Total:</span>
              <span className="text-[#9C29B2]">{Math.round(totalScore || 0)}</span>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={home}
            className="px-12 py-2 rounded-[20px]  text-[#9C29B2] border border-[#9C29B2]"
          >
            Home page
          </button>
          <button className="px-12 py-2 rounded-[20px] text-white bg-[#9C29B2]">
            See analysis
          </button>
        </div>
      </div>
    </div>
  );
}
