import { FC, useEffect, useRef, useState } from "react";
import MainLayout from "../../layouts/EditorialLayout";
import EditorialSlideView from "components/Editorial/slideView";
import ActiveEditSlide from "components/Editorial/activeEditSlide";
import { SidebarFunctions } from "components/Editorial/interfaces";
import { CreateEditorialManager } from "components/Editorial/Base/EditorialManager";

interface Props {
  data?: any;
  lessons?: any;
  back: () => void;
  lessonlist: any;
  name: string;
  isBusy: boolean;
}
const EditorialComp: FC<Props> = ({
  data,
  lessons,
  back,
  lessonlist,
  name,
  isBusy,
}) => {
  const [parseSlides, setParseSlides] = useState<any[]>([]);
  const slideManagerRef = useRef<any>(null);
  const [canProceed, setCanProceed] = useState<boolean>(true);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showEdit, setShowEdit] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [manager, setManager] = useState(CreateEditorialManager(data && data.LessonSlides.map((slide: any) => slide.slide_data)));

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
    setOverlay(false);
    setTimeout(() => {
      slideManagerRef?.current?.navigator(1, index);
    }, 400);
  };

  const showCreateSlide = () => {
    setOverlay(true);
  };


  useEffect(() => {
    if (data) {
      setParseSlides(() =>
        data.LessonSlides.map((slide: any) => slide.slide_data)
      );
      setManager(CreateEditorialManager(data && data.LessonSlides.map((slide: any) => slide.slide_data)))
    }
  }, [data]);

  useEffect(()=>{
    manager.slideManager.handleSlidesUpdate = (updatedSlides : any[]) => {
      console.log(updatedSlides);
      setParseSlides(updatedSlides);
    }
  },[manager, manager.slideManager]);


  

  if (!data || parseSlides.length === 0) {
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
      manager={manager}
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
                data={data}
                isBusy={isBusy}
                manager={manager}
              />
            </>
          )}
          {/* {
              overlay && <><CreateOverlaySlide isBusy={isBusy} createOverlay={createOverlay} slideLength={parseSlides.length}/></>
          } */}
        </div>
        {!overlay && !showEdit && (
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

export default EditorialComp;
