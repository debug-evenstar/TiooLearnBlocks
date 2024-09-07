import LessonHeader from "components/NewLesson/Layout/LessonHeader";
import LessonSidebar from "components/NewLesson/Layout/LessonSidebar";
import LessonFooter from "components/NewLesson/Layout/LesssonFooter";
import ChatSection from "components/ChatSection/ChatSection";
import { ReactNode, useEffect, useRef, useState } from "react";

import "./LessonLayout.css";
// import LessonSlides from "components/NewLesson/LessonSlides";
import AudioButton from "components/NewLesson/Buttons/audioBtn";
import TransitionButton from "components/NewLesson/Buttons/TransitionButton";
import ToggleNavBtn from "components/NewLesson/Buttons/toggleNavigation";
import FeedbackPopup, { FeedbackType } from "components/NewLesson/Popups";
import { LessonContext } from "contexts/LessonContext";
import { GoRocket } from "react-icons/go";
import catImg from "../img/popup/cat.webp";
import GlobalResource from "services/api/resources/GlobalResource";

function StartScreen() {
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="flex flex-col items-center gap-y-3">
        <img src={catImg} alt="" className="w-1/2" />
        <p className="flex items-center gap-x-3">
          <span>Click on a lesson to get started</span> <GoRocket />
        </p>
      </div>
    </div>
  );
}

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
  // setFeedbackCanProceed: Function;
}

export interface LessonSlideProps {
  managerRef: React.RefObject<any>;
  navigationHandles: NavigationHandles;
  slides: any[];
  stateActions: LessonStateActions;
}

