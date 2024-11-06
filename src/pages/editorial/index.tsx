import { FC, useEffect, useRef, useState } from "react";
import MainLayout from "../../layouts/EditorialLayout";
import EditorialSlideView from "apps/Editorial/slideView";
import ActiveEditSlide from "apps/Editorial/activeEditSlide";
import { SidebarFunctions } from "apps/Editorial/interfaces";
import { CreateManager } from "apps/Editorial/Base/Manager";
import StateManager from "apps/Editorial/Base/StateManager";
import { ScaleLoader } from "react-spinners";
import RenderPreview from "apps/Editorial/Preview/RenderPreview";
import {
    LessonSlideInterface,
    LessonSlideScope,
} from "components/SlideManager/handler";

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
    const [lessonSlides, setLessonSlides] = useState<any>([]);
    const [parseSlides, setParseSlides] = useState<any[]>([]);
    const slideManagerRef = useRef<any>(null);
    const [canProceed, setCanProceed] = useState<boolean>(true);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [showEdit, setShowEdit] = useState(false);
    const [overlay, setOverlay] = useState(false);
    const [manager, setManager] = useState(
        CreateManager(lessonSlides?.map((slide: any) => slide?.slide_data))
    );
    const [previewSlide, setPreviewSlide] = useState(false);
    const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());

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
            manager.slideManager.setActiveSlide(index);
        }, 400);
    };

    // const showCreateSlide = () => {
    //     setOverlay(true);
    // };

    useEffect(() => {
        if (data) {
            setParseSlides(() =>
                lessonSlides?.map((slide: any) => slide?.slide_data)
            );
            setManager(
                CreateManager(
                    lessonSlides?.map((slide: any) => slide?.slide_data)
                )
            );
        }
    }, [lessonSlides]);

    useEffect(() => {
        if (data) setLessonSlides(data.lesson_slides);
        manager.lesson = data;
    }, [data]);

    useEffect(() => {
        manager.slideManager.handleSlidesUpdate = (updatedSlides: any[]) => {
            setParseSlides([...updatedSlides]);
        };
        manager.slideManager.updateLessonSlides = (generator: Function) => {
            const updatedLessonSlides = generator(lessonSlides);
            setLessonSlides([...updatedLessonSlides]);
            manager.lesson = {
                ...data,
                lessonSlides: updatedLessonSlides,
            };
        };
    }, [manager, manager.slideManager, lessonSlides]);

    useEffect(() => {
        manager.slideManager.slides = parseSlides;
    }, [parseSlides]);

    useEffect(() => {
        if (parseSlides.length) {
            activeSlide && SlideScope.registerSlideData(parseSlides[activeSlide]);
        }
    },[activeSlide, parseSlides]);

    if (!data) {
        return (
            <div className="w-full h-screen grid place-content-center">
                <span>
                    <ScaleLoader
                        height={30}
                        speedMultiplier={1.3}
                        color=" #9c29b2"
                    />
                </span>
            </div>
        );
    }

    return (
        <StateManager manager={manager}>
            {() => (
                <MainLayout
                    data={data}
                    slides={parseSlides}
                    changeTo={changeSlide}
                    active={activeSlide}
                    showComp={showEdit}
                    closeEdit={() => setShowEdit(false)}
                    back={back}
                    lessonlist={lessonlist}
                    name={name}
                    manager={manager}
                >
                    <div className="w-full h-full bg-white px-[30px] py-[28px]">
                        <div className="mt-4 h-[calc(100%_-_90px)]">
                            {!showEdit && (
                                <EditorialSlideView
                                    showEdit={() => setShowEdit(true)}
                                    setCanProceed={setCanProceed}
                                    handlePrevious={() => handlePrevious()}
                                    handleContinue={() => handleContinue()}
                                    parsedSlides={parseSlides}
                                    slideManagerRef={slideManagerRef}
                                    setActiveSlide={setActiveSlide}
                                />
                            )}
                            {showEdit && (
                                <ActiveEditSlide
                                    active={activeSlide}
                                    slides={parseSlides}
                                    data={{
                                        ...data,
                                        lesson_slides: lessonSlides,
                                    }}
                                    isBusy={isBusy}
                                    manager={manager}
                                    previewSlide={() => setPreviewSlide(true)}
                                />
                            )}
                            {/* {
              overlay && <><CreateOverlaySlide isBusy={isBusy} createOverlay={createOverlay} slideLength={parseSlides.length}/></>
          } */}
                        </div>
                        {!overlay && !showEdit && (
                            <div className="w-full mb-[30px] mt-[30px] bottom-0 z-50 relative px-[30px]">
                                <div className="w-full h-[50px] flex items-center justify-between">
                                    <div className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-3 cursor-pointer text-semibold">
                                        Save
                                    </div>
                                    <div
                                        className="w-[140px] rounded-[8px] border bg-[#4F46E5] text-white flex items-center justify-center py-3 cursor-pointer text-semibold"
                                        onClick={() => setPreviewSlide(true)}
                                    >
                                        Preview
                                    </div>
                                </div>
                                <div className="pb-16"></div>
                            </div>
                        )}

                        {previewSlide && (
                            <div className="fixed w-full h-screen flex justify-center items-center z-40 top-0 left-0">
                                <div className="w-full h-full bg-cover flex justify-center items-center">
                                    <div className="w-full h-full">
                                        <RenderPreview
                                            slide={parseSlides[activeSlide]}
                                            subject={data.Subject?.naming}
                                            title={data.topic}
                                            lesson={data}
                                            setPreviewSlide={setPreviewSlide}
                                            slideScope={SlideScope}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </MainLayout>
            )}
        </StateManager>
    );
};

export default EditorialComp;
