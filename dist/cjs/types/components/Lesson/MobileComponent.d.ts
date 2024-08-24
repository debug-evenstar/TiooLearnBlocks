import { FC } from "react";
interface ComponentSlides {
    slides: any[];
    back: Function;
    title?: string;
}
declare const MobileComponent: FC<ComponentSlides>;
export default MobileComponent;
