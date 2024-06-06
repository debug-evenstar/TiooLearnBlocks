import LessonSlides from "components/NewLesson/LessonSlides";
import LessonLayout from "layouts/LessonLayout";
import React, { FC } from "react";

import { slides } from "dump/can";

interface NewLessonPageProps {
  textbook: any;
  chapters: any;
  lessons: any;
  back?: Function;
}
const NewLessonPage: FC<NewLessonPageProps> = ({
  textbook,
  chapters,
  lessons,
  back,
}) => {
  return <LessonLayout {...{ back, textbook, chapters, lessons }} />;
};

export default NewLessonPage;
