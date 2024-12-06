import nextImg from "../assets/next-main.png";
import prevImg from "../assets/previous-main.png";
import submitImg from "../assets/submit.png";
import { FC } from "react";

interface FooterProps {
  canProceed: boolean;
  sliderRef: any;
  hasPrevious: boolean;
  hasNext: boolean;
  hasNextSubject: boolean;
  goToNextSubject: () => void;
  openSubmitModal: () => void;
}

const Footer: FC<FooterProps> = ({
  canProceed,
  hasNext,
  openSubmitModal,
  hasNextSubject,
  goToNextSubject,
  hasPrevious,
  sliderRef,
}) => {
  const handleNavigation = (type: "next" | "previous") => {
    if (sliderRef?.current) {
      if (type === "next") sliderRef.current.handleContinue();
      if (type === "previous") sliderRef.current.handlePrevious();
    }
  };

  const renderActionButton = () => {
    if (hasNext) {
      return (
        <button
          className="outline-none active:scale-95"
          disabled={!canProceed}
          onClick={() => handleNavigation("next")}
        >
          <img src={nextImg} alt="Next" className="w-[11rem]" />
        </button>
      );
    }

    if (hasNextSubject) {
      return (
        <button
          className="outline-none active:scale-95"
          onClick={goToNextSubject}
        >
          <img src={nextImg} alt="Next Subject" className="w-[11rem]" />
        </button>
      );
    }

    return (
      <button
        className="outline-none active:scale-95"
        onClick={openSubmitModal}
      >
        <img src={submitImg} alt="Submit" className="w-[11rem]" />
      </button>
    );
  };

  return (
    <div className="w-full h-[90px] border-t px-5 sm:px-10 flex shrink-0 justify-between items-center relative">
      {hasPrevious ? (
        <button
          className="outline-none active:scale-95"
          onClick={() => handleNavigation("previous")}
        >
          <img src={prevImg} alt="Previous" className="w-[11rem]" />
        </button>
      ) : (
        <p></p>
      )}
      {renderActionButton()}
    </div>
  );
};

export default Footer;
