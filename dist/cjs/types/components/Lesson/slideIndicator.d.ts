import { FC } from "react";
interface Props {
    num: number;
    active: number;
    changeSlide: Function;
    hasPreface?: boolean;
    hasPostface?: boolean;
}
declare const SlideIndicator: FC<Props>;
export default SlideIndicator;
