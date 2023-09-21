import { FC } from "react";
interface Props {
    data?: any;
    lessons?: any;
    changeFile: (file: any, payload: any, id: any) => void;
    back: () => void;
    lessonlist: any;
    name: string;
}
declare const Editorial: FC<Props>;
export default Editorial;
