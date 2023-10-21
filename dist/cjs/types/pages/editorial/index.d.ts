import { FC } from "react";
interface Props {
    data?: any;
    lessons?: any;
    changeFile: (file: any, payload: any, id: any) => void;
    changeCard: (file: any, payload: any, id: any, length: number, changedIndex: any) => void;
    updateSlide: (file: any, payload: any, id: any, length: number, changedIndex: number) => void;
    createOverlay: (file: any, ext: any, text: string, index: number) => void;
    back: () => void;
    lessonlist: any;
    name: string;
    isBusy: boolean;
}
declare const EditorialComp: FC<Props>;
export default EditorialComp;
