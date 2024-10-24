import { FC, ReactElement } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
interface CarouselEffectProps {
    children: ReactElement[];
    activeSlideIndex: number;
}
declare const CarouselEffect: FC<CarouselEffectProps>;
export default CarouselEffect;
