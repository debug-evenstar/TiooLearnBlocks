import { FC } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
interface ImageCarouselProps {
    id: string;
    manager: EditorialManagerInterface;
}
declare const CardSlider: FC<ImageCarouselProps>;
export default CardSlider;