export default function LessonLayout({
  textbook,
  chapters,
  children,
  lesson,
  sideBar = true,
  closePreview,
  lessonSlides,
}: LessonLayoutProps) {
  const isPreview = !!lesson;

  const [currentLesson, setCurrentLesson] = useState<any>(
    isPreview ? chapters[0]?.lessons[0] : null
  );
  const [currentChapter, setCurrentChapter] = useState(
    lesson ? lesson.Chapter : chapters[0]
  );
  const slideManagerRef = useRef<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showAI, setShowAI] = useState(false);

  const lessonFooterRef = useRef<any>(null);
  const lessonSidebarRef = useRef<any>(null);
  const lessonHeaderRef = useRef<any>(null);
  const feedbackRef = useRef<any>(null);

  const sideBarOpen = lessonSidebarRef?.current?.sideBarOpen;
  const setSideBarOpen = lessonSidebarRef?.current?.setSideBarOpen;

  useEffect(() => {
    if (currentLesson && textbook) {
      GlobalResource.getOrCreateLessonProgress(
        textbook.id,
        currentLesson.id
      ).then((response) => {
        const savedIndex = response.data.slide_index;
        if (savedIndex > 1) {
          setActiveSlide(savedIndex + 1);
          slideManagerRef?.current?.navigator(0, savedIndex + 1);
        }
        lessonHeaderRef?.current?.updateLessonProgress(response.data);
      });
    }
  }, [currentLesson]);

  const getCurrentChapter = (chapter_id: number) => {
    return chapters.find((i: any) => i.id === chapter_id);
  };

  // const lessonHasSlides = () => Boolean(currentLesson?.lesson_slides && currentLesson.lesson_slides.length);

  const slideHasQuestion = (lesson: any) => {
    const slides = lesson.lesson_slides;
    if (slides && slides.length) {
      const currentSlide = slides.length ? slides[activeSlide] : null;
      if (currentSlide) {
        const hasQuestion = currentSlide.slide_data.find(
          (item: any) => item.component == "Questions"
        );
        return !!hasQuestion;
      }
      return false;
    }
    return false;
  };

  const handleUpdateProgress = () => {
    const currentSlide = slideManagerRef?.current?.activeSlide();

    const payload = {
      textbooks_id: textbook.id,
      lesson_id: currentLesson?.id,
      slide_index: activeSlide,
      slide_id: currentSlide.id,
    };

    GlobalResource.updateLessonProgress(payload)
      .then((response) => {
        //console.log("Updated lesson progress",response.data);
        lessonHeaderRef?.current?.updateLessonProgress(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handleContinue = () => {
    //console.log("clicking next")
    const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
    if (
      currentLesson &&
      currentSlideIndex === currentLesson.lesson_slides.length - 1
    ) {
    } else {
      slideManagerRef?.current?.navigator(1);
      setActiveSlide(activeSlide + 1);
      feedbackRef?.current.hideFeedback();
    }
    handleUpdateProgress();
  };

  const handlePrevious = () => {
    slideManagerRef?.current?.navigator(-1);
    if (activeSlide > 1) setActiveSlide(activeSlide - 1);
  };

  const handleShowAI = () => {
    setShowAI(true);
    setSideBarOpen(false);
  };

  const handlecloseAI = () => {
    setShowAI(false);
    setSideBarOpen(true);
  };

  const toggleSidebar = () => {
    if (lessonSidebarRef.current) {
      lessonSidebarRef.current.toggleSideBar();
      return lessonSidebarRef?.current?.sideBarOpen;
    }
  };

  const lessonSlidesArgs: LessonSlideProps = {
    managerRef: slideManagerRef,
    navigationHandles: { continue: handleContinue, previous: handlePrevious },
    slides: currentLesson?.lesson_slides ?? [],
    stateActions: {
      setActiveSlide,
      setCanProceed: (value: boolean, data: any = {}) => {
        // //console.log("data from lesson layout", data)
        if (!data.hasFeedback) {
          lessonFooterRef?.current &&
            lessonFooterRef?.current.toggleContinue(value);
        }
        feedbackRef?.current && feedbackRef?.current.toggleContinue(value);
      },
    },
  };

  useEffect(() => {
    if (currentLesson) {
      setCurrentChapter(getCurrentChapter(currentLesson?.chapter_id));
    }
  }, [currentLesson]);

  useEffect(() => {
    if (currentLesson) {
      if (slideHasQuestion(currentLesson)) {
        lessonFooterRef?.current.toggleContinue(false);
      } else {
        lessonFooterRef?.current.toggleContinue(true);
      }
    }
  }, [activeSlide, currentLesson]);

  return (
    <>
      <FeedbackPopup
        ref={feedbackRef}
        footerRef={lessonFooterRef}
        onContinue={handleContinue}
      />
      <div className="flex bg-white z-[1000] w-full overflow-hidden urbanist">
        {
          <LessonSidebar
            extToggle={() => toggleSidebar()}
            ref={lessonSidebarRef}
            {...{ chapters, textbook, setCurrentLesson }}
          />
        }
        <div className="flex flex-col w-full relative justify-between border-l h-screen">
          <LessonHeader
            ref={lessonHeaderRef}
            onSlideSelect={() => null}
            isChatOpen={showAI}
            activeSlide={activeSlide}
            sideBarOpen={sideBarOpen}
            manager={slideManagerRef}
            currentLesson={currentLesson}
          />
          <div className="flex w-full">
            <div
              className={`${
                showAI ? "w-[65%] pointer-events-none" : "w-full"
              } relative z-[1200]`}
            >
              {showAI && (
                <div className="w-full transition-none inset-0 z-[120000] absolute pointer-events-auto bg-[#00000033] flex justify-center items-end ">
                  <button
                    onClick={handlecloseAI}
                    className="px-4 h-14 relative bottom-40 rounded-full bg-[#7E1593] text-white font-[600] text-[23px]"
                  >
                    &times; close chat
                  </button>
                </div>
              )}
              <div className="relative px-28 flex grow flex-col overflow-x-hidden h-[calc(100vh_-_170px)] overflow-y-auto">
                <AudioButton />
                <ToggleNavBtn
                  sideBarRef={lessonSidebarRef}
                  handleClick={() => toggleSidebar()}
                />
                {currentLesson ? (
                  <LessonContext.Provider
                    value={{
                      lesson,
                      feedbackRef,
                    }}
                  >
                    {lessonSlides && lessonSlides({ ...lessonSlidesArgs })}
                    {children}
                  </LessonContext.Provider>
                ) : (
                  <StartScreen />
                )}
              </div>
              <div className="relative w-full h-[80px]">
                {/* {!showAI && <button onClick={handleShowAI} className="text-[#7E1593] px-4 font-[500] text-sm rounded-full border-[#7E1593] border py-1 absolute right-10 -top-10"> Explain this screen</button>} */}
                {currentLesson && (
                  <div className="absolute left-10 -top-8">
                    <TransitionButton
                      strings={["AI TUTOR", "Explain this screen"]}
                      handleShowAI={handleShowAI}
                    />
                  </div>
                )}

                <LessonFooter
                  ref={lessonFooterRef}
                  currentLesson={currentLesson}
                  hasPrevious={activeSlide > 0}
                  handleShowAI={handleShowAI}
                  feedbackRef={feedbackRef}
                  chatVisible={showAI}
                  previous={handlePrevious}
                  closePreview={closePreview}
                  isPreview={!!lesson}
                  next={handleContinue}
                />
              </div>
            </div>
            <ChatSection
              visible={showAI}
              lesson={currentLesson}
              slide={activeSlide}
            />
          </div>
        </div>
      </div>
    </>
  );
}
