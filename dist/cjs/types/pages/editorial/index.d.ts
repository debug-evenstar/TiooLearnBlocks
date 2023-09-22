import { FC } from "react";
interface Props {
    data?: any;
    lessons?: any;
    changeFile: (file: any, payload: any, id: any) => void;
    changeCard: (file: any, payload: any, id: any, length: number, changedIndex: any) => void;
    back: () => void;
    lessonlist: any;
    name: string;
    isBusy: boolean;
}
declare const Editorial: FC<Props>;
export default Editorial;
