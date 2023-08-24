import React from "react";
interface ButtonProps {
    title: string | JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    disabled?: boolean;
    index: number;
    status?: string;
}
declare const ButtonComponent: React.FC<ButtonProps>;
export default ButtonComponent;
