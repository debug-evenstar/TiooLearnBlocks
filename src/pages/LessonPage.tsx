import LessonSlides from "components/NewLesson/LessonSlides";
import LessonLayout, { LessonSlideProps } from "layouts/LessonLayout";
import React, { FC } from "react";

interface LessonPageProps {
  textbook: any;
  chapters: any;
  retake?: boolean;
  lesson?: any;
  back?: Function;
}
const LessonPage: FC<LessonPageProps> = ({
  textbook,
  chapters,
  retake,
  lesson,
  back,
}) => {


  return <LessonLayout {...{ 
    back, 
    textbook, 
    chapters, 
    retake,
    lesson,
    lessonSlides : (slideProps : LessonSlideProps) => (
      <LessonSlides
          slideManagerRef={slideProps.managerRef}
          handlePrevious={slideProps.navigationHandles.previous}
          handleContinue={slideProps.navigationHandles.continue}
          slides={slideProps.slides}
          setActiveSlide={slideProps.stateActions.setActiveSlide}
          setCanProceed={slideProps.stateActions.setCanProceed}
          // setFeedbackCanProceed={slideProps.stateActions.setFeedbackCanProceed}
      />
    )
  }} />;
};

export default LessonPage;
