import React from "react";
// import { classNames } from "../../utils/format";


interface Props {
  title: string | JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  capitalizeTitle?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  className?: string;
  altClassName?: string;
  isBusy?: boolean;
  prev?: boolean
}

const CompButton: React.FC<Props> = ({
  title,
  onClick,
  capitalizeTitle,
  disabled,
  altClassName,
  isBusy,
  prev
}) => {
  return (
    <div className={disabled? "opacity-75 " : ""}>
      <div className={prev? "polywrapper2" : "polygon-clip2"}>
      <button className={` fw-600 cursor-pointer ${prev? "bg-[#E3E2FF] pl-2 poly-2" : " pr-4 text-white bg-[#86A94B] polygon-clip"}`} onClick={onClick ? onClick : undefined} disabled={disabled}>
      {isBusy ? (
          "loading"
        ) : capitalizeTitle ? (
          title
        ) : (
          title
        )}
      </button>
      </div>
    </div>
  );
};

export default CompButton;
// text-center py-6 text-2xl w-[120px]

export const ContinueBtn: React.FC<Props> = ({
  title,
  onClick,
  capitalizeTitle,
  disabled,
  altClassName,
  isBusy,
  prev
}) => {
  return (
    <div className={disabled? "opacity-75 " : ""}>
      <div className="!relative">
        <div className="w-[134px] h-[84px] bg-white polygon-clip-next flex justify-center items-center">
          <button className={`w-[130px] h-[80px] fw-600 cursor-pointer text-white bg-[#86A94B] polygon-clip-next py-[18px] px-[5px]`} onClick={onClick ? onClick : undefined} disabled={disabled}>
          {isBusy ? (
              "loading"
            ) : capitalizeTitle ? (
              title
            ) : (
              title
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export const PreviousBtn: React.FC<Props> = ({
  title,
  onClick,
  capitalizeTitle,
  disabled,
  altClassName,
  isBusy,
  prev
}) => {
  return (
    <div className={disabled? "opacity-75 " : "relative h-auto"}>
      <div className="!relative polygon-clip-prev flex">
        <button className={` fw-600 cursor-pointer pl-4 !text-black`} onClick={onClick ? onClick : undefined} disabled={disabled}>
        {isBusy ? (
            "loading"
          ) : capitalizeTitle ? (
            title
          ) : (
            title
          )}
        </button>
      </div>
    </div>
  );
}
export const ContinueSmallBtn: React.FC<Props> = ({
  title,
  onClick,
  capitalizeTitle,
  disabled,
  altClassName,
  isBusy,
  prev
}) => {
  return (
    <div className={disabled? "opacity-75 " : ""}>
      <div className="relative w-28 h-16 bg-smallbtn place-center">
      <button className={` fw-600 cursor-pointer pr-8 text-white py-4 px-6`} onClick={onClick ? onClick : undefined} disabled={disabled}>
      {isBusy ? (
          "loading"
        ) : capitalizeTitle ? (
          title
        ) : (
          title
        )}
      </button>
      </div>
    </div>
  );
}