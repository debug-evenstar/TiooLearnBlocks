import React from "react";
interface Props {
    title: string | JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    capitalizeTitle?: boolean;
    secondary?: boolean;
    disabled?: boolean;
    className?: string;
    altClassName?: string;
    isBusy?: boolean;
    prev?: boolean;
}
declare const CompButton: React.FC<Props>;
export default CompButton;
export declare const ContinueBtn: React.FC<Props>;
export declare const PreviousBtn: React.FC<Props>;
export declare const ContinueSmallBtn: React.FC<Props>;
