import React, { FC, useEffect, useMemo, useState } from "react";
import {
    LessonSlideInterface,
    LessonSlideScope,
    loadComponent,
} from "components/SlideManager/handler";
import { FaPlus } from "react-icons/fa";
import { ManagerInterface } from "./Base/Manager";
import { useDispatch } from "react-redux";
import { refreshActiveViewbox } from "provider/activeViewboxSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { ComponentBaseDataInterface } from "components/interface";
import LayoutComponent from "components/LayoutBox";
import RenderPreview from "./Preview/RenderPreview";
import { MutatingDots, Rings } from "react-loader-spinner";

interface Props {
    slides: any;
    changeTo: (index: number) => void;
    data: any;
    manager: ManagerInterface;
}
const LeftSidebar: FC<Props> = ({ slides, changeTo, data, manager }) => {
    const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
    const [slideRefs, setSlideRefs] = useState<React.RefObject<any>[]>([]);
    const [scalePercent, setScalePercent] = useState<any>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChangeSlide = (index: number) => {
        changeTo(index);
        manager.setState("rightSidebarState", false);
        manager.setState("activeViewBox", "");
    };

    useEffect(() => {
        if (slides.length !== slideRefs.length) {
            setSlideRefs(() => slides.map((slide: any) => React.createRef()));
        }
    }, [slides]);

    useEffect(() => {
        setIsLoading(true);
        if (slides.length) {
            const box = document.querySelector(".slide-preview-box");
            setTimeout(() => {
                const width = box?.clientWidth;
                if (width) {
                    const previewArea = slideRefs[0].current.clientWidth;
                    const scaler = (previewArea / width).toFixed(2);
                    setScalePercent(scaler.replace("0", ""));
                    box.classList.add("w-full");
                    setIsLoading(false);
                }
            }, 1000);
        }
    }, [slideRefs]);

    return (
        <div className="bg-white shadow relative w-full max-w-[20%] overflow-auto mb-20  pl-[33px] pr-[20px] overflow-y-auto  scrollbar">
            <h2 className="text-center pt-[35px] text-base text-[#87909E] font-normal">
                {slides.length} Slides
            </h2>
            <div className="slides-list-preview w-full h-full mt-[44px] mb-12">
                {slides.map((item: any, index: number) => (
                    <div
                        className="relative h-[200px] border-[0.25px] border-[#4F46E5] mb-5 rounded-lg cursor-pointer hover:scale-105 duration-100"
                        onClick={() => handleChangeSlide(index)}
                        key={index}
                        ref={slideRefs[index]}
                    >
                        <p className="absolute text-[#030036BD] text-sm -top-1 -left-[14px]">
                            {index + 1}
                        </p>
                        <div className="absolute w-full h-full opacity-0 bg-gray-400 z-10"></div>
                        <div className="text-preview relative z-0 shadow p-2 py-3 h-[198px] overflow-hidden rounded-lg cursor-pointer hover:scale-105 duration-100">
                            {/* {item.map(
                                (component: ComponentBaseDataInterface, componentIndex: number) => {
                                  const Component = loadComponent(component);
                                  const containerElement = slideRefs[index]?.current;
                                  const viewArea = containerElement ? { width : containerElement?.clientWidth, height : containerElement?.clientHeight } : null;
                                  return component.layout ? (
                                    <LayoutComponent layout={component.layout} key={componentIndex+component.component}>
                                      <Component
                                        data={component}
                                        slide={SlideScope}
                                        viewArea={viewArea}
                                      />
                                    </LayoutComponent>
                                  ) : (
                                    <Component
                                      key={componentIndex+ component.component}
                                      data={component}
                                      slide={SlideScope}
                                      viewArea={viewArea}
                                    />
                                  );
                                }
                              )} */}
                            {isLoading && (
                                <div className="w-full h-full flex justify-center items-center">
                                    <Rings
                                        visible={true}
                                        height="50"
                                        width="50"
                                        color="#4F46E5"
                                        ariaLabel="rings-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            )}
                            <div
                                style={{
                                    transform: `scale(${scalePercent})`,
                                    left: -(1 - parseFloat(scalePercent) + 0.1) * 100,
                                }}
                                className={`slide-preview-box h-full absolute ${
                                    isLoading ? "opacity-0" : ""
                                }`}
                            >
                                <RenderPreview
                                    slide={item}
                                    slideScope={SlideScope}
                                    raw={true}
                                    container={slideRefs[index]}
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    className="relative h-[200px] grid place-content-center border-[0.25px] border-[#4F46E5] mb-5 rounded-lg cursor-pointer hover:scale-105 duration-100"
                    onClick={() => manager.slideManager.addNewSlide()}
                >
                    <div className="text-center">
                        <span className="fw-600 text-xl">
                            <FaPlus className="mx-auto" />
                        </span>
                        <p className="fs-500 fw-500 mt-2">Add Slide</p>
                    </div>
                </div>
                <div className="pt-16"></div>
            </div>
        </div>
    );
};

export default LeftSidebar;
