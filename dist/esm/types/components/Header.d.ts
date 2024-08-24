import { FC } from "react";
interface Props {
    activeSlide: number;
    back: () => void;
    name: string;
    manager: any;
    showEdit: any;
    closeEdit: any;
}
export declare const Header: FC<Props>;
export default Header;
