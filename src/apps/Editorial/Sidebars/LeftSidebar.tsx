import React, { FC, useEffect, useMemo, useState } from "react";
import {
    LessonSlideInterface,
    LessonSlideScope,
    loadComponent,
} from "components/SlideManager/handler";
import { FaPlus, FaTrash } from "react-icons/fa";
import { ManagerInterface } from "../Base/Manager";
import { useDispatch } from "react-redux";
import { refreshActiveViewbox } from "provider/activeViewboxSlice";
import { refreshToggleSidebarState } from "provider/rightSidebarSlice";
import { ComponentBaseDataInterface } from "components/interface";
import LayoutComponent from "components/LayoutBox";
import RenderPreview from "../Preview/RenderPreview";
import { createRoot } from "react-dom/client";

interface Props {
    slides: any;
    changeTo: (index: number) => void;
    data: any;
    manager: ManagerInterface;
}
const LeftSidebar: FC<Props> = ({ slides, changeTo, data, manager }) => {
    const [SlideScope] = useState<LessonSlideInterface>(LessonSlideScope());
    const [slideRefs, setSlideRefs] = useState<React.RefObject<any>[]>([]);
    const [slidePreviews, setSlidePreviews] = useState<string[]>([]);
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

    const handleChangeSlide = (index: number) => {
        changeTo(index);
        setActiveSlideIndex(index);
        manager.setState("rightSidebarState", false);
        manager.setState("activeViewBox", "");
    };

    const generateSlidePreview = (slideIndex: number) => {
        const div = document.createElement("div");
        div.style.setProperty("width", `80vw`);
        div.style.setProperty("height", `90vh`);
        div.style.setProperty("position", "relative");
        div.classList.add(`slide-${slideIndex}-preview`);

        if (slides.length) {
            const previewBox = () => (
                <RenderPreview
                    slide={slides[slideIndex]}
                    lesson={data}
                    slideScope={SlideScope}
                    container={{ current: div }}
                    raw={true}
                />
            );
            const createDivRoot = createRoot(div);
            createDivRoot.render(previewBox());
            document.body.appendChild(div);
            let boxElement = () =>
                document.querySelector(
                    `.slide-${slideIndex}-preview-box`
                ) as HTMLElement;
            if (boxElement()) {
                const scaleFraction =
                    boxElement().clientWidth / div.clientWidth;
                div.style.setProperty("transform", `scale(${scaleFraction})`);
                boxElement().innerHTML = "";
                boxElement().appendChild(div);
            }
        }
    };

    const deleteSlide = (index: number) => {
        manager.slideManager.deleteSlide(index, (response: any) => {});
        if (activeSlideIndex !== 0 && activeSlideIndex == index) {
            handleChangeSlide(activeSlideIndex - 1);
        }
    };

    useEffect(() => {
        if (slides.length !== slideRefs.length) {
            setSlideRefs(() => slides.map((slide: any) => React.createRef()));
        }
        setTimeout(() => {
            slides.forEach((slide: any, index: number) =>
                generateSlidePreview(index)
            );
        }, 1000);
        // Regenerate previews when no of slides changes
        // if (slidePreviews.length !== slides.length) {
        //     setSlidePreviews(
        //         slides.map((slide: any, index: number) => {
        //             generateSlidePreview(index);
        //             return slidePreviews.length > index
        //                 ? slidePreviews[index]
        //                 : "";
        //         })
        //     );
        // }
    }, [slides]);

    return (
        <div className="bg-white shadow relative w-full max-w-[20%] overflow-auto mb-20  pl-[33px] pr-[20px] overflow-y-auto  scrollbar">
            <h2 className="text-center pt-[35px] text-base text-[#87909E] font-normal">
                {slides.length} Slides
            </h2>
            <div className="slides-list-preview w-full h-full mt-[44px] mb-12">
                {slides.map((item: any, index: number) => (
                    <div
                        className="relative h-[200px] border-[0.25px] border-[#4F46E5] mb-5 rounded-lg cursor-pointer hover:scale-105 duration-100"
                        key={index}
                        ref={slideRefs[index]}
                    >
                        <p className="absolute text-[#030036BD] text-sm -top-1 -left-[14px]">
                            {index + 1}
                        </p>
                        <a
                            onClick={() => handleChangeSlide(index)}
                            className="absolute w-full h-full opacity-0 bg-gray-400 z-10"
                        ></a>
                        <div className="text-preview relative z-0 shadow p-2 py-3 h-[198px] overflow-hidden rounded-lg cursor-pointer hover:scale-105 duration-100">
                            <div
                                className={`slide-${index}-preview-box w-full h-full flex justify-center items-center`}
                            ></div>
                        </div>
                        <a
                            href="#"
                            onClick={() => deleteSlide(index)}
                            className="absolute z-20 top-0 right-0 bg-white p-3 opacity-[0.3] rounded-lg hover:opacity-[1] hover:bg-gray-200 "
                        >
                            <FaTrash size={12} color="red" />
                        </a>
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
