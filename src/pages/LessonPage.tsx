import LessonSlides from "components/NewLesson/LessonSlides";
import LessonLayout, { LessonSlideProps } from "layouts/LessonLayout";
import React, { FC } from "react";

import { slides } from "dump/can";

interface LessonPageProps {
  textbook: any;
  chapters: any;
  lessons: any;
  back?: Function;
}
const LessonPage: FC<LessonPageProps> = ({
  textbook,
  chapters,
  lessons,
  back,
}) => {
  return <LessonLayout {...{ 
    back, 
    textbook, 
    chapters, 
    lessons,
    lessonSlides : (slideProps : LessonSlideProps) => (
      <LessonSlides
          slideManagerRef={slideProps.managerRef}
          handlePrevious={slideProps.navigationHandles.previous}
          handleContinue={slideProps.navigationHandles.continue}
          slides={slideProps.slides}
          setActiveSlide={slideProps.stateActions.setActiveSlide}
          setCanProceed={slideProps.stateActions.setCanProceed}
      />
    )
  }} />;
};

export default LessonPage;
