import { FC } from "react";
interface Props {
    close: () => void;
    message: string;
    canProceed: boolean;
    proceed: Function;
}
declare const SuccessFeedback: FC<Props>;
export default SuccessFeedback;
