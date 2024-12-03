import React, { useEffect, useMemo, useRef, useState } from "react";
import TopNav from "./components/TopNav";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import GlobalResource from "services/api/resources/GlobalResource";
import SubmitExamModal from "./components/SubmitExamModal";
import ExamSubmittedModal from "./components/ExamSubmittedModal";
import { SubjectLesson } from "./types";
import { OptionInterface } from "apps/Editorial/Sidebars/RightSidebar/Questions/ActiveQuestion";
import SlideContainer from "./components/SlideContainter";
import AssessmentResult from "./AssessmentResult";


interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => (
  <div className="border w-full h-screen overflow-hidden flex flex-col justify-between">
    {children}
  </div>
);

export interface AssessmentAnswerInterface {
  [subject_id: string | number]: {
    [slide_id: string | number]: {
      hash: string;
      isAnswer: boolean;
    };
  };
}

interface AssessmentPageProps {
  set_id: string | number;
  goHome: Function;
  goBack: Function;
  duration: number;
}

export interface ResultInterface {
  subject: { id: number; name: string };
  scores: {
    correctCount: number;
    subjectScore: number;
    over: number;
  };
}

export interface AssessmentResultInterface {
  answers: ResultInterface[];
  slides: any;
  score: number;
}

const AssessmentPage: React.FC<AssessmentPageProps> = ({
  set_id,
  goHome,
  goBack,
  duration,
}) => {
  const [data, setData] = useState<SubjectLesson[] | null>(null);
  const [examSetData, setExamSet] = useState<any>(null);
  const [current, setCurrent] = useState<SubjectLesson | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [canProceed, setCanProceed] = useState(true);
  const [submitModal, setSubmitModal] = useState(false);
  const [submittedModal, setSubmittedModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [inSession, setInSession] = useState(false);

  const answersRef = useRef<AssessmentAnswerInterface>({});
  const resultsRef = useRef<AssessmentResultInterface | null>(null);
  const sliderRef = useRef<any>(null);
  const slideManagerRef = useRef<any>(null);

  const getCurrentSlide = () => {
    const slideIndex = sliderRef.current?.getActiveSlideIndex() || 0;
    return current?.lesson.lesson_slides[slideIndex] || null;
  };

  const constructAnswerEntry = (option: OptionInterface) => {
    const slide = getCurrentSlide();
    return slide
      ? {
          [slide.id]: { hash: option.hash, isAnswer: option.isAnswer === true },
        }
      : {};
  };

  const updateAnswer = (option: OptionInterface) => {
    const newAnswer = constructAnswerEntry(option);
    const subjectId = current?.subject.id;
    if (subjectId) {
      answersRef.current = {
        ...answersRef.current,
        [subjectId]: {
          ...(answersRef.current[subjectId] || {}),
          ...newAnswer,
        },
      };
    }
  };

  useEffect(() => {
    GlobalResource.getExamSet(set_id).then((response) => {
      const { subjectLessonMap, set } = response.data;
      setData(subjectLessonMap);
      setExamSet(set);
      if (subjectLessonMap.length > 0) setCurrent(subjectLessonMap[0]);
    });
  }, [set_id]);

  useEffect(() => {
    setActiveSlide(0);
  }, [current]);

  const findSubjectById = (id: string | number) =>
    data?.find((subjectLesson) => subjectLesson.subject.id == id);

  const processSubjectScore = (subjectId: string | number) => {
    const answers = answersRef.current[subjectId] || {};
    const correctAnswers = Object.values(answers).filter(
      (ans) => ans.isAnswer
    ).length;
    return correctAnswers;
  };

  const generateReport = () => {
    if (!data) return [];
    return data?.map((d: any) => {
      const subjectId = d.subject.id;
      const subjectLesson = findSubjectById(subjectId);
      const slides = subjectLesson?.lesson.lesson_slides;
      const slideCount = slides?.length;
      const score = processSubjectScore(subjectId);
      const subjectScore = (100 / slideCount) * score;
      return {
        subject: subjectLesson?.subject,
        scores: {
          correctCount: score,
          subjectScore,
          over: slideCount,
        },
      };
    });
  };

  const handleSubmit = (payload: any) => {
    resultsRef.current = payload;
  };

  const handleTimeUp = () => {
    const answers = generateReport();

    const total =
      answers?.reduce(
        (acc: number, value: { scores: { correctCount: number } }) => {
          return acc + value.scores.correctCount;
        },
        0
      ) || 0;

    const payload = {
      answers: answersRef.current,
      slides: data?.map((s: any) => ({
        subject: s.subject,
        slides: s.lesson.lesson_slides.map((ls: any) => ls.id),
      })),
      score: total,
    };

    const result = { ...payload, answers: answers}

    // Uncomment this to save the session when ready
    GlobalResource.saveExamSession(examSetData.id, payload)
      .then((response) => {
        if (!response.data.error) {
          handleSubmit(result);
          setShowResult(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex">
      {submitModal && (
        <SubmitExamModal
          data={data}
          examSetData={examSetData}
          answersRef={answersRef}
          setSubmitModal={setSubmitModal}
          generateReport={generateReport}
          setSubmittedModal={setSubmittedModal}
          handleSubmit={handleSubmit}
        />
      )}
      {submittedModal && (
        <ExamSubmittedModal
          handleClick={() => setShowResult(true)}
          setSubmittedModal={setSubmittedModal}
        />
      )}
      {showResult && <AssessmentResult home={goHome} resultRef={resultsRef} />}
      <SideBar
        back={goBack}
        lesson={current?.lesson}
        subject={current?.subject}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        slideManagerRef={slideManagerRef}
      />
      <Main>
        <TopNav
          handleTimeUp={handleTimeUp}
          data={data}
          duration={duration}
          inSession={inSession}
          setInSession={setInSession}
          openSubmitModal={() => setSubmitModal(true)}
          setCurrent={setCurrent}
        />
        {inSession ? (
          <>
            <SlideContainer
              key={current?.subject.id}
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
              ref={sliderRef}
              slideManagerRef={slideManagerRef}
              setCanProceed={setCanProceed}
              lesson={current?.lesson}
              answerProps={{
                updateAnswer,
              }}
            />
            <Footer
              sliderRef={sliderRef}
              canProceed={canProceed}
              hasPrevious={activeSlide > 0}
            />
          </>
        ) : (
          <div className="grow flex items-center justify-center">
            <p>Please click on start time to get started</p>
          </div>
        )}
      </Main>
    </div>
  );
};

export default AssessmentPage;
