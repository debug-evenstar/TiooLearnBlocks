import nextImg from "../assets/next-main.png";
import prevImg from "../assets/previous-main.png";
import { FC } from "react";

interface FooterProps {
  canProceed: boolean;
  sliderRef: any;
  hasPrevious: boolean;
}

const Footer: FC<FooterProps> = ({ canProceed, hasPrevious, sliderRef }) => {

  const handleNextClick = () => {
    sliderRef && sliderRef.current && sliderRef.current?.handleContinue();
  };
  const handlePrevClick = () => {
    sliderRef && sliderRef.current && sliderRef.current?.handlePrevious();
  };

  return (
    <div className="w-full h-[90px] border-t px-5 sm:px-10 flex shrink-0 justify-between items-center relative">
      <div>
        { hasPrevious && 
          <button className="outline-none active:scale-95" onClick={handlePrevClick}>
            <img src={prevImg} alt="" className="w-[11rem]" />
          </button>
        }
      </div>
      <div>
        {canProceed && (
          <button
            className="outline-none active:scale-95"
            disabled={!canProceed}
            onClick={handleNextClick}
          >
            <img src={nextImg} alt="" className="w-[11rem]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Footer;
