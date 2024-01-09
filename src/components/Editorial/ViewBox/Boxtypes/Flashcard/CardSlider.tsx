import React, { FC, useState, useEffect, useRef } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight, FaBackward } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import Flashcard from "./Flashcard";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";

interface ImageCarouselProps {
  images: any[];
  id: string;
  manager: EditorialManagerInterface;
}

const CardSlider: FC<ImageCarouselProps> = ({ images, id, manager }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

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
