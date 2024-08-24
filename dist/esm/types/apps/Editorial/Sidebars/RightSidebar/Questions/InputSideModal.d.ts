import { FC } from "react";
import { InputInterface } from "./ActiveQuestion";
interface Props {
    input: InputInterface;
    setInputs: Function;
    closeModal: Function;
}
declare const InputSideModal: FC<Props>;
export default InputSideModal;
