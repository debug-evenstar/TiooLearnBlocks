import React, { FC, useRef, useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { dummyData } from "utilities/data";
import EditorialSlideView from "components/editorailComps/slideView";
import ActiveEditSlide from "components/editorailComps/activeEditSlide";

interface Props {
  data?: any
  lessons?: any
}
const  Editorial:FC<Props> = ({data, lessons}) => {
  const fetchLess = async () => {
   await fetch("https://api.hellotioo.com/open/lesson/35/template")
      // await fetch('https://api.hellotioo.com/open/lesson/template/35')
      .then((res: any) => {
        if (!res.error) {
          console.log(res.data);
        } else console.log(res);
      });
  };
  useEffect(() => {
    fetchLess();
  }, []);
  const parseSlides = dummyData.LessonSlides.map(
    (slide: any) => slide.slide_data
  );
  const slideManagerRef = useRef<any>(null);
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showEdit, setShowEdit] = useState(false);
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
    slideManagerRef?.current?.navigator(1, index);
    setShowEdit(false);
  };
  return (
    <MainLayout
      slides={parseSlides}
      changeTo={changeSlide}
      active={activeSlide}
      showComp={showEdit}
    >
      <div className="w-full bg-white px-[30px] py-[28px]">
        <div className="mt-6">
          {!showEdit && (
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
          {showEdit && (
            <>
              <ActiveEditSlide
                active={activeSlide}
                slides={parseSlides}
                data={dummyData}
                showEdit={() => setShowEdit(false)}
              />
            </>
          )}
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
}

export default Editorial;
