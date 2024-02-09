import { FC } from "react";
interface Props {
    isBusy: boolean;
    slideLength: number;
    createOverlay: (file: any, ext: any, text: string, index: number) => void;
}
declare const CreateOverlaySlide: FC<Props>;
export default CreateOverlaySlide;
