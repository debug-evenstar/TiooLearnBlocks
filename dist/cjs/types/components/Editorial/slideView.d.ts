import { FC } from "react";
interface Props {
    handlePrevious: () => void;
    showEdit: () => void;
    parsedSlides: any;
    slideManagerRef: any;
    setActiveSlide: (val: number) => void;
    handleContinue: () => void;
    setCanProceed: (val: boolean) => void;
}
declare const EditorialSlideView: FC<Props>;
export default EditorialSlideView;
