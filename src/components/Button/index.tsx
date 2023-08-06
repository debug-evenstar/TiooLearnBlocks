import React from "react";

interface ButtonProps {
  title: string | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  index: number;
}
const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  onClick,
  index,
  disabled,
}) => {
  const styles = {
    // width: "120px",
    color:"black",
    fontSize: "15px",
    padding: "5px 0px",
    borderRadius: "24px",
    border: " 1px dashed var(--primary, #4F46E5)",
    background: "#E6E6FA",
    boxShadow: "0.5px 0.5px 4px 0.5px rgba(0, 0, 0, 0.31)",
  };
  const clickedStyles = {
    width: "120px",
    borderRadius: "24px",
    border: " 1px dashed var(--primary, #4F46E5)",
    background: "#86A94B",
    boxShadow: "0.5px 0.5px 4px 0.5px rgba(0, 0, 0, 0.31)",
  };
  return (
    <>
      <button
        onClick={onClick ? onClick : undefined}
        style={styles}
        // className="border border-[#4F46E5] px-3 input-style w-24 rounded-[20px]"
      >
        {title}
      </button>
    </>
  );
};

export default ButtonComponent;
