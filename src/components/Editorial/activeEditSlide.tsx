import React, { FC, useEffect, useState } from "react";
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
  const [showPreview, setShowPreview] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const RenderPreview = () => {
    return (
      <>
        {activeSlide.map(
          (component: ComponentBaseDataInterface, index: number) => {
            const Component = loadComponent(component);
            return component.layout ? (
              <LayoutComponent layout={component.layout}>
                <Component key={index} data={component} slide={SlideScope} />
              </LayoutComponent>
            ) : (
              <Component key={index} data={component} slide={SlideScope} />
            );
          }
        )}
      </>
    );
  };

  RenderPreview();

  const saveSlide = () => {
    const slideId: number = data.LessonSlides[active].id;
    setIsSaving(true);
    manager.slideManager.saveSlide(slideId, activeSlide, () => {
      setIsSaving(false);
    });
  };

  useEffect(() => {
    if (slides) {
      setActiveSlide(slides[active]);
      manager.slideManager.setActiveSlide(active);
    }
  }, [active, slides]);

  return (
    <div>
      <div className="flex gap-x-4">
        <div className="w-full">
          {/* {!!checkText.length && ( */}

          <Canvas slideData={activeSlide} manager={manager} />
        </div>
      </div>
      <div className="w-full mb-[40px] mt-[44px] bottom-0 z-50 relative px-[30px]">
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
        <div className="fixed w-full h-screen flex justify-center items-center z-40 top-0 left-0 bg-preview">
          <div className="w-full h-full bgcomps text-white bg-cover px-5 flex justify-center items-center fw-600">
            <div className="w-full h-full">
              <RenderPreview />
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
