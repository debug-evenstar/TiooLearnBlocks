import { FC, ReactElement } from "react";
interface CarouselEffectProps {
    children: ReactElement[];
    activeSlideIndex: number;
}
declare const CarouselEffect: FC<CarouselEffectProps>;
export default CarouselEffect;
