import { FC } from "react";
interface Props {
    activeSlide: number;
    back: () => void;
    name: string;
    lesson: any;
}
export declare const Header: FC<Props>;
export default Header;
