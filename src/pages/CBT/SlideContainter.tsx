import LessonSlides from "components/NewLesson/LessonSlides";
import { LessonContext } from "contexts/LessonContext";
import { LessonSlideProps } from "layouts/LessonLayout";
import { FC, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SlideContainer: FC<any> = forwardRef(({ activeSlide,slideManagerRef, setActiveSlide,lesson, canProceed, setCanProceed },ref) => {
  const feedbackRef = useRef<any>(null);

  const [ slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(activeSlide);
  },[activeSlide]);

  const currentLesson = lesson;

  const handleContinue = () => {
    const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
    if (
      currentLesson &&
      currentSlideIndex === currentLesson.lesson_slides.length - 1
    ) {
    } else {
      setActiveSlide(slideIndex + 1);
      slideManagerRef?.current?.navigator(1);
      // feedbackRef?.current.hideFeedback();
    }
    // handleUpdateProgress();
  };

  const handlePrevious = () => {
    slideManagerRef?.current?.navigator(-1);
    if (slideIndex > 1) setActiveSlide(slideIndex - 1);
  };

  const lessonSlidesArgs: LessonSlideProps = {
    managerRef: slideManagerRef,
    navigationHandles: {
      continue: handleContinue,
      previous: handlePrevious,
    },
    slides: currentLesson?.lesson_slides ?? [],
    stateActions: {
      setActiveSlide,
      setCanProceed: (value: boolean, data: any = {}) => {
        setCanProceed(value);
      },
    },
  };


  useImperativeHandle(ref,() => {
    return {
      handleContinue: handleContinue,
      handlePrevious: handlePrevious,
      getActiveSlide: () => slideIndex,
    }
  })

  const lessonSlides = (slideProps: LessonSlideProps) => (
    <LessonSlides
      slideManagerRef={slideProps.managerRef}
      handlePrevious={slideProps.navigationHandles.previous}
      handleContinue={slideProps.navigationHandles.continue}
      slides={slideProps.slides}
      setActiveSlide={slideProps.stateActions.setActiveSlide}
      setCanProceed={slideProps.stateActions.setCanProceed}
      // setFeedbackCanProceed={slideProps.stateActions.setFeedbackCanProceed}
    />
  );
  return (
    <div className="flex h-full grow">
      <LessonContext.Provider
        value={{
          lesson,
          feedbackRef,
        }}
      >
        {lessonSlides &&
          lessonSlides({
            ...lessonSlidesArgs,
          })}
      </LessonContext.Provider>
    </div>
  );
});

export default SlideContainer;
