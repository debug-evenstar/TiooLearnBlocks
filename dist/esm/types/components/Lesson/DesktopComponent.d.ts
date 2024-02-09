import { FC } from "react";
interface ComponentSlides {
    slides: any[];
    back: Function;
    title?: string;
}
declare const DesktopComponent: FC<ComponentSlides>;
export default DesktopComponent;
