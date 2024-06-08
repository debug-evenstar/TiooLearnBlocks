import React, { FC, useEffect, useRef, useState } from "react";
import {
  LessonSlideInterface,
  LessonSlideScope,
  loadComponent,
} from "components/SlideManager/handler";
import { FaTimes } from "react-icons/fa";
import Canvas from "./Base/Canvas";
import { ManagerInterface } from "./Base/Manager";
import LayoutComponent from "components/LayoutBox";
import { ComponentBaseDataInterface } from "components/interface";
import PreviewLayout from "./Preview/PreviewLayout";
import LessonLayout from "layouts/LessonLayout";

interface Props {
  active: number;
  slides: any;
  data: any;
  isBusy: boolean;
  manager: ManagerInterface;
}
const ActiveEditSlide: FC<Props> = ({
  active,
  slides,
  data,
  isBusy,
  manager,
}) => {
  const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
  const [activeSlide, setActiveSlide] = useState<any[]>([]);
  const [previewSlideData, setPreviewSlideData] = useState<any[]>([]);
  const [previewSlide, setPreviewSlide] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);


  const RenderPreview : FC<{
    slide : any,
    subject : string,
    title : string
  }> = ({slide, subject, title}) => {

    const chapters = [
      {
        ...data.Chapter,lessons:[
          {
            ...data,
              slides: [
                slide
              ]
          }
        ]
      }
    ];

    console.log("chapters",slides);

    return (
      <LessonLayout textbook={{}} lesson={data} closePreview={() => setPreviewSlide(false)} sideBar={false} chapters={chapters}  >
        <>
        {slide.map((component: ComponentBaseDataInterface, index: number) => {
            const Component = loadComponent(component);
            const viewArea = { width : document.body.clientWidth, height : document.body.clientHeight };
            return component.layout
                ? (
                    <LayoutComponent layout={component.layout}>
                      <Component key={index} data={component} slide={SlideScope} viewArea={viewArea}/>
                    </LayoutComponent>
                )
                : <Component key={index} data={component} slide={SlideScope} viewArea={viewArea}/>;
          })}
        </>
      </LessonLayout>
    );
  };


  const saveSlide = () => {
    const slideId : number = data.LessonSlides[active]?.id ?? null;
    setIsSaving(true);
    if(slideId) {
      manager.slideManager.saveSlide(slideId, activeSlide, ()=>{
        setIsSaving(false);
      });
    } else {
      const slideIndex : number = data.LessonSlides.length;
      manager.slideManager.createSlide(slideIndex, data.id, activeSlide, ()=>{
        setIsSaving(false);
      });
    }

  };

  useEffect(() => {
    if (slides) {
      setActiveSlide([...slides[active]]);
      manager.slideManager.setActiveSlide(active);
    }
  }, [active, slides]);

  useEffect(() => {
    setPreviewSlideData(() => slides[active]);
    setActiveSlide(slides[active]);
  }, [slides[active]]);

  return (
    <div>
      <div className="flex gap-x-4">
        <div className="w-full">
          {/* {!!checkText.length && ( */}

          <Canvas slideData={activeSlide} manager={manager} />
        </div>
      </div>
      <div className="w-full mb-[40px] mt-[44px] bottom-0 z-45 relative px-[30px]">
        <div className="w-full h-[50px] flex items-center justify-between">
          <div
            className="w-[140px] rounded-[8px] border border-[#4F46E5] text-[#4F46E5] flex items-center justify-center py-3 cursor-pointer text-semibold"
            onClick={saveSlide}
          >
            {isBusy || isSaving ? "Saving..." : "Save"}
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
      {previewSlide && (
        <div className="fixed w-full h-screen flex justify-center items-center z-40 top-0 left-0">
          <div className="w-full h-full bg-cover px-5 flex justify-center items-center fw-600">
            <div className="w-full h-full">
              <RenderPreview
                  slide={previewSlideData}
                  subject={data.Subject?.naming}
                  title={data.topic}
              />
            </div>
          </div>
          <FaTimes
            className="absolute text-[40px] top-10 right-10 text-white cursor-pointer hover:scale-110 duration-100"
            onClick={() => setPreviewSlide(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ActiveEditSlide;
