import { FC } from "react";
interface Props {
    active: number;
    slides: any;
    data: any;
    showEdit: () => void;
    changeFile: (file: any, payload: any, id: any) => void;
}
declare const ActiveEditSlide: FC<Props>;
export default ActiveEditSlide;
