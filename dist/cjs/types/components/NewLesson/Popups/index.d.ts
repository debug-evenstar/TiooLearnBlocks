import { FC } from "react";
import "./style.css";
export declare enum FeedbackType {
    CORRECT = 0,
    WRONG = 1
}
interface FeedbackPopupProps {
    ref: any;
    footerRef: any;
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    onClose?: Function;
    onContinue?: Function;
}
declare const FeedbackPopup: FC<FeedbackPopupProps>;
export default FeedbackPopup;
