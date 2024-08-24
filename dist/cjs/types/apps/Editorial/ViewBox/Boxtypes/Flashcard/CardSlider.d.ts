import { FC } from "react";
import { ManagerInterface } from "apps/Editorial/Base/Manager";
interface ImageCarouselProps {
    id: string;
    manager: ManagerInterface;
}
declare const CardSlider: FC<ImageCarouselProps>;
export default CardSlider;
