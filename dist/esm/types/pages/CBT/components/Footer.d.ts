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
declare const Footer: FC<FooterProps>;
export default Footer;
