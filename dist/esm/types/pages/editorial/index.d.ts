import { FC } from "react";
interface Props {
    data?: any;
    lessons?: any;
    back: () => void;
    lessonlist: any;
    name: string;
    isBusy: boolean;
}
declare const EditorialComp: FC<Props>;
export default EditorialComp;
