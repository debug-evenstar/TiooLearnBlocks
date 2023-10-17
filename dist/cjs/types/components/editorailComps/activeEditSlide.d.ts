import { FC } from "react";
interface Props {
    active: number;
    slides: any;
    data: any;
    isBusy: boolean;
    showEdit: () => void;
    changeFile: (file: any, payload: any, id: any) => void;
    changeCard: (file: any, payload: any, id: any, length: number, changedIndex: any) => void;
    changeSlide: (file: any, payload: any, id: any, length: number, changedIndex: any) => void;
}
declare const ActiveEditSlide: FC<Props>;
export default ActiveEditSlide;
