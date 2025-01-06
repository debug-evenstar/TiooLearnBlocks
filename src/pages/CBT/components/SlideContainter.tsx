import LessonSlides from "components/NewLesson/LessonSlides";
import { LessonContext } from "contexts/LessonContext";
import { LessonSlideProps } from "layouts/LessonLayout";
import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface SlideContainerProps {
  activeSlide: number;
  slideManagerRef: React.RefObject<any>;
  setActiveSlide: Function;
  lesson: any;
  answerProps: {
    updateAnswer: Function;
  };
  setCanProceed: Function;
  ref: any;
}

const SlideContainer: FC<SlideContainerProps> = forwardRef(
  (
    {
      activeSlide,
      slideManagerRef,
      setActiveSlide,
      lesson,
      answerProps,
      setCanProceed,
    },
    ref
  ) => {
    const feedbackRef = useRef<any>(null);

    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
      setSlideIndex(activeSlide);
    }, [activeSlide]);

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

    useImperativeHandle(ref, () => ({
      handleContinue: handleContinue,
      handlePrevious: handlePrevious,
      getActiveSlide: () => slideManagerRef.current?.activeSlide(),
      getActiveSlideIndex: () => slideManagerRef.current?.activeSlideIndex(),
    }));

    const lessonSlides = (slideProps: LessonSlideProps) => (
      <LessonSlides
        isAssessment
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
      <div className="flex h-full grow overflow-y-auto pt-8 relative">
        <LessonContext.Provider
          value={{
            lesson,
            feedbackRef,
            isAssessment: true,
            answerProps,
          }}
        >
          {lessonSlides &&
            lessonSlides({
              ...lessonSlidesArgs,
            })}
        </LessonContext.Provider>
      </div>
    );
  }
);

export default SlideContainer;
