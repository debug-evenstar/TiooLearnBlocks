import React, { FC, useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleTrigger } from "provider/triggerSlice";
import FlashcardViewBox from "./SliderViewbox";
import {
  handleSetActiveCompIndex,
  handleSetActiveCompName,
} from "provider/sliderSlice";
import Draggable from "react-draggable";

interface SliderProps {
  id: string;
  manager: EditorialManagerInterface;
}

const Slider: FC<SliderProps> = ({ id, manager }) => {
  const dispatch = useDispatch();
  const selector: any = useSelector(handleToggleTrigger);
  const trigger: boolean = selector.payload.trigger.value;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditable, setIsEditable] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = useState<any[]>([]);

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const generateId = (componentName: string): string => {
    return componentName + "-clone-" + Date.now();
  };

  useEffect(() => {
    const componentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    componentData && setSlides(componentData.slides);
    slides.length > 0 &&
      dispatch(
        handleSetActiveCompName(slides[currentImageIndex][0]?.component)
      );
    dispatch(handleSetActiveCompIndex(currentImageIndex));
    console.log(slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const slider = sliderRef.current;
      if (slider && !slider.contains(event.target as Node)) {
        //setIsEditable(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable, sliderRef]);

  useEffect(() => {
    dispatch(
      handleSetActiveCompName(
        manager.canvasManager.canvas.functions.getComponentData(id).slides[
          currentImageIndex
        ][0]?.component
      )
    );
    dispatch(handleSetActiveCompIndex(currentImageIndex));
  }, [currentImageIndex]);

  return (
    <div className="flex items-center gap-2">
      <button onClick={handlePrevClick}>
        <FaAngleLeft className="text-[20px]" strokeWidth="1px" />
      </button>

      <div
        onDoubleClick={() => setIsEditable(!isEditable)}
        ref={sliderRef}
        className={`flex justify-center items-center ${
          isEditable ? "handle cursor-move" : ""
        }  h-fit w-fit min-w-[45vw] min-h-[20rem] border border-[#4f46e5]`}
      >
        {slides[currentImageIndex] && (
          <Draggable
            axis="both"
            nodeRef={draggableRef}
            handle=".sliderHandle"
            defaultClassName="w-fit"
          >
            <div ref={draggableRef}>
              <FlashcardViewBox
                id={generateId(slides[currentImageIndex][0]?.component)}
                handleDelete={() => null}
                manager={manager}
                data={slides[currentImageIndex]}
                currIndex={currentImageIndex}
                isFlashcardDraggable={isEditable}
                setIsFlashcardDraggable={setIsEditable}
              />
            </div>
          </Draggable>
        )}
      </div>

      {slides.length > 1 && (
        <button onClick={handleNextClick}>
          <FaAngleRight className="text-[20px]" />
        </button>
      )}
    </div>
  );
};

export default Slider;
