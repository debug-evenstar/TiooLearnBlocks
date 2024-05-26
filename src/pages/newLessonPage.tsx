import LessonSlide from 'components/NewLesson/LessonSlide';
import LessonLayout from 'layouts/LessonLayout';
import React, { FC } from 'react'

interface NewLessonPageProps {
  subject?: string;
  className?: string;
  title?: string;
  slides?: any[];
  back?: Function;
}
const NewLessonPage: FC<NewLessonPageProps> = ({
  // subject,
  // className,
  // title,
  // slides,
  // back,
}) => {
  return (
    <LessonLayout>
      <LessonSlide/>
    </LessonLayout>
  );
}

export default NewLessonPage;