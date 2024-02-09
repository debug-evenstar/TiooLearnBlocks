import { FC } from 'react';
interface Props {
    message: string;
    close: () => void;
    canProceed: boolean;
    proceed: Function;
}
declare const MobileSuccessFeedback: FC<Props>;
export default MobileSuccessFeedback;
