import Overlay from "./Overlay";
import image from "../assets/unsure-guy.png";
import GlobalResource from "services/api/resources/GlobalResource";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { AssessmentResultInterface, ResultInterface } from "..";

export default function SubmitExamModal({
  setSubmitModal,
  data,
  examSetData,
  setSubmittedModal,
  answersRef,
  generateReport,
  handleSubmit,
}: any) {
  const [loading, setLoading] = useState(false);
  const submit = () => {
    setLoading(true);
    const answers: ResultInterface[] = generateReport();

    const totalScore = answers
      ?.map((a) => a.scores.subjectScore)
      .reduce((acc, val) => acc + val);


    const payload = {
      answers: answersRef?.current,
      slides: data.map((s: any) => ({
        subject: s.subject,
        slides: s.lesson.lesson_slides.map((ls: any) => ls.id),
      })),
      score: totalScore,
    };

    const result = { ...payload, answers: answers}

    // Uncomment this to save the session when ready
    GlobalResource.saveExamSession(examSetData.id, payload)
      .then((response) => {
        if (!response.data.error) {
          setSubmitModal(false);
          setSubmittedModal(true);
          handleSubmit(result);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };
  const handleCancel = () => {
    setSubmitModal(false);
  };

  return (
    <Overlay close={() => setSubmitModal(false)}>
      <div className="bg-white outfit-font gap-4 rounded-[12px] py-16 shadow p-4 flex-col lg:w-[450px] w-full flex items-center justify-center">
        <img src={image} alt="" className="w-[12rem]" />
        <p className="text-[#9C29B2] font-semibold text-2xl">
          Submit your exams
        </p>
        <p className="text-[14px] text-center">
          By agreeing to this action, you won’t be able to <br /> revoke your
          action.
        </p>
        <div className="flex items-center gap-6">
          <button
            onClick={handleCancel}
            className="px-12 py-2 rounded-[20px]  text-[#9C29B2] border border-[#9C29B2]"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-12 py-2 rounded-[20px] text-white bg-[#9C29B2]"
          >
            {loading ? <PulseLoader size={8} color="white" /> : "Submit"}
          </button>
        </div>
      </div>
    </Overlay>
  );
}
