import { FC } from "react";
interface Props {
    num: number;
    active: number;
    changeSlide: Function;
}
declare const SlideIndicator: FC<Props>;
export default SlideIndicator;
