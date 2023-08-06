import React from 'react'

interface ButtonProps {
    title: string | JSX.Element;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    disabled?: boolean;
    index: number
  }
const ButtonComponent:React.FC<ButtonProps> = ({
    title,
    onClick,
    index,
    disabled,
  }) => {
  return (
    <>
        <button onClick={onClick ? onClick : undefined} className='border border-[#4F46E5] px-3 input-style w-24 rounded-[20px]'>{title}</button>
    </>
  )
}

export default ButtonComponent