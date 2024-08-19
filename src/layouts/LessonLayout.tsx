import LessonHeader from "components/NewLesson/Layout/LessonHeader";
import LessonSidebar from "components/NewLesson/Layout/LessonSidebar";
import LessonFooter from "components/NewLesson/Layout/LesssonFooter";
import ChatSection from "components/ChatSection/ChatSection";
import { ReactNode, useEffect, FC, useRef, useState } from "react";

import "./LessonLayout.css";
// import LessonSlides from "components/NewLesson/LessonSlides";
import AudioButton from "components/NewLesson/Buttons/audioBtn";
import ToggleNavBtn from "components/NewLesson/Buttons/toggleNavigation";
import FeedbackPopup, { FeedbackType } from "components/NewLesson/Popups";
import { LessonContext } from "contexts/LessonContext";



export interface LessonLayoutProps {
  textbook: any;
  chapters: any;
  lesson?: any;
  sideBar?: boolean;
  children?: ReactNode;
  back?: Function;
  lessonSlides?: Function;
  closePreview?: Function;
}

interface NavigationHandles {
  previous: Function;
  continue: Function;
}

interface LessonStateActions {
  setActiveSlide: Function;
  setCanProceed: Function;
}

export interface LessonSlideProps {
  managerRef: React.RefObject<any>;
  navigationHandles: NavigationHandles;
  slides: any[];
  stateActions: LessonStateActions
}

export default function LessonLayout({
  textbook,
  chapters,
  children,
  lesson,
  sideBar = true,
  closePreview,
  lessonSlides
}: LessonLayoutProps) {


  const [currentLesson, setCurrentLesson] = useState(chapters[0]?.lessons[0] ?? null);
  const [currentChapter, setCurrentChapter] = useState(lesson ? lesson.Chapter : chapters[0]);
  const slideManagerRef = useRef<any>(null);
  const [canProceed, setCanProceed] = useState(false);
  const [activeSlide, setActiveSlide] = useState(1);
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const [showAI, setShowAI ] = useState(false);

  const feedbackRef = useRef<any>(null);

  const getCurrentChapter = (chapter_id: number) => {
    return chapters.find((i: any) => i.id === chapter_id);
  };

  const handleContinue = () => {
    const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
    console.log("really moving on to the next slide now")
    if (currentLesson && (currentSlideIndex === currentLesson.lesson_slides.length - 1)) {
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

  const handleShowAI =  () => {
    setShowAI(true);
    setSideBarOpen(false);
  }

  const handlecloseAI = () => {
    setShowAI(false);
    setSideBarOpen(true);
  }

  const lessonSlidesArgs: LessonSlideProps = {
    managerRef: slideManagerRef,
    navigationHandles: { continue: handleContinue, previous: handlePrevious },
    slides: currentLesson?.lesson_slides ?? [],
    stateActions: {
      setActiveSlide, setCanProceed
    }
  }

  useEffect(() => {
    if (currentLesson) {
      setCurrentChapter(getCurrentChapter(currentLesson?.chapter_id));
    }
  }, [currentLesson]);

  return (
    <>
      <FeedbackPopup
        ref={feedbackRef}
        onContinue={handleContinue}
      />
      <div className="flex bg-white z-[1000] w-full overflow-hidden urbanist">
        {
          sideBar &&
          <LessonSidebar
            isOpen={sideBarOpen}
            close={() => setSideBarOpen(false)}
            {...{ chapters, textbook, setCurrentLesson }}
          />
        }
        <div className="flex flex-col w-full relative justify-between border-l h-screen">
          <LessonHeader
            getChapter={null}
            chapter={currentChapter}
            activeSlide={activeSlide}
            sideBarOpen={sideBarOpen}
            currentLesson={currentLesson}r
          />
          <div className="flex w-full">
            <div className={`${showAI ? "w-full pointer-events-none": "w-full"} relative z-[100200]`}>
              { showAI && 
                <div  className="w-full transition-none inset-0 z-[120000] absolute pointer-events-auto bg-[#00000011] flex justify-center items-end ">
                    <button onClick={handlecloseAI} className="w-14 h-14 relative bottom-40 rounded-full bg-main text-white font-[600] text-[23px]">&times;</button>
                </div>  
              }
              <div className="relative px-28 flex grow flex-col overflow-x-hidden  border-green-500 h-[calc(100vh_-_170px)] overflow-y-auto">
                <AudioButton />
                <ToggleNavBtn isOpen={sideBarOpen} handleClick={() => setSideBarOpen(!sideBarOpen)} />
                <LessonContext.Provider value={{
                  lesson,
                  feedbackRef
                }}>
                  {lessonSlides && lessonSlides(
                    { ...lessonSlidesArgs }
                  )}
                  {children}
                </LessonContext.Provider>
              </div>
              <div className="relative w-full">
                { !showAI && <button onClick={handleShowAI} className="text-main px-4 font-[500] text-sm rounded-full border-main border py-1 absolute right-10 -top-10"> Explain this screen</button> }
                <LessonFooter previous={handlePrevious} closePreview={closePreview} isPreview={!!lesson} next={handleContinue} />
              </div>
            </div>
            <ChatSection visible={showAI}/>
          </div>
        </div>
      </div>
    </>
  );
}



