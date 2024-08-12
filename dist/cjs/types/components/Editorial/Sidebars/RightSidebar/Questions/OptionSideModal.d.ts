import { FC } from "react";
import { OptionInterface } from "./ActiveQuestion";
interface Props {
    option: OptionInterface;
    setOptions: Function;
}
declare const OptionSideModal: FC<Props>;
export default OptionSideModal;
