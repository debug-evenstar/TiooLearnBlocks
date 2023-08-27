import React, { useEffect, useState } from "react";

interface ButtonProps {
  title: string | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  index: number;
  status? : string;
}
const ButtonComponent: React.FC<ButtonProps> = ({
  title,
  onClick,
  index,
  disabled,
  status
}) => {
  const [buttonStyle, setButtonStyle] = useState<any>();
  const generateStyle = () => {
    let base = {
      color:"black",
      fontSize: "15px",
      padding: "5px 15px",
      borderRadius: "24px",
      border: " 1px dashed var(--primary, #4F46E5)",
      background: "#E6E6FA",
      boxShadow: "0.5px 0.5px 4px 0.5px rgba(0, 0, 0, 0.31)",
    };
    if (status === "success") {
      base = {...base, color : "white", background : "#86A94B"};
    }else if(status === "failure"){
      base = {...base, color : "white", background : "#F17B0C"};
    }
    setButtonStyle(base);
  }

  useEffect(()=>{
    generateStyle();
    console.log(status);
  },[status]);

  return (
    <>
      <button
        onClick={onClick ? onClick : undefined}
        style={buttonStyle}
        // className="border border-[#4F46E5] px-3 input-style w-24 rounded-[20px]"
      >
        {title}
      </button>
    </>
  );
};

export default ButtonComponent;
