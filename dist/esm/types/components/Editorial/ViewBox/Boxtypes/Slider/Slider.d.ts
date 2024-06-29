import { FC } from "react";
import { EditorialManagerInterface } from "components/Editorial/Base/EditorialManager";
interface SliderProps {
    id: string;
    manager: EditorialManagerInterface;
}
declare const Slider: FC<SliderProps>;
export default Slider;
