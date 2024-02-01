import React, { FC, useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Flashcard from "./Flashcard";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
import { useSelector } from "react-redux";
import { handleToggleTrigger } from "provider/triggerSlice";

interface ImageCarouselProps {
  id: string;
  manager: EditorialManagerInterface;
}

const CardSlider: FC<ImageCarouselProps> = ({ id, manager }) => {
  

  const trigger = manager.states.trigger;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<any[]>([{ url: "" }]);

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const flashCardComponentData =
      manager.canvasManager.canvas.functions.getComponentData(id);
    flashCardComponentData && setImages(flashCardComponentData.cards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div className="flex items-center gap-2 cursor-move">
      <button onClick={handlePrevClick}>
        <FaAngleLeft className="text-[#87909E] text-[20px]" />
      </button>

      <div ref={sliderRef}>
        <Flashcard
          id={id}
          manager={manager}
          image={images[currentImageIndex]}
          index={currentImageIndex}
        />
      </div>

      {images.length > 1 && (
        <button onClick={handleNextClick}>
          <FaAngleRight className="text-[#87909E] text-[20px]" />
        </button>
      )}
    </div>
  );
};

export default CardSlider;
