import React, { FC, useRef, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import EditorialSlideView from "components/editorailComps/slideView";
import ActiveEditSlide from "components/editorailComps/activeEditSlide";
import CreateOverlaySlide from "components/editorailComps/createSlide";

interface Props {
  data?: any;
  lessons?: any;
  changeFile: (file: any, payload: any, id: any) => void;
  changeCard: (
    file: any,
    payload: any,
    id: any,
    length: number,
    changedIndex: any
  ) => void;
  updateSlide: (
    file: any,
    payload: any,
    id: any,
    length: number,
    changedIndex: number
  ) => void;
  back: () => void;
  lessonlist: any;
  name: string;
  isBusy: boolean;
}
const Editorial: FC<Props> = ({
  data,
  lessons,
  changeFile,
  back,
  lessonlist,
  name,
  isBusy,
  changeCard,
  updateSlide
}) => {
  const parseSlides =
    data && data.LessonSlides.map((slide: any) => slide.slide_data);
  const slideManagerRef = useRef<any>(null);
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showEdit, setShowEdit] = useState(false);
  const [overlay, setOverlay] = useState(false)
  const handleContinue = () => {
    const currentSlideIndex = slideManagerRef?.current?.activeSlideIndex();
    if (currentSlideIndex === parseSlides.length - 1) {
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

  const changeSlide = (index: number) => {
    setShowEdit(false);
    setTimeout(() => {
      slideManagerRef?.current?.navigator(1, index);
    }, 400);
  };
  const showCreateSlide = () => {
    setOverlay(true)
  }
  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <MainLayout
      data={data}
      slides={parseSlides}
      changeTo={changeSlide}
      active={activeSlide}
      showComp={showEdit}
      back={back}
      lessonlist={lessonlist}
      name={name}
      showOverlay={showCreateSlide}
    >
      <div className="w-full bg-white px-[30px] py-[28px]">
        <div className="mt-6">
          {(!showEdit && !overlay) && (
            <>
              <EditorialSlideView
                showEdit={() => setShowEdit(true)}
                setCanProceed={setCanProceed}
                handlePrevious={() => handlePrevious()}
                handleContinue={() => handleContinue()}
                parsedSlides={parseSlides}
                slideManagerRef={slideManagerRef}
                setActiveSlide={setActiveSlide}
              />
            </>
          )}
          {(showEdit && !overlay) && (
            <>
              <ActiveEditSlide
                active={activeSlide}
                slides={parseSlides}
                data={data}
                showEdit={() => setShowEdit(false)}
                changeFile={changeFile}
                isBusy={isBusy}
                changeCard={changeCard}
                changeSlide={updateSlide}
              />
            </>
          )}
          {
              overlay && <><CreateOverlaySlide /></>
          }
        </div>
        {!showEdit && (
          <div className="w-full mb-[40px] mt-[44px] bottom-0 z-50 relative px-[30px]">
            <div className="w-full h-[50px] flex items-center justify-between">
              <div className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-3 cursor-pointer text-semibold">
                Save
              </div>
              <div className="w-[140px] rounded-[8px] border bg-[#4F46E5] text-white flex items-center justify-center py-3 cursor-pointer text-semibold">
                Preview
              </div>
            </div>
            <div className="pb-16"></div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Editorial;
