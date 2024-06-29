import LessonHeader from "components/NewLesson/Layout/LessonHeader";
import LessonSidebar from "components/NewLesson/Layout/LessonSidebar";
import LessonFooter from "components/NewLesson/Layout/LesssonFooter";
import { ReactNode, useEffect, useRef, useState } from "react";

import "./LessonLayout.css";
import LessonSlides from "components/NewLesson/LessonSlides";
import AudioButton from "components/NewLesson/Buttons/audioBtn";
import ToggleNavBtn from "components/NewLesson/Buttons/toggleNavigation";

export interface LessonLayoutProps {
  textbook: any;
  chapters: any;
  lesson?: any;
  sideBar?: boolean;
  children?: ReactNode;
  back?: Function;
  lessonSlides? : Function;
  closePreview? : Function;
}

interface NavigationHandles {
  previous : Function;
  continue : Function;
}

interface LessonStateActions {
  setActiveSlide : Function;
  setCanProceed : Function;
}

export interface LessonSlideProps {
  managerRef : React.RefObject<any>;
  navigationHandles : NavigationHandles;
  slides : any[];
  stateActions : LessonStateActions
}

export default function LessonLayout({
  textbook,
  chapters,
  children,
  lesson,
  sideBar=true,
  closePreview,
  lessonSlides
}: LessonLayoutProps) {


  const [currentLesson, setCurrentLesson] = useState(chapters[0]?.lessons[0]);

  console.log("printing lesson",currentLesson);

  const [currentChapter, setCurrentChapter] = useState(lesson? lesson.Chapter : chapters[0]);


  const slideManagerRef = useRef<any>(null);
  const [canProceed, setCanProceed] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);

  const [sideBarOpen, setSideBarOpen] = useState(true);

  const getCurrentChapterFromLesson = (chapter_id: number) => {
    return chapters.find((i: any) => i.id == chapter_id);
  };

  const handleContinue = () => {
    const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
    if (currentSlideIndex === currentLesson.slides.length - 1) {
      // back();
    } else {
      slideManagerRef?.current?.navigator(1);
      setCanProceed(false);
    }
  };

  const handlePrevious = () => {
    slideManagerRef?.current?.navigator(-1);
    setCanProceed(false);
  };

  const lessonSlidesArgs : LessonSlideProps = {
    managerRef : slideManagerRef,
    navigationHandles : { continue : handleContinue, previous : handlePrevious},
    slides : currentLesson.slides,
    stateActions : {
      setActiveSlide, setCanProceed
    }
  }

  useEffect(() => {
    setCurrentChapter(getCurrentChapterFromLesson(currentLesson.chapter_id));
  }, [currentLesson]);

  return (
    <div className="flex bg-white w-screen z-[100000] w-full overflow-hidden urbanist">
      {
        sideBar && 
        <LessonSidebar
          isOpen={sideBarOpen}
          {...{ chapters, textbook, setCurrentLesson }}
        />
      }
      <div className="flex flex-col w-full relative justify-between border-l h-screen">
        <LessonHeader
          getChapter={null}
          chapter={currentChapter}
          currentLesson={currentLesson}
        />
        <div className="relative px-28 flex flex-col overflow-x-hidden  border-green-500 h-[calc(100vh_-_170px)] overflow-y-auto">
          <AudioButton />
          <ToggleNavBtn isOpen={sideBarOpen} handleClick={() => setSideBarOpen(!sideBarOpen)} />
          { lessonSlides && lessonSlides(
            {...lessonSlidesArgs}
          )}
          {children}
                    {/* <LessonSlides
            slideManagerRef={slideManagerRef}
            handlePrevious={handlePrevious}
            handleContinue={handleContinue}
            slides={currentLesson.slides}
            setActiveSlide={setActiveSlide}
            setCanProceed={setCanProceed}
          /> */}
        </div>
        <LessonFooter previous={handlePrevious} closePreview={closePreview} isPreview={!!lesson} next={handleContinue} />
      </div>
    </div>
  );
}
